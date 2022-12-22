const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Posts');


//CREATE
router.post('/', async (req, res) => {
    const post = new Post(req.body);

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err);
    } 
});


//UPDATE
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {

            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body,
                }, { new: true });
                res.status(200).json(updatedPost);
               } catch (err) {
                res.status(500).json("err inside");
                }
            } else {
                res.status(401).json("You can update only your post!");
            }

    } catch (err) {
        res.status(500).json('err outside');
    }
});


//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json('Post has been deleted');

            } catch (err) {
                res.status(500).json("err inside");
            }
        } else {
            res.status(401).json("You're not Authorized!!!");
        }

    } catch (err) {
        res.status(500).json('err outside');
    }
});


//GET
router.get('/:id', async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json('err outside');
    }

});

//GET ALL
router.get('/', async (req, res) => {
    
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username: username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);

    }
    catch (err) {
        res.status(500).json('err outside');
    }

});

module.exports = router;

