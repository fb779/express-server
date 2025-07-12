/**
 * The arguments the view need to recieve are
 *  titel: String
 *  styles: [strings]
 *  scripts: [strings]
 *  layout: String
 */

module.exports = {
    home: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-socket.js'];
        const styles = ['ticket-home.css'];

        res.render(`ticket/tk-home`, {title, styles, scripts, layout: 'ticket-main'});
    },

    ticket_new: (req, res) => {
        const title = 'Tickets - new';

        const scripts = ['ticket-new.js'];
        const styles = ['ticket-new.css'];

        res.render(`ticket/tk-new`, {title, styles, scripts, layout: 'ticket-main'});
    },

    ticket_screen: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-screen.js'];
        const styles = ['ticket-screen.css'];

        res.render(`ticket/tk-screen`, {title, styles, scripts, layout: 'ticket-main'});
    },

    ticket_desktop: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-desktop.js'];

        res.render(`ticket/tk-desktop`, {title, scripts, layout: 'ticket-main'});
    },
};
