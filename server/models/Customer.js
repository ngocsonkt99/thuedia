const mongoose = require('mongoose')

const customerShema= new mongoose.Schema({
    customerId:{
        type:String
    },
    name : {
        type : String
    },
    phone : {
        type: String,
    },
    address : {
        type: String,    
    },
    phiTre :{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})
module.exports=mongoose.model('Customer',customerShema)