var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
var Schema = require("mongoose").Schema;
const authorization = require('../config/authorize')

//models
const imageSchema = Schema({
    name: { type: 'String', required: true },
    imagePath: { type: 'String', required: true },
    details: { type: 'String', required: true },
}, {
    collection: 'images'
});

let Image
try {
    Image = mongoose.model('images');
} catch (error) {
    Image = mongoose.model('images', imageSchema);
}
// controllers
const postImage = async(req, res) => {
    console.log("--------------------");
    console.log(req.body.name);
    const name = req.body.name
    const details = req.body.details
    const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    const image = new Image({
        name,
        imagePath,
        details
    });
    const createImage = await image.save();
    res.status(200).json({ image: {...createImage._doc } })
}
const getImages = async(req, res) => {
    const images = await Image.find();
    res.status(200).json(images)
};
// storage
const diskStorage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'images')
    },
    filename: (req, file, cd) => {
        const mimType = file.mimetype.split('/');
        const fileType = mimType[1]
        const fileName = file.originalname + '.' + fileType;
        cd(null, fileName)
    }
})
const fileFilter = (req, file, cd) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? cd(null, true) : cd(null, false)
}
const storage = multer({ storage: diskStorage, fileFilter }).single('image')



router.get('/', getImages);
router.post('/', storage, postImage);

module.exports = router;