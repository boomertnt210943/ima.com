var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
var Schema = require("mongoose").Schema;
const ObjectId = mongoose.Types.ObjectId;

const likeSchema = Schema({
    owner_id: { type: ObjectId, required: true },
    ima_like: { type: ObjectId, required: true }
}, {
    collection: 'likeImages'
});

let LikeImage
try {
    LikeImage = mongoose.model('likeImages');
} catch (error) {
    LikeImage = mongoose.model('likeImages', likeSchema);
}

const postLike = async(req, res) => {
    const owner_id = req.body.owner_id;
    const ima_like = req.body.ima_like;
    const likeIma = new LikeImage({
        owner_id,
        ima_like
    });
    const createLike = await likeIma.save();
    res.status(200).json({ likeIma: {...createLike._doc } })
}

const getAllLikeWithOwner = async(req, res) => {
    LikeImage.find({ owner_id: req.params.id }, (error, data) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            console.log(data);
            res.status(200).json(data);
        }
    });
}

const getAllLike = async(req, res) => {
    const likeIma = await LikeImage.find();
    res.status(200).json(likeIma)
};

router.get('/all/:id', getAllLikeWithOwner);
router.post('/', postLike);
router.get('/', getAllLike);

router.route('/delete/:id')
    .delete((req, res, next) => {
        LikeImage.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    })

router.route('/deletewithima/:id')
    .delete((req, res) => {
        LikeImage.deleteMany({ ima_like: req.params.id }, (error, data) => {
            if (error) {
                return (error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    })

router.route('/user/:id')
    .get((req, res, next) => {
        const idUser = req.params.id
        LikeImage.aggregate([{
                    $match: {
                        owner_id: ObjectId(idUser)
                    }
                },
                {
                    $lookup: {
                        from: "images",
                        localField: "ima_like",
                        foreignField: "_id",
                        as: "image",
                    }
                }
            ])
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                return next(err);
            })
    });

module.exports = router