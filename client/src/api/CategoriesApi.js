import axios from 'axios'
import {useEffect, useState } from 'react'

function Customer() {
    const [callback,setCallback]=useState(false)
    const [categories,setCategories]=useState([])
 
    const getCategories= async ()=>{
        try {
            const res=await axios.get('/categories')
            
        
            
          setCategories(res.data.category)
      
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    useEffect(()=>{

     
          
            getCategories()
        
      },[callback])

      
    return {
       categories: [categories,setCategories],
       callback:[callback,setCallback]
    }
}

export default Customer
