var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = require("mongoose").Schema;
const ObjectId = mongoose.Types.ObjectId;
const authorization = require('../config/authorize')

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    file: String,
    img: String,
}, {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}


router.route('/update/:id')
    .put((req, res, next) => {
        User.findByIdAndUpdate(req.params.id, {
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

router.route('/user/:id')
    .get((req, res, next) => {
        const idUser = req.params.id
        User.aggregate([{
                    $match: {
                        _id: ObjectId(idUser)
                    }
                },
                {
                    $lookup: {
                        from: "images",
                        localField: "_id",
                        foreignField: "owner_id",
                        as: "ima_all",
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