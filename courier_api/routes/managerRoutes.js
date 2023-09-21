const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Manager = require("../models/Manager")
const fetchUser = require('../Middleware/fetchUser')



const JWT_SEC ="JWT12354"
//route to add manager // login required
router.post("/addmanager",fetchUser, async (req,res)=>{
    try {
        const manager =await  Manager.create({
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        res.status(200).json(manager)
    } catch (error) {
        console.log(error.message)
    }
});
//route to login 
router.post("/login",async (req, res)=>{
    try {
        
        const username = req.body.username;
    const password = req.body.password;
        console.log(password)
    const data =await Manager.findOne({name: username})
    const pass = CryptoJS.AES.decrypt(data.password, "secret123").toString(CryptoJS.enc.Utf8);
    
    if(data.name === username && pass ===password)
    {
        const value ={ username:data.name, id: data._id, role: "Manager",branch:data.branch}
        const authToken = jwt.sign(value,JWT_SEC)
        return res.status(200).json({status:true, authToken });
    }
    } catch (error) {
        console.log(error.message)
    }
    
})

 
//route to get all manager // Login Required
router.get('/getmanager' , async (req, res)=>{
    try {
        const manager = await Manager.find()
        if(manager){
            return res.status(200).json(manager)
        }
    } catch (error) {
        res.status(404, error.message)
    }
});

//route to get single manager // Login Required
router.get("/getoneManager/:id",fetchUser ,async (req,res)=>{
    try {
       const manager = await Manager.findOne({_id:req.params.id})
       manager.password = CryptoJS.AES.decrypt(manager.password, "secret123").toString(CryptoJS.enc.Utf8);

       if(manager){
        return res.status(200).json(manager)
       } 
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to get singel manager and update // Login Required
router.put("/editmanager/:id", fetchUser,async (req,res)=>{
    try {
        const manager = await Manager.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            contact:req.body.contact,
            branch:req.body.branch,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString(),
            address:req.body.address
        });
        if(manager){
            return res.status(200).json({msg:"Data Update Successfuly"})
        }
    } catch (error) {
        res.status(404,error.message)
    }
});

//route to delete single manager // Login Required
router.delete("/deletemanager/:id",fetchUser,async (req,res)=>{
    try {
        const data = await Manager.findByIdAndDelete({_id:req.params.id})
       
    if(data){
        return res.status(200).json({msg:"Item Deleted Successfully"})
    }
    } catch (error) {
        res.status(404,error.message)
    }
    
});

module.exports = router