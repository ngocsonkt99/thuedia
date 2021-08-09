import React, { useState } from 'react'


const Report = ({item,cancel}) => {
  
    return (
        <div className='report'>
            <h3 style={
                {
                    textAlign: 'center',
                    color: 'red'
                }
            }>Thêm Khách Hàng Thành Công !!!</h3>
            <div className='report-detail'>
                <h4 style={{
                    fontWeight: 'bold'
                }}>ID : {item.customerId}</h4>
                <h5>Họ và tên : {item.name}</h5>
                <h5>Số Điện Thoại : {item.phone}</h5>
                <h5>Địa chỉ : {item.address}</h5>
                
            </div>
            <button style={{
                width: '100%',
                border: 'none',
                padding: '7px',
                borderRadius: '5px',
                backgroundColor: '#ccc',
                fontWeight: 'bold'
            }} onClick={()=>cancel()}>Đóng</button>
        </div>
    )
}

export default Report
