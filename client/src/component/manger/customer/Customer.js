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
    const [isView,setIsView]=useState(false)
    const [phiTre,setPhiTre]=useState({
        _id: '',
        phiTre: 0
    })
   const handleThemPhiTre= async ()=>{
       try {
        

        console.log(phiTre)
       const res=  await axios.patch('/customer/themPhiTre', {_id:phiTre._id,phiTre:0})
       alert(res.data.msg)
         setCallback(!callback)
         setIsView(false)
       } catch (err) {
           alert(err.response.data.msg)
       }
     
   }
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
    const view=(id)=>{
        customer.forEach(element => {
            if(element._id===id) setPhiTre({
                _id :element._id,
                phiTre: element.phiTre
            })   
        });
        setIsView(true)
    }
    console.log(phiTre)
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
                                isLogged ?     <>   <th scope="col"></th> <th scope='col'></th></>
                                
                                : ''
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
                                              isLogged ? <>
                                             <td >
                                          <img src='delete.svg' alt=''  onClick={()=>deleteSubmit(item._id)}/>
                                            </td> 
                                            <td onClick={()=>view(item._id)}><i className="fa fa-eye"/></td>
                                            </>
                                            :''
                                            
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
            {
                isView ? <div style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    background: '#ccc',
                    width: '35%',
                    height: '150px',
                    padding: '20px'
                }}>
                        <div style={{
                            position:'absolute',
                            top:0,
                            right:'5px',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            color: 'red',
                            cursor: 'pointer'
                        }} onClick={()=>setIsView(false)}>X</div>
                        <h4>Phi trễ : <span style={{color: 'red'}}>{phiTre.phiTre}</span> </h4>
                        <button style={{width: '100%'}} onClick={()=>handleThemPhiTre()}>Xoa</button>
                    </div>
                    : ''
            }
           
        </div>
    )
}

export default Customer
