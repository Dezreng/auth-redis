import { CustomError } from './customError.js';

export const authGuard = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next(new CustomError('User unauthorized', 403))
  }
};