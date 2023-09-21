const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchem = new Schema({
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
    },
    status:{
        type: String,
        default: "Dissaproved"
    }
       
},{timestamps:true});
const Customer = mongoose.model("customers", customerSchem);
Customer.createIndexes();
module.exports = Customer;