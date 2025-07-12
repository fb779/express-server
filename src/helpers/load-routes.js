const {Router} = require('express');
const fs = require('fs');
const path = require('path');

const includeAllRoutes = ({routerPath = ''}) => {
    const loadingRouter = Router();
    const readAllPaths = (rootPath, arrayOfFiles = []) => {
        const files = fs.readdirSync(rootPath);

        files.forEach((file) => {
            const stat = fs.statSync(`${rootPath}/${file}`);
            if (stat.isDirectory()) {
                readAllPaths(`${rootPath}/${file}`, arrayOfFiles);
            } else {
                if (file.indexOf('routes') != -1) {
                    const [name] = file.split('.');
                    arrayOfFiles.push({prefix: `${name}`, pathFile: path.join(rootPath, file)});
                    return;
                }
            }
        });

        return arrayOfFiles;
    };

    const allRoutes = readAllPaths(routerPath);

    allRoutes.forEach(({prefix, pathFile}) => {
        console.log(`Prefix: ${prefix} => Origin file: ${pathFile.split('/').pop()}`);
        try {
            loadingRouter.use(`/${prefix}`, require(pathFile));
        } catch (error) {
            // console.log(error);
            const fileName = pathFile.split('/').pop();
            throw new Error(`${error.message} - Problems to load router from: ${fileName}`);
        }
    });

    return loadingRouter;
};

module.exports = {includeAllRoutes};
