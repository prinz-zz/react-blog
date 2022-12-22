const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Posts');
const CryptoJS = require('crypto-js');

// CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
//decrypted.toString(CryptoJS.enc.Utf8)

//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_CODE).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);

        } catch (err) {
            res.status(500).json(err);
        }

    } else {
        res.status(401).json('You are not allowed!!!');
    }
    
});


//DELETE
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('user has been deleted!!!');
                
    
            } catch (err) {
                res.status(500).json('Helllo');
            }
        } catch (err) {
            res.status(404).json('User not found!')
        }

    } else {
        res.status(401).json('You can delete only your Account!!!');
    }
});


//GET
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

