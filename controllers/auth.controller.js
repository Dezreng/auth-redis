import { createUser, isCorrectPassword } from '../services/service.js';
import { CustomError } from '../middleware/customError.js';

const createAccount = async (req, res, next) => {
  try {
    console.log('Create new user');
    const user = await createUser(req.body);

    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log(`User with ${req.body.email} wanna auth`);
    const { isAuth, user } = await isCorrectPassword(req.body);

    if (!isAuth) {
      next(new CustomError('Login or password is incorrect, try again.', 404))
    }

    // save the session
    // load does not happen before session is saved
    req.session.regenerate(function (err) {
      if (err) {
        next(err);
      }

      // store user information in session, typically a user id
      req.session.user = user.email;

      // save the session
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) {
          next(err);
        }

        return res.json(req.session);
      })
    })
  } catch (error) {
    next(error);
  }
};

export { createAccount, login };