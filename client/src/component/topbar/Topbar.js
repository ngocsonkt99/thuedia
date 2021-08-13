import React, { useContext, useEffect, useState } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { FcManager } from 'react-icons/fc'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
const Topbar = ({ handleShowFormLogin }) => {
    const context = useContext(GlobalContext)
    const [isLogged] = context.userApi.isLogged
    const [user] = context.userApi.user
    const [name, setName] = useState('')
    useEffect(() => {
        if (user) setName(user.name)
    }, [user])
    const logoutUser=async()=>{
        await axios.get('/user/logout')
        localStorage.setItem('login',false)
        window.location.href='/'
    }
    return (
        <div className='topbar'>
            <div className='logo-topbar'>
                <Link to='/'><h3>CD disk manager</h3></Link>
            </div>
            {
                isLogged ?
                    <div className='info' style={{

                        marginTop: '20px'
                    }}>
                        <h4><i style={{marginRight: '10px'}} className="fa fa-user"/>Admin : {name}    <i className="fa fa-power-off"  onClick={logoutUser} style={{
                            marginRight: '30px',
                            marginLeft:'30px'
                        }}/></h4>
                    </div>
                    :
                    <div className='login-user' onClick={() => handleShowFormLogin()}>
                        <FcManager />
                    
                    </div>
            }
        </div>
    )
}

export default Topbar
