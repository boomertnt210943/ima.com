var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
var Schema = require("mongoose").Schema;
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = Schema({
    nick_name: { type: 'String', default: "ผู้ไม่ประสงค์เปิดเผื่อชื่อ" },
    content: { type: 'String', required: true },
    ima_comment: { type: ObjectId, required: true }
}, {
    collection: 'comments'
});

let Comment
try {
    Comment = mongoose.model('comments');
} catch (error) {
    Comment = mongoose.model('comments', commentSchema);
}

const postComment = async(req, res) => {
    const nick_name = req.body.nick_name;
    const content = req.body.content;
    const ima_comment = req.body.ima_comment;
    const comment = new Comment({
        nick_name,
        content,
        ima_comment
    });
    const createComment = await comment.save();
    res.status(200).json({ comment: {...createComment._doc } })
}

const getCommentInIma = async(req, res) => {
    Comment.find({ ima_comment: req.params.id }, (error, data) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            console.log(data);
            res.status(200).json(data);
        }
    });
}


const getCommentAll = async(req, res) => {
    const comment = await Comment.find();
    res.status(200).json(comment)
};

router.get('/allcom/:id', getCommentInIma);
router.post('/', postComment);
router.get('/', getCommentAll);


module.exports = router