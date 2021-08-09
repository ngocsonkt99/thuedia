
const PhieuThues = require('../models/PhieuThueModel')
const Customers = require('../models/Customer')
const Disk = require('../models/DiskModel')
const Controller = {
    addPhieuThue: async (req, res) => {
        try {

            const { customer, disk, hanTra } = req.body
   
            const randomId = Math.floor(Math.random() * 1000);
            const phieuThueId = 'PT' + randomId
            const customers = await Customers.findOne({ customerId: customer })
            if (!customers) return res.status(400).json({ msg: " Chưa chọn khách hàng" })
            const disks = await Disk.findOne({ diskId: disk })
            if (!disk) return res.status(400).json({ msg: " Chưa chọn đĩa" })
            const now = new Date()
            const han = new Date(hanTra)
            if(now > han) return res.status(400).json({msg : 'Hạn trả không được nhỏ hơn ngày hiện tại'})
            const total = (han.getDate() - now.getDate()) * disks.rentCost + customers.phiTre

            const newPhieuThue = new PhieuThues({
                phieuThueId, customer: customers._id, disk: disks._id, ngayLap: now, hanTra: han, total
            })
            await newPhieuThue.save()
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


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getPhieuThue: async (req, res) => {
        try {
            const phieuthue = await PhieuThues.find()
           
            res.json({ phieuthue })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = Controller