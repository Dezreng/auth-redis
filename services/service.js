import { userRepository } from '../repository/user.repository.js';
import { CustomError } from '../middleware/customError.js';
import { CONFIG } from '../common/config.js';
import CryptoJS from 'crypto-js';

const createUser = async (userDto) => {
  const { firstName, lastName, password, email, balance } = userDto;

  const existingUser = await searchUserByEmail(email);

  if (existingUser) {
    throw new CustomError("Account with that email or username already exists", 409);
  }

  const user = {
    firstName,
    lastName,
    password: CryptoJS.AES.encrypt(password, CONFIG.CRYPTO_SECRET).toString(),
    email: email.toLowerCase(),
    balance,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { ...await userRepository.save(user), password: null };
};

const searchUserByEmail = async (email) => {
  return await userRepository.search().where('email').equals(email.toLowerCase()).returnFirst();
};

const isCorrectPassword = async (authData) => {
  const user = await searchUserByEmail(authData.email);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  return { isAuth: CryptoJS.AES.decrypt(user.password, CONFIG.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8) === authData.password, user };
};


export { createUser, searchUserByEmail, isCorrectPassword };