const express = require('express');
const multer = require('multer');
const { isAuth, isAdmin } = require('../utils');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images/');
    },
    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const uploadRouter = express.Router();

//product images + banner image
uploadRouter.post('/image_main', isAuth, isAdmin, upload.single('image_main'), (req, res) => {
    res.status(201).send({ image_main: `${req.file.originalname}` });
});
uploadRouter.post('/image_1', isAuth, isAdmin, upload.single('image_1'), (req, res) => {
    res.status(201).send({ image_1: `${req.file.originalname}` });
});
uploadRouter.post('/image_2', isAuth, isAdmin, upload.single('image_2'), (req, res) => {
    res.status(201).send({ image_2: `${req.file.originalname}` });
});
uploadRouter.post('/image_3', isAuth, isAdmin, upload.single('image_3'), (req, res) => {
    res.status(201).send({ image_3: `${req.file.originalname}` });
});
uploadRouter.post('/image_4', isAuth, isAdmin, upload.single('image_4'), (req, res) => {
    res.status(201).send({ image_4: `${req.file.originalname}` });
});

module.exports = uploadRouter;