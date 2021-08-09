const mongoose = require('mongoose')


const phieuThueShema= new mongoose.Schema({
    phieuThueId:{
        type:String
    },
    customer: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'customer'
    },
    disk: [{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'disk'
    }],
    ngayLap:{
        type: Date,
        required:true
    },
    hanTra:{
        type: Date,
        required:true
    },
    total:{

        type: Number,
        required: true
    },
    status:{
        type: Object,
        required:'true',
        default: {
            type : true,
            msg : "Đang thuê"
        }
    }
   
},{
    timestamps: true
})


module.exports=mongoose.model('phieuthue',phieuThueShema)