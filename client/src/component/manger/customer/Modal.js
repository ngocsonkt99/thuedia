import axios from 'axios'
import React, { useContext, useState } from 'react'
import Customer from '../../../api/CustomerApi'
import { GlobalContext } from '../../../GlobalContext'
import ReportCustomer from './ReportCustomer'

const Modal = ({ cancel, customerUpdate, isUpdate }) => {
    const [Report, setReport] = useState([])
    const [isReport, setIsReport] = useState(false)
    const context=useContext(GlobalContext)
    const [callback,setCallback] = context.customerApi.callback
    const [customers, setCustomers] = useState({
        name: customerUpdate.name,
        phone: customerUpdate.phone,
        address: customerUpdate.address
    })
    
    const handleInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setCustomers({ ...customers, [name]: value })
    }

    const handleSubmitCustomer = async e => {
        e.preventDefault()
        if (!isUpdate) {
            try {
                const res = await axios.post('/customer/add', { ...customers })
                setCallback(!callback)
               
                setReport(res.data.customer)
                setIsReport(true)
               

            } catch (err) {
              alert(err.response.data.msg)
            }
        } else {
            try {
                const res = await axios.put(`/customer/${customerUpdate.id}`, { ...customers })
                setCallback(!callback)
                alert(res.data.msg)
               setCallback(!callback)
               cancel()

            } catch (err) {
                alert(err.response.data.msg)
            }
          
        }
    }

    return (
        <div className='modal-add'>
            {isReport ?
                <ReportCustomer item={Report} cancel={cancel} /> :
                <>
                    <div className='cancel-modal' onClick={() => cancel()}>X</div>


                    <form onSubmit={handleSubmitCustomer}>
                        <input placeholder='Họ và tên' name='name' value={customers.name} onChange={handleInput} />
                        <input placeholder='Số điện thoại' name='phone' value={customers.phone} onChange={handleInput} />
                        <input placeholder='Địa chỉ' name='address' value={customers.address} onChange={handleInput} />
                        <button type='submit'>{isUpdate ? ' Cập Nhật Khách Hàng' : 'Thêm Khách Hàng'}</button>
                    </form>
                </>
            }
                
        </div>
    )
}

export default Modal
