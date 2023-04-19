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
        } else if (selectedKey === '/my-account/donation-post'){
            return ['2']
        }  else if (selectedKey === '/my-account/organization-follow'){
            return ['3']
        } else if (selectedKey === '/my-account/campaign-saved'){
            return ['4']
        } else if (selectedKey === '/'){
            return ['5']
        }  
        // else if (selectedKey === '/my-account/request-confirmation'){
        //     return ['6']
        // }  else if (selectedKey === '/my-account/password'){
        //     return ['7']
        // }  
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
                        {label:"Bài đăng ủng hộ", key: '2', onClick: () => { navigate('/my-account/donation-post')}},
                        {label:"Tổ chức đã theo dõi", key: '3', onClick: () => { navigate('/my-account/organization-follow')}},
                        {label:"Cuộc vận động đã lưu", key: '4', onClick: () => { navigate('/my-account/campaign-saved')}},
                        {label:"Thoát", key: '5', onClick: () => { navigate('/')}},
                        // {label:"Yêu cầu xác nhận", key: '6', onClick: () => { navigate('/my-account/request-confirmation')}},
                        // {label:"Mật khẩu", key: '7', onClick: () => { navigate('/my-account/password')}}
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