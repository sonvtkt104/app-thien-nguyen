import "./css/SideBar.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu } from "antd"
import HomeHeader from "../Home/components/HomeHeader";


function SideBar({children,key})  {
    const navigate = useNavigate()
    const selectedKey = useLocation().pathname
    
    const highlight = () => {
        // console.log(selectedKey)
        if (selectedKey === '/my-account'){
            return ['1']
        } else if (selectedKey === '/my-account/password'){
            return ['2']
        }  else if (selectedKey === '/my-account/donation-post'){
            return ['3']
        }  else if (selectedKey === '/my-account/request-confirmation'){
            return ['4']
        }  else if (selectedKey === '/'){
            return ['5']
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
                    mode="inline"
                    items={[
                        {label:"Tài khoản", key: '1', onClick: () => { navigate('/my-account')}},
                        {label:"Mật khẩu", key: '2', onClick: () => { navigate('/my-account/password')}},
                        {label:"Bài đăng ủng hộ", key: '3', onClick: () => { navigate('/my-account/donation-post')}},
                        {label:"Yêu cầu xác nhận", key: '4', onClick: () => { navigate('/my-account/request-confirmation')}},
                        {label:"Thoát", key: '5', onClick: () => { navigate('/')}}
                    ]}
                    className="sb-menu"
                >
                </Menu>
            </div>
            
            <div style={{ padding: "14px 0 20px 20px" }}>
                {children}
            </div>
        </div>
    </div>
  );
};
export default SideBar;