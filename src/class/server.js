/** Imports */
const path = require('path');
const {createServer} = require('http');
const io = require('socket.io');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {
    server: {PORT, origin},
} = require('../../config/config');

const {normalizePort} = require('../helpers');

const {dbConnection} = require('../database/mongoose-config.db');

const {LoadSockets} = require('../sockets/controller.socket');

const indexRouter = require('../routes/index');

const rootDirectory = path.join(__dirname, '..', '..');

class Server {
    constructor() {
        this.app = express();

        this.server = createServer(this.app);

        this.io = io(this.server);

        // Set the port value
        this.definePort();

        // Middlewares
        this.middlewares();

        // View engine
        this.viewEngine();

        // Routes
        this.routes();

        // Error handler routes
        this.routesHandleError();

        // socket configurations
        this.sockets();
    }

    /**
     * Get port from environment and store in Express.
     */
    definePort() {
        this.port = normalizePort(PORT);
        if (!this.port) {
            throw new Error(`Port is not define`);
        }
        this.app.set('port', this.port);
    }

    viewEngine() {
        const hbs = exphbs.create({
            defaultLayout: 'main.hbs',
            layoutsDir: path.join(rootDirectory, 'views', 'layouts'),
            partialsDir: path.join(rootDirectory, 'views', 'partials'),
            extname: 'hbs',
        });

        // Define the name template engine
        const hbsName = 'hbs';

        //Sets handlebars configurations (we will go through them later on)
        this.app.engine(hbsName, hbs.engine);

        //Sets our app to use the handlebars engine
        this.app.set('view engine', hbsName);
    }

    middlewares() {
        this.app.use(logger('dev'));

        this.app.use(cors({origin}));

        /**
            BUG: login session with google has problems with helmet.
                the google script to make a login need to be
                helmet contentSecurityPolicy => no funciona la carga del script para el boton de google-sign-in
            BUG: helmet not allow load bootstrat js files throwgh CDN
        */

        // FIX: coment helmet library to make
        // const helmetOpts = {
        //     contentSecurityPolicy: {
        //         directives: {
        //             defaultSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'accounts.google.com', 'ssl.gstatic.com'],
        //             scriptSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'accounts.google.com', 'ssl.gstatic.com'],
        //             styleSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'accounts.google.com', 'ssl.gstatic.com'],
        //             imgSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'accounts.google.com', 'ssl.gstatic.com'],
        //             connectSrc: ["'self'", 'accounts.google.com', 'ssl.gstatic.com'],
        //             fontSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'accounts.google.com'],
        //             objectSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'accounts.google.com', 'ssl.gstatic.com'],
        //             mediaSrc: ["'self'"],
        //             frameSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'accounts.google.com', 'ssl.gstatic.com'],
        //             sandbox: null,
        //             reportUri: null,
        //             childSrc: ['self'],
        //             formAction: ["'self'", 'accounts.google.com', 'ssl.gstatic.com'],
        //             frameAncestors: ["'none'"],
        //             pluginTypes: null,
        //             baseUri: null,
        //             reportTo: null,
        //             workerSrc: null,
        //             manifestSrc: null,
        //             prefetchSrc: null,
        //             navigateTo: null,
        //         },
        //     },
        //     crossOriginEmbedderPolicy: {policy: 'credentialless'},
        //     crossOriginOpenerPolicy: {policy: 'same-origin-allow-popups'},
        //     crossOriginResourcePolicy: {policy: 'same-site'},
        //     //OriginAgentCluster:false,
        //     referrerPolicy: {
        //         policy: ['origin'],
        //     },
        //     StrictTransportSecurity: false,
        //     // XContentTypeOptions:false,
        //     XDNSPrefetchControl: false,
        //     //XDownloadOptions:false,
        //     // XFrameOptions:false,
        //     // XPermittedCrossDomainPolicies:false,
        //     xPoweredBy: false,
        // };
        // this.app.use(helmet(helmetOpts));

        // FIX: test implementation of helmet
        // this.app.use(
        //     helmet.contentSecurityPolicy({
        //         directives: {
        //             'script-src': ["'self'", "'unsafe-inline'", 'https://accounts.google.com'],
        //             'frame-src': ["'self'", 'https://accounts.google.com'],
        //         },
        //     })
        // );
        this.app.disable('x-powered-by');

        this.app.use(express.json());

        this.app.use(express.urlencoded({extended: false}));

        this.app.use(cookieParser());

        this.app.use(express.static(path.join(rootDirectory, 'public')));

        // TODO: Provar si el io llega en todas las peticiones REST
        // this.app.use((req, res, next)=>{
        //     req.io = this.io;
        //     next()
        // })
    }

    routes() {
        this.app.use('/', indexRouter);
    }

    routesHandleError() {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            req.originalUrl.includes('/api') ? next(createError(404, {message: `Invalid endpoint`})) : next(createError(404));
        });

        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // response error API
            if (req.originalUrl.includes('/api')) {
                res.status(err.status || 500).json({ok: false, message: err.message});
                return;
            }

            // render the error page
            res.status(err.status || 500).render('error', {title: 'Page not Found'});
        });
    }

    sockets() {
        LoadSockets(this.io);
    }

    async listen() {
        /** Database conecction */
        await dbConnection();

        /** Start to listen server */
        this.server.listen(this.port, () => {
            console.log(`Server runnign on port: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
