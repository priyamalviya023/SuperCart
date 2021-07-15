var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    user_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Comment", commentSchema);