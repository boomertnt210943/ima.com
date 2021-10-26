var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;
const imageSchema = Schema({
    name: String,
    img: String,
    detail: String,
    owner: String
}, {
    collection: 'images'
});

let Image
try {
    Image = mongoose.model('images');
} catch (error) {
    Image = mongoose.model('images', imageSchema);
}

const inserImg = (dataImage) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            name: dataImage.name,
            img: dataImage.img,
            detail: dataImage.detail,
            owner: dataImage.email
        });
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert image to DB!'))
            } else {
                resolve({ message: 'insert image successfully' })
            }
        });
    });
}

router.route('/image')
    .post((req, res) => {
        const playload = {
            name: req.body.name,
            img: req.body.img,
            detail: req.body.detail,
            owner: req.body.email
        }
        console.log(playload);
        inserUser(playload)
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch(err => {});

module.exports = router