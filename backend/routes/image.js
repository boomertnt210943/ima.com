var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
//const authorization = require('../config/authorize')
const Schema = require("mongoose").Schema,
    ObjectId = Schema.ObjectId;

//models
const imageSchema = Schema({
    name: { type: 'String', required: true },
    imagePath: { type: 'String', required: true },
    details: { type: 'String', required: true },
    owner_id: { type: ObjectId, required: true }
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
    const owner_id = req.body.owner_id
    const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    const image = new Image({
        name,
        imagePath,
        details,
        owner_id
    });
    const createImage = await image.save();
    res.status(200).json({ image: {...createImage._doc } })
}
const getImages = async(req, res) => {
    const images = await Image.find();
    res.status(200).json(images)
};

const getOneIma = async(req, res) => {
        Image.find({ _id: req.params.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.status(404).json(error);
            } else {
                console.log(data);
                res.status(200).json(data);
            }
        });
    }
    // storage
const diskStorage = multer.diskStorage({
    destination: (res, file, cd) => {
        cd(null, 'images')
    },
    filename: (res, file, cd) => {
        const mimType = file.mimetype.split('/');
        const fileType = mimType[1]
        const fileName = file.originalname + '.' + fileType;
        cd(null, fileName)
    }
})
const fileFilter = (res, file, cd) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? cd(null, true) : cd(null, false)
}
const storage = multer({ storage: diskStorage, fileFilter }).single('image')


router.get('/pin/:id', getOneIma)
router.get('/', getImages);
router.post('/', storage, postImage);


router.route('/update/:id')
    .put((req, res, next) => {
        Image.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.json(data)
                console.log('Data updated successfully')

                console.log(data)
            }
        })
    });

module.exports = router;