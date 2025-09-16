import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const generateToken = (id) => {
    // This a modification for this error "message": "secretOrPrivateKey must have a value"

    if (!process.env['JWT-SECRET']) {
        console.error('JWT-SECRET is not defined in the environment.');
        return null; // Or throw an error, depending on your error handling strategy
    }
    return jwt.sign({ id }, process.env['JWT-SECRET'], { expiresIn: '1d' });
};
// "message": "secretOrPrivateKey must have a value"
// This message appear in postman after i fix the error below
// I think the bug in this line of code

// After this there is an error in mongo db connection 

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, profileImageUrl } = req.body;
        // This part of code give me an error on it when i apply the post method on postman
        // it should give me an object when i console.log(req.body) but its undefinded
        // look above this register controller => ......

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        // console.log(req.body);
    }
};

// login User
export const loginUser = async (req, res) => {
    const { email , password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message : "All fields are required"})
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json({message : "Invalid credentials"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        // console.log(req.body);
    }
}

// info User
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : "Error registeration user" , error: error.message });
    }
}