const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Courier = require("../models/Courier")
const fetchUser = require('../Middleware/fetchUser')



const JWT_SEC ="JWT12354"
//route to add courier // login required
router.post("/addcourier",fetchUser, async (req,res)=>{
    try {
        const courier =await Courier.create({
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        res.status(200).json(courier)
    } catch (error) {
        console.log(error.message)
    }
});

 
//route to get all couriers // Login Required
router.get('/getcouriers',fetchUser , async (req, res)=>{
    try {
        const courier = await Courier.find()
        if(courier){
            return res.status(200).json(courier)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});
//route to get all couriers by branch // Login Required
router.get('/getcouriers/:branch',fetchUser , async (req, res)=>{
    try {
        const courier = await Courier.find({branch:req.params.branch})
        if(courier){
            return res.status(200).json(courier)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

//route to get single courier // Login Required
router.get("/getsingleCourier/:id",fetchUser ,async (req,res)=>{
    try {
       const courier = await Courier.findOne({_id:req.params.id})
      courier.password = CryptoJS.AES.decrypt(courier.password, "secret123").toString(CryptoJS.enc.Utf8);

       if(courier){
        return res.status(200).json(courier)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});
//route to get singel courier by Name // Login Required

router.get("/getcourierbyName/:name",fetchUser ,async (req,res)=>{
    try {
       const courier = await Courier.findOne({name:req.params.name})

       if(courier){
        return res.status(200).json(courier)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel courier and update // Login Required
router.put("/editcourier/:id", fetchUser,async (req,res)=>{
    try {
        const courier = await Courier.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        if(courier){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single courier // Login Required
router.delete("/deletecourier/:id",fetchUser,async (req,res)=>{
    try {
        const data = awaitCourier.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Item Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router