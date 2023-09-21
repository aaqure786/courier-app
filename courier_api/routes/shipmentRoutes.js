const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Shipment = require("../models/Shipment")
const Status = require("../models/ConsignmentStatus")

const fetchUser = require('../Middleware/fetchUser')



const JWT_SEC ="JWT12354"
//route to add shipment // login required
router.post("/addShipment",fetchUser, async (req,res)=>{
    try {
        const shipment =await  Shipment.create({
            shipperName:req.body.shipperName, 
            estidate:req.body.estidate, 
            estiTime:req.body.estiTime, 
            recName:req.body.recName, 
            recContact:req.body.recContact,
            recAddress:req.body.recAddress,
            piece:req.body.piece,
            weight:req.body.weight,
            charges:req.body.charges,
            serCharges:req.body.serCharges,
            service:req.body.service,
            shiDes:req.body.shiDes,
            specInstruc:req.body.specInstruc,
            totalCharges:req.body.totalCharges,
            status: req.body.status,
            branch: req.body.branch
        });
        if(shipment){
            // Adding Status to status table
            try {
                const status =await  Status.create({
                    consid:shipment._id,
                    status: shipment.status,
                    
                });
                
            } catch (error) {
                console.log(error.message)
            }
        res.status(200).json(shipment)

        }
    } catch (error) {
        console.log(error.message)
    }
});

 
//route to get all Shipment // Login Required
router.get('/getShipment',fetchUser , async (req, res)=>{
    try {
        const shipment = await Shipment.find()
        if(shipment){
            return res.status(200).json(shipment)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

//route to get shipment by branch// login required
router.get('/getShipment/:branch',fetchUser , async (req, res)=>{
    try {
        const shipment = await Shipment.find({branch:req.params.branch})
        if(shipment){
            return res.status(200).json(shipment)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

//route to get single shipment // Login Required
router.get("/getsingleShipment/:id",fetchUser ,async (req,res)=>{
    try {
       const shipment = await Shipment.findOne({_id:req.params.id})
       if(shipment){
        return res.status(200).json(shipment)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel shipment and update // Login Required
router.put("/editShipment/:id", fetchUser,async (req,res)=>{
    try {
        const shipment = await Shipment.findByIdAndUpdate({_id:req.params.id},{
            shipperName:req.body.shipperName, 
            estidate:req.body.estidate, 
            estiTime:req.body.estiTime, 
            recName:req.body.recName, 
            recContact:req.body.recContact,
            recAddress:req.body.recAddress,
            piece:req.body.piece,
            weight:req.body.weight,
            charges:req.body.charges,
            serCharges:req.body.serCharges,
            service:req.body.service,
            shiDes:req.body.shiDes,
            specInstruc:req.body.specInstruc,
            totalCharges:req.body.totalCharges,
            branch:req.body.branch
        });
        if(shipment){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});
//route to get singel shipment and update  Status// Login Required
router.put("/updateStatus/:id", fetchUser,async (req,res)=>{
    try {
        const updat = await Shipment.findByIdAndUpdate({_id:req.params.id},{status:req.body.status})
        let data = await Status.findOneAndUpdate({consid:updat._id},{$push : {status:req.body.status}})
        console.log(result)
        if(updat){
            return res.status(200).json({msg:"Status Update Successfuly"})
        }           
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single shipment // Login Required
router.delete("/deleteshipment/:id",fetchUser,async (req,res)=>{
    try {
        const data = await Shipment.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Item Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router