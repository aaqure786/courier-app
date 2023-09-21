const mongoose = require('mongoose');
const {Schema} = mongoose;

const managerSchem = new Schema({
    name: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
        unique: true
    },
    branch:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        unique: true
    },
    address:{
        type: String,
        required: true
    }
       
},{timestamps:true});
const Manager = mongoose.model("managers", managerSchem);
Manager.createIndexes();
module.exports = Manager;