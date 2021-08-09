const mongoose = require('mongoose')

const userShema= new mongoose.Schema({
    account : {
        type : String
    },
    password : {
        type: String,
    },
    name : {
        type: String,
        default: 'Nhân viên'
    },
    phone : {
        type: String
    },
    position : {
        type : String,
        default: 'C'
    }
},{
    timestamps: true
})
module.exports=mongoose.model('user',userShema)