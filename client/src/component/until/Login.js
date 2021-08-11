import axios from 'axios'
import React, { useState } from 'react'
import './until.css'
const Login = ({cancelFormLogin}) => {
    const [user,setUser]=useState({
        account: '',
        password: ''
    })
    const handleOnChange=e=>{

        const{name,value}=e.target;
        setUser({...user,[name]:value})
    }
    const loginSubmit=async e=>{
        e.preventDefault()
        try {
         await axios.post('/user/login',{...user})
   
            localStorage.setItem('login',true)
         
        
         window.location.href='/'
        } catch (error) {
            alert(error.response.data.msg)
        }
}
    return (
        <div className='login'>
            <form onSubmit={loginSubmit}>
                <input type='text' placeholder='Acount' name='account' value={user.account} onChange={handleOnChange}/>

                <input type='password' placeholder='Password' name='password' value={user.password  } onChange={handleOnChange} />



                <button type='submit'>Login</button>
            </form>
            <div className='cancel' onClick={()=>cancelFormLogin()}>X</div>
        </div>
    )
}

export default Login
