var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;
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
            }
        })

    });

module.exports = router