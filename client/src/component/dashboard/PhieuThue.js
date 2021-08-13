import React, { useState } from 'react'

const PhieuThue = ({filterCus,customer, handleThanhToanPhiTre,isPhiTre}) => {
 
    const [input,setInput]=useState('')
    const handleOnchange=(e)=>{
        setInput(e.target.value)
    }

    return (
        <div className='phieuThue'>
        <h6 style={{
            textAlign: 'center'
        }}>Lập phiếu thuê</h6>
        <div className='input'>
            <input placeholder='Nhập Id khách hàng...'  value={input} onChange={handleOnchange}/>
            <button onClick={()=>filterCus(input)}>Thêm</button>
        </div>
       
        <h6>ID : <span style={{color: 'blue'}}>{customer.customerId}</span> </h6>
        <h6>Họ và tên :  <span style={{color: 'blue'}}>{customer.name}</span></h6>
        <h6>Phí trễ chưa thanh toán :  { isPhiTre ?
        <strike style={{color: 'red'}}>{customer.phiTre} Đ</strike> 
        : <span style={{color: 'blue'}}>{customer.phiTre} Đ</span> }<button  className='btn-phieuThue'
        onClick={()=>handleThanhToanPhiTre()}
            style={{marginLeft: '10px'}}
        >Thanh Toán</button></h6>

    </div>
    )
}

export default PhieuThue
