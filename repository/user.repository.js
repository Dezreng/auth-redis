import { redisClient } from '../db/client.js';
import * as pkg from 'redis-om';

const { Schema } = pkg;

const userSchema = new Schema('user', {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  password: { type: 'string' },
  email: { type: 'string' },
  balance: { type: 'string' },
  createdAt: { type: 'date', sortable: true },
  updatedAt: { type: 'date', sortable: true },
});

const userRepository = redisClient.fetchRepository(userSchema);

await userRepository.createIndex();

export { userRepository };