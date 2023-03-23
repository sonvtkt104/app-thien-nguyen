import "./css/SideBar.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu } from "antd"
import Header from "../../../components/PageLayout/Header";
import HomeHeader from "../Home/components/HomeHeader";
import { useState } from "react";


function SideBar({children,key})  {
    const navigate = useNavigate()
    const selectedKey = useLocation().pathname
    
    const highlight = () => {
        // console.log(selectedKey)
        if (selectedKey === '/my-account'){
            return ['1']
        } else if (selectedKey === '/my-account/donation-post'){
            return ['2']
        }  else if (selectedKey === '/my-account/request-confirmation'){
            return ['3']
        }  else if (selectedKey === '/'){
            return ['4']
        }  
    }
  return (
    <div >
        <HomeHeader/>
        <div className="sb-layout">
            <div className="sb-sidebar">
                <Menu
                    defaultSelectedKeys={['1']}
                    selectedKeys={highlight()}
                    // defaultSelectedKeys={['myaccount']}
                    // key={['myaccount','post', 'confirmation', 'escape']}
                    // selectedKeys={tab}
                    // onClick={(e) => {setTab(e.keyPath)}}
                    mode="inline"
                    items={[
                        {label:"Tài khoản", key: '1', onClick: () => { navigate('/my-account')}},
                        {label:"Bài đăng ủng hộ", key: '2', onClick: () => { navigate('/my-account/donation-post')}},
                        {label:"Yêu cầu xác nhận", key: '3', onClick: () => { navigate('/my-account/request-confirmation')}},
                        {label:"Thoát", key: '4', onClick: () => { navigate('/')}}
                    ]}
                    className="sb-menu"
                >
                    {/* <Menu.Item  key='myaccount' >
                        <Link to="/my-account">
                            <span style={{fontSize: 18}}>Tài khoản</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item  key='post' >
                        <Link to="/my-account/donation-post">
                            <span style={{fontSize: 18}}>Bài đăng ủng hộ</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item  key='confirmation' >
                        <Link to="/my-account/request-confirmation">
                            <span style={{fontSize: 18}}>Yêu cầu xác nhận</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item  key='escape' >
                        <Link to="/">
                            <span style={{fontSize: 18}}>Thoát</span>
                        </Link>
                    </Menu.Item> */}
                    
                </Menu>
            </div>
            {/* <Header/> */}
            
            <div style={{ padding: "14px 0 20px 20px" }}>
                {children}
            </div>
        </div>
    </div>
  );
};
export default SideBar;