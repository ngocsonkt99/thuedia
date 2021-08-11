import axios from 'axios'
import{ useEffect, useState } from 'react'

function UserApi(token) {
    const [isLogged,setIsLogged]=useState(false)
    const [user,setUser]=useState(null)
 
    useEffect(()=>{

        if(token){
            const getUser= async ()=>{
                try {
                    const res=await axios.get('/user/info',{
                        headers: {Authorization: token}
                    })
                    
                    setIsLogged(true)
                  
                  setUser(res.data)
                
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
        }
      },[token])
    return {
        isLogged: [isLogged,setIsLogged],
        user : [user,setUser]
    }
}

export default UserApi
