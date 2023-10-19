import { Client } from 'redis-om';
import { CONFIG } from '../common/config.js';

const redisConnectionString = `redis://${CONFIG.REDIS_DB_URL}`;

const redisClient = new Client();

await redisClient.open(redisConnectionString);

export { redisClient };