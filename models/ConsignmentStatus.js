const mongoose = require('mongoose');
const {Schema} = mongoose;

const statusSchem = new Schema({
consid:{
    type:String,
    required:true,
    unique: true
},
status:{
    type:Array,
    required:true,
}
       
},{timestamps:true});
const Status = mongoose.model("status", statusSchem);
Status.createIndexes();
module.exports = Status;