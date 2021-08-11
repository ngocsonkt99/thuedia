import React from 'react'

const Report = ({ rp, close, isNew }) => {


    return (
        <div style={{
            position: 'absolute',
            top: '30%',
            left: '35%',
            backgroundColor: '#ddd',
            width: '40%',
            height: '300px',
            padding: '20px',

        }}>
            
            {!isNew ? 
            <>

            <h4 style={{ textAlign: 'center', color: 'red' }}>Thông tin</h4> 
            <div

                style={{ position: 'absolute', top: '-5px', right: 0, color: 'red', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                onClick={() => close()}

            >X</div>
            </>
            : <h4 style={{ textAlign: 'center' }}>Thông tin</h4>}
            <h5>Tên KH : {rp.customer.name}</h5>
            {
                !isNew ?

                    <h5>Danh sách đĩa thuê: <select style={{ width: '50%', marginLeft: '50px' }}>
                        {rp.disk.map((item, i) => (
                            <option key={i}>{item.diskId}-{item.title}</option>
                        ))}
                    </select></h5> : ''}
            <h5>Tổng phí : {rp.total} </h5>
            <h5>Ngày mượn : {new Date(rp.ngayLap).toLocaleDateString()}</h5>
            <h5>Ngày Trả : {new Date(rp.hanTra).toLocaleDateString()} </h5>
            <h5>Trạng thái : {rp.status.msg}</h5>
            {
                isNew ? <button style={{ width: '100%', marginTop: '50px' }}

               onClick={()=>close()} >Hoàn tất</button> : ''
            }
          
        </div>
    )
}

export default Report
