import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'

const TraDia = ({ show, phiTre }) => {
    const [callback,setCallback]=useContext(GlobalContext).phieuthueApi.callback
    const [input, setInput] = useState('')
    const handleonChange = (e) => {
        setInput(e.target.value)
    }
    const [showPhi, setShowPhi] = useState(0)

    const[isThanhToan,setIsThanhToa]=useState(false)
    const [sb,setSp]=useState({
        ngayTra: '',
        _id: '',
        phiTre: 0
    })
    useEffect(() => {
        if (input) {
            const tra = new Date(input).getDate()
           const han = (new Date(phiTre.hanTra)).getDate()
            if(tra<han) setShowPhi(0)
            else setShowPhi((tra-han)*1000)
        }
    }, [input,phiTre])
    const handleThanhToan=()=>{
 
        setIsThanhToa(!isThanhToan)
        
    }
    const handleSubmit= async ()=>{
       
        if(isThanhToan) {
            setSp({
                ngayTra: input,
                _id: phiTre._id,
                phiTre: 0
            })
        const res=   await axios.patch('/phieuthue/traDia',{...sb})
        alert(res.data.msg)

           
        }else{
            setSp({
                ngayTra: input,
                _id: phiTre._id,
                phiTre: showPhi
            })
            const res=   await axios.patch('/phieuthue/traDia',{...sb})
            alert(res.data.msg)

        }
      show()
      setCallback(!callback)
    }


    return (
        <div style={{
            position: 'absolute',
            top: '30%',
            left: '35%',
            backgroundColor: '#ccc',
            width: '40%',
            height: '250px',
            padding: '20px',
 
        }}>
            <div
                onClick={() => show()}
                style={{ position: 'absolute', top: '-5px', right: 0, color: 'red', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}>X</div>
            <input type='date' style={{ width: '100%', marginBottom: '20px', marginTop: '20px' }} onChange={handleonChange} value={input} />
            <h5>Phí trễ : {!isThanhToan ? <span>{showPhi}</span> : <strike>{showPhi}</strike>}<button style={{ marginLeft: '50px' }}
            onClick={()=>handleThanhToan()}
            >ThanhToan</button></h5>
            <button style={{ width: '100%', marginTop: '50px' }}
            onClick={()=>handleSubmit()}
            >Hoàn tất</button>
        </div>
    )
}

export default TraDia
