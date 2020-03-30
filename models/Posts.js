var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        require:true
    },
    urls:{
        type:String,require:true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;