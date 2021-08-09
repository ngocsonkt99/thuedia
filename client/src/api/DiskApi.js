import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Disk() {
    const [callback,setCallback]=useState(false)
    const [disks,setDisks]=useState([])
 
    const getDisk= async ()=>{
        try {
            const res=await axios.get('/disk/get')
            
        
            
          setDisks(res.data.disks)
      
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    useEffect(()=>{

     
          
            getDisk()
        
      },[callback])

      
    return {
       disks: [disks,setDisks],
       callback:[callback,setCallback]
    }
}

export default Disk
