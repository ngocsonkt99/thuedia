const mongoose = require('mongoose')


const phieuThueShema= new mongoose.Schema({
    phieuThueId:{
        type:String,
        
    },
    customer: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Customer'
    },
    disk: [{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Disk'
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
    },
    ngayTra : {
        type: Date,
        
    }
   
},{
    timestamps: true
})


module.exports=mongoose.model('phieuthue',phieuThueShema)