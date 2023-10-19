import { searchUserByEmail } from '../services/service.js';

const getBalance = async (req, res, next) => {
  try {
    const email = req.session.user;

    // Get the user details from Redis
    const user = await searchUserByEmail(email);

    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    next(error);
  }
};

export { getBalance };