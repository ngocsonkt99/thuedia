
const PhieuThues = require('../models/PhieuThueModel')
const Customers = require('../models/Customer')
const Disk = require('../models/DiskModel')
const { findByIdAndUpdate } = require('../models/PhieuThueModel')

const Controller = {
    addPhieuThue: async (req, res) => {
        try {

            const { customer, disk, hanTra ,phiTre} = req.body
            if (customer=== ' ') return res.status(400).json({ msg: " Chưa nhập khách hàng" })
            const randomId = Math.floor(Math.random() * 1000);
            const phieuThueId = 'PT' + randomId
            const customers = await Customers.findOne({ customerId: customer })
           // if(customers=[]) return res.status(400).json({msg : 'Không có Kh'})
            let disks =[];
            let cost=0;
            let ObId=[]
            for(let i=0 ; i< disk.length;i++){
               const ds= await Disk.findOne({ diskId: disk[i] });
               disks.push(ds)
               cost=cost+ds.rentCost
                ObId.push(ds._id)
              
            }
            
            //const disks = await Disk.findOne({ diskId: disk })
          //  if (!disk) return res.status(400).json({ msg: " Chưa chọn đĩa" })
     
            const now = new Date()
            const han = new Date(hanTra)
            if(now > han) return res.status(400).json({msg : 'Hạn trả không được nhỏ hơn ngày hiện tại'})
            const total =(han.getDate()-now.getDate())*cost+phiTre
            // const disk_id=[]
         
            const newPhieuThue = new PhieuThues({
                phieuThueId, customer: customers._id, disk: ObId, ngayLap: now, hanTra: han, total: total
            })
           await newPhieuThue.save()
          const newPhieu = await PhieuThues.findOne({phieuThueId }).populate('disk customer')
            res.json({
                msg: 'Thêm phiếu thuê thành công',
                newPhieuThue
            })

           
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePhieuThue: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePhieuThue: async (req, res) => {
        try {
            
            await PhieuThues.findByIdAndDelete(req.params.id)
            res.json({
                msg: "Đã xóa"
            })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getPhieuThue: async (req, res) => {
        try {
            const phieuthue = await PhieuThues.find().populate('disk customer').exec()
           
            res.json({ phieuthue })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    ,
    traDia : async (req,res)=>{
        try {
            const {ngayTra,_id,phiTre}=req.body
            const status={
                type : false,
                msg : 'Đã trả'
            }
        
            const tra = new Date(ngayTra)
         
            const phieuthue= await PhieuThues.findById({_id}).populate('customer disk')
     
            // if(tra.getDate()< phieuthue.hanTra.getDate()) phiTre=0
            // else phiTre = (tra.getDate() - phieuthue.hanTra.getDate())*1000
                let phi =phieuthue.customer.phiTre+phiTre

              //  console.log(phi)
            await Customers.findByIdAndUpdate({_id: phieuthue.customer._id}, {
                phiTre:phi
            })
            await PhieuThues.findByIdAndUpdate({_id}, {
                status,tra
            })
            res.json({msg : ' Đã trả đĩa'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = Controller