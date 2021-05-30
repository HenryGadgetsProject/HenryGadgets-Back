const { Router } = require("express");
const { User } = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

const router = Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });
        const token = jwt.sign({ existingUser }, authConfig.secret, { expiresIn: authConfig.expires});
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/signup', async (req, res) => {
    const { email, password, first_name, last_name } = req.body
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) return res.status(400).json({ message: "User already exists." });
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, first_name, last_name });
        
        const token = jwt.sign({ user: result }, authConfig.secret, { expiresIn: authConfig.expires });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/googleSignin', async (req, res) => {
    const { email, googleId, first_name, last_name, photo } = req.body
    console.log(req.body)
    const user = {
        first_name,
        last_name,
        email,
        photo,
        googleId
    }
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) {
            const updatedUser = await existingUser.update(user);
            const token = jwt.sign({ user: updatedUser }, authConfig.secret, { expiresIn: authConfig.expires });
            return res.status(200).json({ updatedUser, token });
        } else {
            const result = await User.create(user);
            const token = jwt.sign({ user: result }, authConfig.secret, { expiresIn: authConfig.expires });
            res.status(200).json({ result, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});


module.exports = router