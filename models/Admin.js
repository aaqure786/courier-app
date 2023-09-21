const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchem = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    },
    
},{timestamps:true});
const Admin = mongoose.model("admins", adminSchem);
Admin.createIndexes();
module.exports = Admin;