import { DropboxOutlined, ExceptionOutlined, HomeOutlined, OrderedListOutlined, ShopOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import Header from "./Header"
import "./index.css"
import { Menu, Row } from "antd"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenSubMenu } from "../../redux/appSlice"

export function PageLayout({
    children,
    keyActive=''
}) {
    console.log('page layout')
    const dispatch = useDispatch()
    const {openSubMenu} = useSelector(state => state.app)

    return (
        <div className="page-layout-app">
            <div className="page-layout-sidebar">
                <Row style={{margin: '40px 0'}}>
                    <img src="/images/logo-app.png" alt="logo app" 
                        style={{width: 40}}
                    />
                    <span style={{fontSize: 18, fontWeight: '600', marginLeft: 16}}
                        className='flex-col-center'
                    >
                        Thiện Nguyện
                    </span>
                </Row>

                <Menu
                    selectedKeys={[keyActive]}
                    openKeys={ openSubMenu ? ['donate']: []}
                    onOpenChange={(openKeys) => {
                        console.log(openKeys)
                        if(openKeys.length > 0) {
                            dispatch(setOpenSubMenu(true))
                        } else {
                            dispatch(setOpenSubMenu(false))
                        }

                    }}
                    onClick={({key}) => {
                        console.log('key', key)
                    }}
                    mode="inline"
                >
                    <Menu.Item icon={<HomeOutlined style={{fontSize: 24}} />} key='dashboard'>
                        <Link to="/home-page-charity">
                            <span style={{fontSize: 16}}>Trang chủ</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item icon={<ExceptionOutlined style={{fontSize: 24}} />} key='info'>
                        <Link to="/general-information">
                            <span style={{fontSize: 16}}>Thông tin chung</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item icon={<OrderedListOutlined style={{fontSize: 24}} />} key='campaign'>
                        <Link to="/campaign-list">
                            <span style={{fontSize: 16}}>Cuộc vận động</span>
                        </Link>
                    </Menu.Item>
                    <Menu.SubMenu 
                        icon={<ShopOutlined style={{fontSize: 24}} />} 
                        key='donate'
                        title="Quyên góp"
                    >
                        <Menu.Item icon={<UnorderedListOutlined style={{fontSize: 24}} />} key='donation'>
                            <Link to="/donation">
                                <span style={{fontSize: 16}}>Danh sách</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<DropboxOutlined style={{fontSize: 24}} />} key='my-donation'>
                            <Link to="/mydonation">
                                <span style={{fontSize: 16}}>Quyên góp của tôi</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
            <Header />
            <div style={{ padding: 20 }}>
                {children}
            </div>
        </div>
    )
}
