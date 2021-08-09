import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import UserApi from './api/UserApi'
import CustomerApi from './api/CustomerApi'
import DiskApi from './api/DiskApi'
import CategoriesApi from './api/CategoriesApi'
import PhieuThueApi from './api/PhieuThueApi'
export const GlobalContext=createContext()

export const DataProvider=({children})=>{
    const[token,setToken]=useState(false)
    const refreshToken=async()=>{
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
    }
    useEffect(()=>{
        const login=localStorage.getItem('login')
        if(login) refreshToken()
    },[])
    const data={
        token: [token,setToken],
        userApi: UserApi(token),
        customerApi:CustomerApi(),
        diskApi : DiskApi(),
        categoriesApi:CategoriesApi(),
        phieuthueApi: PhieuThueApi()
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}
