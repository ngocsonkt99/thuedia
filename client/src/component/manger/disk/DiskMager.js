
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../../GlobalContext'
import ModalDisk from './ModalDisk'
const DiskMager = () => {
    const context = useContext(GlobalContext)
    const [disks] = context.diskApi.disks
    const [callback, setCallback] = context.diskApi.callback
    const [showModal, setShowModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [diskUpdate, setDiskUpdate] = useState({
        id: '',
        title: '',
        category: '',
        copies: '',
        rentCost: ''
    })
    const handleCancel = () => {
        setShowModal(false)
        setDiskUpdate({
            title: '',
            category: '',
            copies: '',
            rentCost: ''
        })
    }

    const deleteSubmit = async id => {
        try {
            const res = await axios.delete(`/disk/${id}`)
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpdate = (id) => {
        setShowModal(true)
        disks.forEach(item => {
            if (item._id === id) setDiskUpdate({
                id: item._id,
                title: item.title,
                category: item.category,
                copies: item.copies,
                rentCost: item.rentCost
            })
        });

        setIsUpdate(true)
    }

    const showModalAdd = () => {
        setShowModal(true)
        setIsUpdate(false)
    }
    return (
        <div className='customer'>
            <h3 style={{ textAlign: 'center', color: 'blue' }}>Danh Sách Đĩa</h3>
            <div className='add-customer'
                onClick={() => showModalAdd()}
            ><i className="fa fa-plus" /></div>
            <div className='table-customer' style={{ margin: '10px' }}>
                <table className="table table-bordered">
                    <thead>
                        <tr className='table-primary'>
                            <th scope='col'>STT</th>
                            <th scope="col">ID Đĩa</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Loại đĩa</th>
                            <th scope="col">Số lương</th>
                            <th scope="col">Phí thuê</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {


                            disks.map((item, i) => (
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <td>{item.diskId}</td>
                                    <td>{item.title}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.copies}</td>
                                    <td>{item.rentCost}</td>
                                    <td><img src='pen-solid.svg' alt='' onClick={()=>handleUpdate(item._id)} /></td>
                                    <td >
                                        <img src='delete.svg' alt='' onClick={() => deleteSubmit(item._id)} />
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {
                showModal ? <ModalDisk  cancel={handleCancel} diskUpdate={diskUpdate} isUpdate={isUpdate}/> : ''
            }
        </div>
    )
}

export default DiskMager
