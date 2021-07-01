const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
});

const blogModel = mongoose.model('blog',blogSchema);
module.exports = blogModel;