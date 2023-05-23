import "./css/SideBar.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Affix, Col, Menu, Modal, Row } from "antd"
import HomeHeader from "../Home/components/HomeHeader";
import { logOutApp } from "./MyAccountService";
import { handleLogout } from "../../Authentication/HandleUserInfomation";
import { FooterClient } from "../../../components";

function SideBar({children,key})  {
    const navigate = useNavigate()
    const selectedKey = useLocation().pathname

    const handleLogOutApp = () => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn Đăng xuất?`,
            okText: "Có",
            cancelText: "Quay lại",
            okType: "danger",
            onOk: () => {
                logOutApp().then(res => {
                    if(res?.status === 200) {
                        handleLogout()
                        navigate('/')
                    }
                })
            }
        });
    }
    
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
        <Row
            style={{ background: 'var(--color-background-header)', height: '250px' }}
            className='flex-col-center'
            justify='center'
        >
            <Row className="h1-app" justify='center'>TÀI KHOẢN</Row>
        </Row>
        <Row justify='center'>
            <Col span={21}>
                <Row>
                    <Col span={6} className="menu-sidebar-client" style={{padding:'20px 0'}}>
                        <div
                            style={{
                                position: "sticky",
                                top: "130px",
                            }}
                        >
                            <Menu
                                defaultSelectedKeys={['1']}
                                selectedKeys={highlight()}
                                mode="inline"
                                items={[
                                    {label:"Tài khoản", key: '1', onClick: () => { navigate('/my-account')}},
                                    {label:"Bài đăng ủng hộ", key: '2', onClick: () => { navigate('/my-account/donation-post')}},
                                    {label:"Tổ chức đã theo dõi", key: '3', onClick: () => { navigate('/my-account/organization-follow')}},
                                    {label:"Cuộc vận động đã thích", key: '4', onClick: () => { navigate('/my-account/campaign-saved')}},
                                    // {label:"Thoát", key: '5', onClick: () => { navigate('/')}},
                                    {label:"Đăng xuất", key: '5', onClick: () => { handleLogOutApp()}},
                                    // {label:"Yêu cầu xác nhận", key: '6', onClick: () => { navigate('/my-account/request-confirmation')}},
                                    // {label:"Mật khẩu", key: '7', onClick: () => { navigate('/my-account/password')}}
                                ]}
                                className="sb-menu"
                            >
                            </Menu>
                        </div>
                    </Col>
                    
                    <Col span={18} style={{ padding: "24px 0 20px 20px" }}>
                        {children}
                    </Col>
                </Row>
            </Col>
        </Row>
        <div style={{marginTop: 70}}>
            <FooterClient />
        </div>
    </div>
  );
};
export default SideBar;