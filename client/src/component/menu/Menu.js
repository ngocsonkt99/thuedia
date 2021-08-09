import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import './menu.css'
import axios from 'axios'
import {RiCustomerService2Fill} from'react-icons/ri'
import { GlobalContext } from '../../GlobalContext'
const Menu = () => {
    const context=useContext(GlobalContext)
    const [isLogged]=context.userApi.isLogged
    const logoutUser=async()=>{
        await axios.get('/user/logout')
        localStorage.setItem('login',false)
        window.location.href='/'
    }
    return (
        <div className='menu'>
            <Link to='/' className='menu-a-dash'><h3><AiFillHome style={{ marginRight: '20px' }} />Trang Chủ</h3></Link>
            <div className='menu-product'>
                <h3><i className="fa fa-tasks" style={{marginRight: '20px   '}}/>Quản Lý</h3>
                <ul>
                {isLogged ? <>
                    <li><Link to='/disk'> <i className="fa fa-building-o" style={{ marginRight: '10px' }}/>Quản lý đĩa</Link></li>
                    
                    <li><Link to='/user'>  <i className="fa fa-user" style={{ marginRight: '10px' }}/>Users Management</Link></li>
                    </>
                    : ''}
                    <li><Link to='/customer'>  <RiCustomerService2Fill style={{ marginRight: '10px' }}/>Quản lý khách hàng</Link></li>
                </ul>
            </div>
            {
                isLogged ?<div className='logout-user' title='Logout' onClick={logoutUser}>
                <i className="fa fa-power-off" />
            </div> : ''
            }
            
        </div>
    )
}

export default Menu
