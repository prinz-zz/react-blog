const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');

// CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
//decrypted.toString(CryptoJS.enc.Utf8)

//Register
router.post('/register', async (req, res) => {

    try {
    const newUser = new User(
        {
            username: req.body.username,
            email : req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_CODE).toString(),
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json('Wrong credentials(USER)');

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_CODE);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(400).json('Wrong credentials(PASS)');
        //To hide passsword
        const { password, ...others } = user._doc;

        res.status(200).json(others);     
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;