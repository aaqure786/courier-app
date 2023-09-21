const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipmentSchema = new Schema({
    shipperName: {
        type: String,
        required: true,
    },
    estidate: {
        type: Date,
        required: true,
    },
    estiTime: {
        type: String,
        required: true,
    },
    recName: {
        type: String,
        required: true
    },
    recContact: {
        type: String,
        required: true
    },
    recAddress: {
        type: String,
        required: true
    },
    piece: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    charges: {
        type: Number,
        required: true
    },
    serCharges: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    shiDes: {
        type: String,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    specInstruc: {
        type: String,
        required: true
    },
    totalCharges: {
        type: Number,
        required: true
    },
    status:{
        type:Object
    }
}, { timestamps: true });
const Shipment = mongoose.model("shipments", shipmentSchema);
Shipment.createIndexes();
module.exports = Shipment;