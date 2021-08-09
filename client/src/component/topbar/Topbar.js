import React, { useContext, useEffect, useState } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { FcManager } from 'react-icons/fc'
import { GlobalContext } from '../../GlobalContext'
const Topbar = ({ handleShowFormLogin }) => {
    const context = useContext(GlobalContext)
    const [isLogged] = context.userApi.isLogged
    const [user] = context.userApi.user
    const [name, setName] = useState('')
    useEffect(() => {
        if (user) setName(user.name)
    }, [user])

    return (
        <div className='topbar'>
            <div className='logo-topbar'>
                <Link to='/'><h3>CD disk manager</h3></Link>
            </div>
            {
                isLogged ?
                    <div className='info'>
                        <h4>Admin : {name}</h4>
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
