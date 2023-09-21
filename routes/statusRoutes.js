const router = require("express").Router();
const Status = require("../models/ConsignmentStatus")

const fetchUser = require('../Middleware/fetchUser')



//route to get single status by cons_number // login required
router.get("/getstatus/:id",fetchUser, async (req,res)=>{
    try {
        const status =await  Status.findOne({consid:req.params.id})
        if(status){
            return res.status(200).json(status.status)

        }
    } catch (error) {
        console.log(error.message)
    }
});

 
//route to get all status // Login Required
router.get('/getstatus',fetchUser , async (req, res)=>{
    try {
        const status = await Status.find()
        if(status){
            return res.status(200).json(status)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});



//route to get single status // Login Required
router.post("/getsingleStatus/:id",fetchUser ,async (req,res)=>{
    try {
       const status = await Status.findOne({cons_id:req.params.id})
       if(status){
        return res.status(200).json(status)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel status and update // Login Required
router.put("/editStatus/:id", fetchUser,async (req,res)=>{
    try {
        const status = await Status.findByIdAndUpdate({_id:req.params.id},{
            status:req.body.status
        });
        if(status){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single status // Login Required
router.delete("/deletestatus/:id",fetchUser,async (req,res)=>{
    try {
        const data = await Status.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router