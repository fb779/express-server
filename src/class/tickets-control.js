const path = require('path');
const fs = require('fs');
const {v4: uuid} = require('uuid');

const pathFiles = {
    pathDb: () => path.join(__dirname, '..', '..', 'db', 'data.json'),
    pathHistoryDb: (date) => path.join(__dirname, '..', '..', 'db', `data-hs-${date}.json`),
};

class Ticket {
    constructor(number, desktop) {
        this.uid = uuid();
        this.number = number;
        this.desktop = desktop;
        this.created = new Date().getTime();
        this.attend = null;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.history = [];

        this.init();
    }

    get toDay() {
        return new Date().getDate();
    }

    get fullDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    get toJson() {
        return {
            last: this.last,
            toDay: this.toDay,
            tickets: this.tickets,
            lastFour: this.lastFour,
            history: this.history,
        };
    }

    init() {
        this._checkFiles();

        const {toDay = null, last = null, tickets = [], lastFour = [], history = []} = require(pathFiles.pathDb());
        const historical = require(pathFiles.pathHistoryDb(this.fullDate));

        if (toDay === this.toDay) {
            this.last = last;
            this.tickets = tickets;
            this.lastFour = lastFour;
            this.history = history;
        } else {
            this.last = historical[this.fullDate] ? historical[this.fullDate].length : 0;
            this.history = historical[this.fullDate] ? historical[this.fullDate] : [];
            this.saveDb();
        }

        this.saveHistoryDb();
    }

    saveDb() {
        fs.writeFileSync(pathFiles.pathDb(), JSON.stringify(this.toJson, null, 4));
    }

    saveHistoryDb() {
        const history = Object.assign({}, {[this.fullDate]: this.history});

        fs.writeFileSync(pathFiles.pathHistoryDb(this.fullDate), JSON.stringify(history, null, 4));
    }

    nextTicket() {
        this.last++;
        const tk = new Ticket(this.last, null);
        this.tickets.push(tk);
        this.saveDb();
        return `Ticket: ${tk.number}`;
    }

    attend(desktop) {
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift(); // extract the first ticket of the list
        ticket.desktop = desktop;
        ticket.attend = new Date().getTime();

        this._updateLastFour(ticket);
        this._updateHistory(ticket);

        this.saveDb();

        return ticket;
    }

    _updateLastFour(ticket) {
        // this.lastFour.splice(0, 0, ticket);
        this.lastFour.unshift(ticket);

        if (this.lastFour.length > 4) {
            this.lastFour.pop();
        }
    }

    _updateHistory(ticket) {
        this.history.push(ticket);
        this.saveHistoryDb();
    }

    _checkFiles() {
        if (!fs.existsSync(pathFiles.pathDb())) {
            fs.writeFileSync(pathFiles.pathDb(), JSON.stringify({}));
        }

        if (!fs.existsSync(pathFiles.pathHistoryDb(this.fullDate))) {
            fs.writeFileSync(pathFiles.pathHistoryDb(this.fullDate), JSON.stringify({}));
        }
    }
}

module.exports = TicketControl;
