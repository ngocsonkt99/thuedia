import axios from 'axios'
import React, { useContext, useState } from 'react'

import { GlobalContext } from '../../../GlobalContext'
const ModalDisk = ({ cancel, diskUpdate, isUpdate }) => {
  
    const context = useContext(GlobalContext)
    const [callback, setCallback] = context.diskApi.callback
    const [disks, setDisks] = useState({
        title: diskUpdate.title,
        category: diskUpdate.category,
        copies: diskUpdate.copies,
        rentCost: diskUpdate.rentCost
    })
    const [categories]=context.categoriesApi.categories
    const handleInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setDisks({ ...disks, [name]: value })
    }
    const handleSubmitDisk = async e => {
        e.preventDefault()
        if (!isUpdate) {
            try {
                const res = await axios.post('/disk/add', { ...disks })
                setCallback(!callback)
                alert(res.data.msg)
                cancel()

            } catch (err) {
                alert(err.response.data.msg)
            }
        } else {
            try {
                const res = await axios.put(`/disk/${diskUpdate.id}`, { ...disks })
                setCallback(!callback)
                alert(res.data.msg)
                cancel()


            } catch (err) {
                alert(err.response.data.msg)
            }

        }
    }

    return (
        <div className='modal-add' style={{height: '400px'}}>

            <div className='cancel-modal' onClick={() => cancel()}>X</div>


            <form onSubmit={handleSubmitDisk}>
                <input placeholder='Tiêu đề' name='title' value={disks.title} onChange={handleInput} />
               
                <select name='category' value={disks.category} onChange={handleInput}
                    style={{
                        padding: '7px',
                        marginBottom:'30px',
                        border:'1px solid #ccc',
                        outline: 'none',
                        borderRadius: '5px'
                    }}
                >
                        {
                            categories.map(item=>(
                                <option value={item._id} key={item._id}>
                                    {item.name}
                                </option>
                            ))
                        }
                </select>
                <input placeholder='Số lượng' name='copies' value={disks.copies} onChange={handleInput} />
                <input placeholder='Phí thuê' name='rentCost' value={disks.rentCost} onChange={handleInput} />
                <button type='submit'>{isUpdate ? ' Cập Nhật Đĩa' : 'Thêm Đĩa'}</button>
            </form>
        </div>
    )
}

export default ModalDisk
