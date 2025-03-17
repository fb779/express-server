const redis = require('redis');

class RedisService {
    constructor() {
        this.redisClient = redis.createClient();
        this.redisClient.on('error', (err) => {
            console.error('Error en Redis:', err);
        });
    }

    subscribe(channel, callback) {
        this.redisClient.subscribe(channel);
        this.redisClient.on('message', (subscribedChannel, message) => {
            if (subscribedChannel === channel) {
                callback(message);
            }
        });
    }

    publish(channel, message) {
        this.redisClient.publish(channel, message, () => {
            console.log(`Mensaje publicado en el canal ${channel}: ${message}`);
        });
    }

    createChannel(channel, callback) {
        this.subscribe(channel, callback);
    }
}

module.exports = RedisService;
