import React, { useEffect, useState } from 'react'

const ChiTietThue = ({ filterDiskHandle, filterDisk, handleOnchangeHantra, hanTra ,dia}) => {

    const [input, setInput] = useState('')
    const handleOnchange = (e) => {
        setInput(e.target.value)
    }
    const [han, setHan] = useState('')
    useEffect(() => {
        if (hanTra) setHan(new Date(hanTra).toLocaleDateString())
    }, [hanTra])
    return (<>
      {/* <h6 style={{
                textAlign: 'center'
            }}>Chi tiết phiếu thuê</h6> */}
        <div className='chiTietThue' style={{ display: 'flex',justifyContent: 'space-around'}}>
          
            <div className='left' style={{flex: '9'}}>
                <div className='input'>
                    <input placeholder='Nhập Id đĩa...' value={input} onChange={handleOnchange} />
                    <button onClick={() => filterDiskHandle(input)}>Thêm</button>
                </div>



                <h6>ID : <span style={{ color: 'blue' }}>{filterDisk.diskId}</span></h6>
                <h6>Tiêu đề :  <span style={{ color: 'blue' }}>{filterDisk.title}</span></h6>
                <h6>Giá thuê :  <span style={{ color: 'blue' }}>{filterDisk.rentCost}</span></h6>
                <h6>Hạn trả :  <span style={{ color: 'blue' }}>{han}</span></h6>
                <input type='date' placeholder='Hạn trả..' className='date' value={hanTra} onChange={handleOnchangeHantra} />
            </div>
            <div className='right' style={{flex: '3'}}>
              
                <h5>Đĩa được chọn</h5>
                 {
                        dia.map((item,i)=>(
                            
                            <h6 key={i}>{item.diskId} - {item.title}</h6>
                        ))
                    }
            </div>

        </div>
        </>
    )
}

export default ChiTietThue
