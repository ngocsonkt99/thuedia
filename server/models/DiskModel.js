const mongoose = require('mongoose')
const PhieuThue= require('./PhieuThueModel')
const diskShema= new mongoose.Schema({
    diskId:{
        type:String
    },
    title : {
        type : String
    },
    category : {
        type:mongoose.Schema.Types.ObjectId, required:true, ref:'Categories'
    },
    copies : {
        type: Number,    
    },
    rentCost : {
        type : Number,
        default:0
    }
},{
    timestamps: true
})
diskShema.pre('remove', function(next) {
    // Sẽ tìm những books có id author mà bạn xóa
    PhieuThue.find({disk: this.id}, (err, disks) => {
        if (err) {
            next (err)
        } else if (disks.length > 0) {
            disks.forEach(ds => ds.remove())
            next()
        } else {
            next()
        }
    })
})

module.exports=mongoose.model('Disk',diskShema)