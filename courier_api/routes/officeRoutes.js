const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Office = require("../models/Office")



const JWT_SEC ="JWT12354"
//route to add office
router.post("/addoffice", async (req,res)=>{
    try {
        const office =await Office .create({
            name:req.body.name,
            contact:req.body.contact,
            email:req.body.email,
            country:req.body.country,
            address:req.body.address
        });
        res.status(200).json(office)
    } catch (error) {
        console.log(error.message)
    }
});

 
//route to get all offices
router.get('/getoffice',async (req, res)=>{
    try {
        const office = await Office.find()
        if(office){
            return res.status(200).json(office)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});
//route to get office by branch
router.get('/getbynameoffice/:name',async (req, res)=>{
    try {
        const office = await Office.find({name:req.params.name})
        
        if(office){
            return res.status(200).json(office)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});
//route to get single office 
router.get("/getoneoffice/:id",async (req,res)=>{
    try {
       const office = await Office.findOne({_id:req.params.id})
       if(office){
        return res.status(200).json(office)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel office and update
router.put("/editoffice/:id",async (req,res)=>{
    try {
        const office = await Office.findByIdAndUpdate({_id:req.params.id},req.body)
        if(office){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single office
router.delete("/deleteOffice/:id",async (req,res)=>{
    try {
        const data = await Office.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Item Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router