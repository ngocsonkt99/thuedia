import React, { useEffect, useState } from 'react'

const ChiTietThue = ({filterDiskHandle,filterDisk,handleOnchangeHantra,hanTra}) => {
 
    const [input,setInput]=useState('')
    const handleOnchange=(e)=>{
        setInput(e.target.value)
    }
    const [han,setHan]=useState('')
    useEffect(()=>{
        if(hanTra) setHan(new Date(hanTra).toLocaleDateString())
    },[hanTra])
    return (
        <div className='chiTietThue'>
                    <h6 style={{
                        textAlign: 'center'
                    }}>Chi tiết phiếu thuê</h6>
                    <div className='input'>
                        <input placeholder='Nhập Id đĩa...' value={input} onChange={handleOnchange} />
                        <button onClick={()=>filterDiskHandle(input)}>Thêm</button>
                    </div>
                   
                    <input type='date' placeholder='Hạn trả..' className='date' value={hanTra} onChange={handleOnchangeHantra}/>
                   
                    <h6>ID : <span style={{color: 'blue'}}>{filterDisk.diskId}</span></h6>
                    <h6>Tiêu đề :  <span style={{color: 'blue'}}>{filterDisk.title}</span></h6>
                    <h6>Giá thuê :  <span style={{color: 'blue'}}>{filterDisk.rentCost}</span></h6>
                    <h6>Hạn trả :  <span style={{color: 'blue'}}>{han}</span></h6>
                </div>
    )
}

export default ChiTietThue
