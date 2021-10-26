var expressFunction = require('express');
const router = expressFunction.Router();
const authorization = require('../config/authorize')

router.route('/image')
    .post(authorization, (req, res) => {
        res.status(200).json(products);
    })

module.exports = router