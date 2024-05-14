import { createClient } from "redis";

const REDIS_CONFIG = {
    url: process.env.KV_URL,
    socket: {
        tls: process.env.KV_USE_TLS === 'true',
    }
};

class RedisService {
    static instance;
    client;

    constructor() {
        this.client = createClient(REDIS_CONFIG);
        this.client.on("error", (err) => console.log("Redis Client Error", err));
        this.client.connect();
    }

    static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    getClient() {
        return this.client;
    }
}

export const getRedisClient = () => RedisService.getInstance().getClient();