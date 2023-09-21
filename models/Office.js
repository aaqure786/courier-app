const mongoose = require('mongoose');
const {Schema} = mongoose;

const officeSchem = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    country:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required: true
    }
       
},{timestamps:true});
const Office = mongoose.model("offices", officeSchem);
Office.createIndexes();
module.exports = Office;