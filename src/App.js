import { useEffect } from 'react';
import React  from 'react';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTokenFromCookies, getUserInfomationFromCookies } from './pages/Authentication/HandleUserInfomation';
import { useDispatch } from 'react-redux';
import { setInfoUser, setUserType } from './redux/appSlice';

function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log("App", getUserInfomationFromCookies());

    let infoUser = getUserInfomationFromCookies();
    if(infoUser) {
      dispatch(setInfoUser(infoUser));
      if (infoUser?.roleId == 1) {
        dispatch(setUserType('admin'))
      } else if (infoUser?.roleId == 3) {
        dispatch(setUserType('charity'))
      } else {
        dispatch(setUserType('normal_user'))
      }
    }

  }, [])

  return (
    <div className="app">
        <Router />

        <ToastContainer
           position="bottom-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="light"
       />
    </div>
  );
}

export default App;
