import Topbar from "./component/topbar/Topbar";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import './component/Page/mainpage.css'
import Login from "./component/until/Login";
import { useContext, useState } from "react";
import Menu from "./component/menu/Menu";
import DashBoard from "./component/dashboard/DashBoard";
import DiskMager from "./component/manger/disk/DiskMager";
import Customer from "./component/manger/customer/Customer";
import { GlobalContext } from "./GlobalContext";

function App() {
  const[showFormLogin,setShowFormLogin]=useState(false)
  const handleShowFormLogin=()=>{
    setShowFormLogin(true)
  }
  const cancelFormLogin=()=>{
    setShowFormLogin(false)
  }
  const[islogges]=useContext(GlobalContext).userApi.isLogged
  return (
    <div className='app'>
      <Router>
        <Topbar handleShowFormLogin={handleShowFormLogin}/>
        <div className='main-page'>
             <Menu/>
            
            <div className='dash'>
                <Switch>
                    <Route path='/' component={DashBoard} exact/>
                    <Route path='/disk' component={islogges ? DiskMager : DashBoard}/>
                    <Route path='/customer' component={Customer}/>
                </Switch>
            </div>
         
        </div>
        {
          showFormLogin ?
        <Login cancelFormLogin={cancelFormLogin}/> : ''
        }
      </Router>

    </div>
  );
}

export default App;
