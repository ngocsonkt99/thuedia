import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import ChiTietThue from './ChiTietThue'
import './dashboard.css'
import PhieuThue from './PhieuThue'
import {GrView} from 'react-icons/gr'
import {} from 'react-icons/'
const DashBoard = () => {
    const context = useContext(GlobalContext)
    const [disks]=context.diskApi.disks
    const [customers]=context.customerApi.customer
    const [filterCus,setFilterCus]=useState({})
    const [filterDisk,setFilterDisk]=useState({})
    const [phieuthue]=context.phieuthueApi.phieuthue
    const [callback,setcallback]=context.phieuthueApi.callback
    const [hanTra,setHanTra]=useState('')
 
    const[thongTin,setThongTin]=useState({
        customer : "",
        disk : "",
        hanTra : ""
    })
    
    const handleThemPhieuThu=async ()=>{
        if(filterCus && filterDisk){
        setThongTin({
            customer : filterCus.customerId,
            disk : filterDisk.diskId,
            hanTra : hanTra

        })
    }
        try {
          const res=await axios.post('/phieuthue/add',{...thongTin})
        
            alert(res.data.msg)
            setcallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    
    }
   
    const[phieuThueAll,setPhieuThueAll]=useState([
        {
            id: '',
            customer: '',
        
            ngayLap:'',
            hanTra: '',
            total : 0,
            status: ''
        }
    ])
 
    useEffect(()=>{
        const thue=[];
        let kh='';
        let dia='';
        phieuthue.forEach(p => {
            disks.forEach(ds => {
                if(ds._id===p.disk) dia=ds.title
            });
            customers.forEach(cus => {
                if(cus._id===p.customer) kh=cus.name
            });
            thue.push({
                id: p._id,
                customer: kh,
            disk: dia,
            ngayLap:p.ngayLap,
            hanTra: p.hanTra,
            total:p.total,
            status: p.status
            })

        });
        setPhieuThueAll(thue)
    },[phieuthue])


  
    const handleOnchangeHantra=e=>{
        setHanTra(e.target.value)
    }
    const filterCustomer=(id)=>{
        if(customers){
        customers.forEach(cus => {
            if(cus.customerId===id) setFilterCus(cus)
            
        });
      
    }
        
    }
    const filterDiskHandle=(id)=>{
       
        if(disks){
        disks.forEach(ds => {
            if(ds.diskId===id) setFilterDisk(ds)
            
        });
    }
        
    }
    const handleView=id=>{
     phieuthue.forEach(element => {
         console.log(element)
     });
       
    }

    return (
        <>
            <h4 style={{
                textAlign: 'center',
                background: '#ccc',
                letterSpacing: '1px',
                textTransform: 'capitalize'
            }}>Phiếu thuê</h4>
            <div className='dashboard'>

              <PhieuThue filterCus={filterCustomer} customer={filterCus}/>
               <ChiTietThue filterDiskHandle={filterDiskHandle} filterDisk={filterDisk} hanTra={hanTra} handleOnchangeHantra
               ={handleOnchangeHantra}/>
            </div>
            <button
            onClick={()=>handleThemPhieuThu()}
            style={{
                margin: '10px',
                outline: 'none',
                border: 'none',
                padding: '7px',
                background: "#aaa",
                borderRadius: '3px',
                color: 'whitesmoke',
                fontWeight: 'bold'
            }}>Lập phiếu thuê</button>
            
            <table className="table table-bordered">
                <thead>
                    <tr className='table-primary'>
                        <th scope='col'>STT</th>
                        <th scope="col">Tên KH</th>
                       
                        <th scope="col">Ngày lập</th>
                        <th scope="col">Hạn trả</th>
                        <th scope="col">Tổng phí</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        
                    </tr>
                </thead>
                <tbody>

                     {

                            phieuThueAll.map((item, i) => (
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                 
                                    <td>{item.customer}</td>
                                  
                                    <td>{new Date(item.ngayLap).toLocaleDateString()}</td>
                                    <td>{new Date(item.hanTra).toLocaleDateString()}</td>
                                    <td>{item.total}</td>
                                    <td style={item.status.type ? {color : 'red'} : {color : 'green'}}>{item.status.msg}</td>
                                    <td onClick={()=>handleView(item.id)}><GrView/></td>   
                                    <td><button style={{
                                        borderRadius: '2px',
                                
                                        margin:'auto',
                                        display: 'flex',
                                    
                                    
                                        padding: '5px'
                                    }}>Trả đĩa</button></td>   
                                </tr>
                            ))
                        }

                </tbody>
            </table>

        </>
    )
}

export default DashBoard
