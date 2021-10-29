const expressFunctions = require('express')
const mongoose = require('mongoose')
var expressApp = expressFunctions();
const router = expressFunctions.Router();


var Schema = require('mongoose').Schema;
const imageSchema = Schema({
    name: String,
    detail: String,
    img: String,
}, { collection: 'images' });
let Image
try {
    Image = mongoose.model('images')
} catch (error) {
    Image = mongoose.model('images', imageSchema)
}

const addImage = (imageData) => {
    return new Promise((resolve, reject) => {
        var new_image = new Image(imageData);
        new_image.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert image to DB!'))
            } else {
                resolve({ message: 'Image added successfully' })
            }
        });
    });
}
const getImages = () => {
    return new Promise((resolve, reject) => {
        Image.find({}, (err, data) => {
            if (err) {
                reject(new Error('Cannot get images!'))
            } else {
                if (data) {
                    resolve(data);
                } else {
                    reject(new Error('Cannot get images!'))
                }
            }
        })
    })
}

router.route("/img")
    .post((req, res) => {
        console.log('add');
        addImage(req.body)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });
router.route("/img")
    .get((req, res) => {
        console.log('get');
        getImages()
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err);
            })
    });

module.exports = router;