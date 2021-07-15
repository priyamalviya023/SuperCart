var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var middleware = require('../middleware/index');

//add a comment
router.post('/products/:category/:id/comment', middleware.isLoggedIn, async function(req, res){
    try {
        if(req.body.comment.length >0) {
            await Comment.create({text: req.body.comment, user_id: req.user._id, product_id: req.params.id});
            res.redirect('/products/' + req.params.category + '/' + req.params.id);
        } else {
            req.flash('error', 'Comment Can\'t be empty!');
            res.redirect('/products/' + req.params.category + '/' + req.params.id);
        }
        
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something Went Wrong');
        res.redirect('/products/' + req.params.category + '/' + req.params.id);
    }
})

router.delete('/products/:category/:id/comment/:comment_id', middleware.isLoggedIn, async function(req, res){
    try {
        var comment = await Comment.findById(req.params.comment_id);

        if(req.user._id.equals(comment.user_id)){
            await Comment.findByIdAndDelete(req.params.comment_id);
            req.flash('success', 'Comment Deleted Successfully');
            res.redirect('/products/' + req.params.category + '/' + req.params.id);
        } else {
            req.flash('error', 'User Not authorized');
            res.redirect('/products/' + req.params.category + '/' + req.params.id);
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something Went Wrong');
        res.redirect('/products/' + req.params.category + '/' + req.params.id);
    }
})

module.exports = router;