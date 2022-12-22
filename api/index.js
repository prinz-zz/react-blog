const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');


app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connection established YAY!!!'))
    .catch((err) => console.log('errorsss'))

const stroage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name);
    },
});

const upload = multer({ stroage: stroage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded!!!');
})




app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/cats', catRoute);


app.listen(4000, () => {
    console.log('listening on port 4000');
})