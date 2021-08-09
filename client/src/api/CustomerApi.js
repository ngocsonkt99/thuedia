import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

function Customer() {
    const [callback,setCallback]=useState(false)
    const [customer,setCustomer]=useState([])
 
    const getUser= async ()=>{
        try {
            const res=await axios.get('/customer/get')
            
        
            
          setCustomer(res.data.customers)
      
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    useEffect(()=>{

     
          
            getUser()
        
      },[callback])

      
    return {
       customer: [customer,setCustomer],
       callback:[callback,setCallback]
    }
}

export default Customer
