class Message {
    constructor(from, name, message, to = null) {
        this.from = from;
        this.name = name;
        this.message = message;
        this.to = to;
        this.date = new Date();
    }
}

class UserControl {
    constructor() {
        this.users = {};
        this.messages = [];
    }

    get listUsers() {
        return Object.values(this.users);
    }

    get lastTenMessages() {
        this.messages = this.messages.splice(0, 10);
        return this.messages;
    }

    async addUser(user, sk_id) {
        // this.users[user.uid] = Object.assign({}, user.toJSON(), {socket_id: sk_id});
        this.users[user.uid] = user.toJSON();
    }

    removeUser(uid) {
        delete this.users[uid];
    }

    addMessage(from, name, message, to = null) {
        this.messages.unshift(new Message(from, name, message, to));
        // this.messages.splice(0, 0, new Message(from, name, message, to));
        // this.messages.push(new Message(from, name, message, to));
    }
}

module.exports = UserControl;
