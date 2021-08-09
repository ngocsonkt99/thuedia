require('dotenv').config()
const express=require("express")
const mongoose =require('mongoose')
const cors =require('cors')
const fileUpload = require('express-fileupload')
const coockieParser =require('cookie-parser')

const app=express()
app.use(express.json())
app.use(coockieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

///////////routes
app.use('/api/user',require('./routes/UserRotes'))
app.use('/api/customer',require('./routes/Customer'))
app.use('/api/disk',require('./routes/DiskRoutes'))
app.use('/api/categories',require('./routes/CategoriesRoutes'))
app.use('/api/phieuthue',require('./routes/PhieuThueRoutes'))


const URI=process.env.MONGO_URL
mongoose.connect(URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},err=>{
    if(err) throw err;
    console.log('connectc DB')
})
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server stated ',PORT)
})
