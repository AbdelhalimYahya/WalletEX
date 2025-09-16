import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        if (!process.env['JWT-SECRET']) {
            console.error('JWT-SECRET is not defined in the environment.');
            return res.status(500).json({ message: 'Internal server error: JWT_SECRET not defined' });
        }

        const decoded = jwt.verify(token, process.env['JWT-SECRET']);

        if (!decoded?.id) {
            return res.status(401).json({ message: 'Not authorized, invalid token payload' });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};