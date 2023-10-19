import { Client } from 'redis-om';
import { CONFIG } from '../common/config.js';

const redisConnectionString = `redis://${CONFIG.REDIS_DB_URL || 'redis:6379'}`;

const redisClient = new Client();

await redisClient.open(redisConnectionString);

export { redisClient };