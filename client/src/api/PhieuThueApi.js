import axios from 'axios'
import {useEffect, useState } from 'react'

function Customer() {
    const [callback,setCallback]=useState(false)
    const [phieuthues,setPhieuThues]=useState([])
 
    const getPhieuThue= async ()=>{
        try {
            const res=await axios.get('/phieuthue/get')
            
        
            
          setPhieuThues(res.data.phieuthue)
      
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    useEffect(()=>{

     
          
            getPhieuThue()
        
      },[callback])

      
    return {
  phieuthue: [phieuthues,setPhieuThues],
       callback:[callback,setCallback]
    }
}

export default Customer
