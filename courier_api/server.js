const express =require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const adminRoutes = require("./routes/adminRoutes")
const officeRoutes = require("./routes/officeRoutes")
const managerRoutes = require("./routes/managerRoutes")
const customerRoutes = require("./routes/customerRoutes")
const shipmentRoutes = require("./routes/shipmentRoutes")
const courierRoutes = require("./routes/courierRoutes")
const statusRoutes  = require("./routes/statusRoutes")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
 


// hVfaQQmu66YpetTp
mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("DB Connection Successful")
})
.catch((err)=>{
    console.log(err.message)
})

const port = 5001;
app.use('/api/admin/',adminRoutes)
app.use('/api/office/',officeRoutes)
app.use('/api/manager/',managerRoutes)
app.use('/api/customer/',customerRoutes)
app.use('/api/shipment/',shipmentRoutes)
app.use('/api/courier/',courierRoutes)
app.use('/api/status/',statusRoutes)

app.listen(port,()=>{
    console.log(`Courier App is runngin on ${port}`)
})