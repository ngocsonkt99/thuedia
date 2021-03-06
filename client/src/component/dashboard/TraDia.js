import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import Loading from '../until/Loading'


const TraDia = ({ show, phiTre }) => {

    const [callback, setCallback] = useContext(GlobalContext).phieuthueApi.callback
    const [callbackCus, setCallbackCus] = useContext(GlobalContext).customerApi.callback
    const [callbackDisk, setCallbackDisk] = useContext(GlobalContext).diskApi.callback
    const [input, setInput] = useState('')
    const [disk,setDisk]=useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(phiTre){
            const id=[]
            phiTre.disk.forEach(element => {
                id.push(element._id)
            });
            setDisk(id)
        }
        
    },[phiTre])

  
    const handleonChange = (e) => {
        setInput(e.target.value)
    }
    const [showPhi, setShowPhi] = useState(0)

    const [isThanhToan, setIsThanhToa] = useState(false)
    const [sb, setSp] = useState({
        ngayTra: '',
        _id: '',
        phiTre: 0
    })

    useEffect(() => {
        if (input) {
            const tra = new Date(input).getDate()
            const han = (new Date(phiTre.hanTra)).getDate()
            if (tra < han) setShowPhi(0)
            else setShowPhi((tra - han) * 1000)
        }
    }, [input, phiTre])
    const handleThanhToan = () => {

        setIsThanhToa(!isThanhToan)

    }
    useEffect(() => {
        if (isThanhToan) {
            setSp({
                ngayTra: input,
                _id: phiTre._id,
                phiTre: 0
            })

        } else {
            setSp({
                ngayTra: input,
                _id: phiTre._id,
                phiTre: showPhi
            })
        }
    }, [isThanhToan, input, phiTre, showPhi])
    const handleSubmit = async () => {
       try {
        
        //console.log(disk)
        const res = await axios.patch('/phieuthue/traDia', { ...sb })
        await axios.patch('/disk/update_tra', { disk: disk })
       alert(res.data.msg)

        setLoading(false)
        show()
        setCallbackDisk(!callbackDisk)
        setCallback(!callback)
        setCallbackCus(!callbackCus)
       } catch (err) {
           alert(err.response.data.msg)
       }
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
            <h5>Ph?? tr??? : {!isThanhToan ? <span>{showPhi}</span> : <strike>{showPhi}</strike>}<button style={{ marginLeft: '50px' }}
                onClick={() => handleThanhToan()}
            >ThanhToan</button></h5>
            <button style={{ width: '100%', marginTop: '50px' }}
                onClick={() => handleSubmit()}
            >Ho??n t???t</button>
            {loading ?
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '55%'
                }}>
                    <Loading />
                </div>
                : ''
            }
        </div>



    )
}

export default TraDia
