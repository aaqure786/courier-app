const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer")
const fetchUser = require('../Middleware/fetchUser')



const JWT_SEC ="JWT12354"
//route to add customer // login required
router.post("/addcustomer",fetchUser, async (req,res)=>{
    try {
        const customer =await  Customer.create({
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        res.status(200).json(customer)
    } catch (error) {
        console.log(error.message)
    }
});
//route to login 
router.post("/login",async (req, res)=>{
    try {
        const username = req.body.username;
    const password = req.body.password;

    const data =await Customer.findOne({name: username})
    const pass = CryptoJS.AES.decrypt(data.password, "secret123").toString(CryptoJS.enc.Utf8);
    if(data.username === username && pass ===password)
    {
        const value ={ username:data.name, id: data._id, branch:data.branch, role: "Customer"}
        const authToken = jwt.sign(value,JWT_SEC)
        return res.status(200).json({status:true, authToken });
    }
    } catch (error) {
        console.log(error.message)
    }
    
})
 
//route to get all customers // Login Required
router.get('/getcustomers',fetchUser , async (req, res)=>{
    try {
        const customer = await Customer.find({status:"Approved"})
        if(customer){
            return res.status(200).json(customer)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

router.get('/getdiscustomers',fetchUser , async (req, res)=>{
    try {
        const customer = await Customer.find({status:"Dissaproved"})
        if(customer){
            return res.status(200).json(customer)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});
//route to get all customers bybranch // Login Required
router.get('/getcustomers/:branch',fetchUser , async (req, res)=>{
    try {
        // console.log(req.params.branch)
        const customer = await Customer.find({branch:req.params.branch, status:"Approved"})
        // console.log(customer)
        if(customer){
            return res.status(200).json(customer)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

//route to get single customer // Login Required
router.get("/getsingleCustomer/:id",fetchUser ,async (req,res)=>{
    try {
       const customer = await Customer.findOne({_id:req.params.id,status:"Approved"})
       customer.password = CryptoJS.AES.decrypt(customer.password, "secret123").toString(CryptoJS.enc.Utf8);

       if(customer){
        return res.status(200).json(customer)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});
//route to get singel customer by Name // Login Required

router.get("/getCustomerbyName/:name",fetchUser ,async (req,res)=>{
    try {
       const customer = await Customer.findOne({name:req.params.name, status:"Approved"})

       if(customer){
        return res.status(200).json(customer)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel customer and update // Login Required
router.put("/editcustomer/:id", fetchUser,async (req,res)=>{
    try {
        const customer = await Customer.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        if(customer){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel customer and update status // Login Required
router.put("/updatecustomer/:id", fetchUser,async (req,res)=>{
    try {
        
        const customer = await Customer.findByIdAndUpdate({_id:req.params.id},{
            status:req.body.status,
            
        });
        
        if(customer){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single customer // Login Required
router.delete("/deletecustomer/:id",fetchUser,async (req,res)=>{
    try {
        const data = await Customer.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Item Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router