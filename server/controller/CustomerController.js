
const Customers = require('../models/Customer')

const customerController = {
    addCustomer: async (req, res) => {
        try {
            const { name, phone, address } = req.body
            const customer = await Customers.findOne({ phone })
            if (customer) return res.status(400).json({ msg: 'Số điện thoại đã tồn tại' })
            const randomId = Math.floor(Math.random() * 100000);
            const customerId = 'KH' + randomId
            if (customerId.customerId === customerId) return res.status(400).json({ msg: 'ID Khách hàng đã tồn tại vui lòng thêm lại khách hàng' })
            const newCustomer = new Customers({
                customerId, name, phone, address
            })

            await newCustomer.save()
            res.json({
                msg: 'Thêm Khách hàng thành công !!!',
                customer: newCustomer
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCustomer: async (req, res) => {
        try {
            const { name, phone, address } = req.body
            const customer = await Customers.findOne({ phone })
            
          //  if (customer.phone===phone) return res.status(400).json({ msg: 'Số điện thoại đã tồn tại' })
            await Customers.findByIdAndUpdate({_id:req.params.id},{
                name, phone, address 
            })
            res.json({msg : 'Khách hàng đã được cập nhật'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            await Customers.findByIdAndDelete(req.params.id)
            res.json({
                msg : "Đã xóa Khách hàng"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getCustomer: async (req, res) => {
        try {
            const customers = await Customers.find()
            res.json({ customers })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = customerController