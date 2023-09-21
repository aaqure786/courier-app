const mongoose = require('mongoose');
const {Schema} = mongoose;

const courierSchem = new Schema({
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
    branch:{
        type: String,
        required: true
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
const Courier = mongoose.model("couriers", courierSchem);
Courier.createIndexes();
module.exports = Courier;