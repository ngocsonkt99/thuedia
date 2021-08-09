import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../../GlobalContext'
import './customer.css'
import Modal from './Modal'

const Customer = () => {

    const context = useContext(GlobalContext)
    const [customer] = context.customerApi.customer
    const [callback,setCallback] = context.customerApi.callback
    const[showModal,setShowModal]=useState(false)
    const [isUpdate,setIsUpdate]=useState(false)
   const [isLogged] =context.userApi.isLogged

   
    const[customerUpdate,setCustomerUpdate]=useState({
        id:'',
        name : '',
        phone: '',
        address: ''
    })
    const handleCancel=()=>{
        setShowModal(false)
        setCustomerUpdate({
            name : '',
            phone: '',
            address: ''
        })
    }   

    const deleteSubmit= async id=>{
        try {
            const res= await axios.delete(`/customer/${id}`)
            alert(res.data.msg)
         setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpdate=(id)=>{
        setShowModal(true)
        customer.forEach(item => {
            if(item._id===id) setCustomerUpdate({
                id:item._id,
                name : item.name,
                phone: item.phone,
                address: item.address
            })
        });

        setIsUpdate(true)
    }

    const showModalAdd=()=>{
        setShowModal(true)
        setIsUpdate(false)
    }
    return (
        <div className='customer'>
            <h3 style={{ textAlign: 'center', color: 'blue' }}>Danh sách khách hàng</h3>
            <div className='add-customer'
                onClick={()=>showModalAdd()}
            ><i className="fa fa-plus"/></div>
            <div className='table-customer' style={{margin: '10px'}}>
                <table className="table table-bordered">
                    <thead>
                        <tr className='table-primary'>
                            <th scope='col'>STT</th>
                            <th scope="col">ID Khách Hàng</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col"></th>
                            {
                                isLogged ?        <th scope="col"></th> : ''
                            }
                       
                        </tr>
                    </thead>
                    <tbody>
                        {

                            customer.map((item, i) => (
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <td>{item.customerId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td><img src='pen-solid.svg' alt=''  onClick={()=>handleUpdate(item._id)}/></td>
                                   
                                        {
                                              isLogged ? 
                                             <td >
                                          <img src='delete.svg' alt=''  onClick={()=>deleteSubmit(item._id)}/>
                                            </td> :''
                                        }
                                    
                             
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {
                showModal ?  <Modal cancel={handleCancel} customerUpdate={customerUpdate} isUpdate={isUpdate}/> : ''
            }
         
           
        </div>
    )
}

export default Customer
