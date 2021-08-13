
const Disks = require('../models/DiskModel')

const Controller = {
    addDisk: async (req, res) => {
        try {
            const { title, category, copies, rentCost } = req.body
            const disk = await Disks.findOne({ title })
            if (disk) return res.status(400).json({ msg: 'Tiêu đề đã tồn tại' })
            const randomId = Math.floor(Math.random() * 1000);
            const diskId = 'CD' + randomId

            const newDisk = new Disks({
                diskId, title, category, copies, rentCost
            })


            await newDisk.save()
            res.json({
                msg: 'Thêm đĩa thành công !!!',
                newDisk
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateDisk: async (req, res) => {
        try {
            const { title, category, copies, rentCost } = req.body
            const disk = await Disks.findOne({ title })
            // if (disk) return res.status(400).json({ msg: 'Tiêu đề đã tồn tại' })
            await Disks.findByIdAndUpdate({ _id: req.params.id }, {
                title, category, copies, rentCost
            })
            res.json({ msg: 'Đĩa đã được cập nhật' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteDisk: async (req, res, next) => {
        try {
            const disk = await Disks.findById(req.params.id)
            await disk.remove()
            res.json({
                msg: "Đĩa đã được xóa"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getDisk: async (req, res) => {
        try {
            const disks = await Disks.find().populate('category').exec();
            res.json({ disks })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCopiesDiskThue: async (req, res) => {
        try {
            const { disk } = req.body
            let sl = 0
            for (let i = 0; i < disk.length; i++) {
                const ds = await Disks.findById({ _id: disk[i] });
             sl = ds.copies - 1
            //    console.log(ds)
                await Disks.findByIdAndUpdate({_id: disk[i]}, {
                    copies : sl
                })
            }

            res.json({ msg: 'xong' })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateCopiesDiskTra: async (req, res) => {
        try {
            const { disk } = req.body
            let sl = 0
            for (let i = 0; i < disk.length; i++) {
                const ds = await Disks.findById({ _id: disk[i] });
             sl = ds.copies +1
            //    console.log(ds)
                await Disks.findByIdAndUpdate({_id: disk[i]}, {
                    copies : sl
                })
            }

            res.json({ msg: 'xong' })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = Controller