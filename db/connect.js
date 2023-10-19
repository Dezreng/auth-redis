import { createClient } from "redis";
import { CONFIG } from "../common/config.js";

const redisConnectionString = `redis://${CONFIG.REDIS_DB_URL || 'redis:6379'}`;

// Initialize client.
let client = createClient({ url: redisConnectionString })

await client.connect().catch(console.error)

export { client }