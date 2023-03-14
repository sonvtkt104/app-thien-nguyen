import { ExceptionOutlined, HomeOutlined } from "@ant-design/icons"
import Header from "./Header"
import "./index.css"

export function PageLayout({ children }) {

    const menus = [
        {
            key: 1,
            title: 'Trang chủ',
            link: '/',
            icon: (<HomeOutlined />)
        },
        {
            key: 2,
            title: 'Thông tin chung',
            link: '/',
            icon: (<ExceptionOutlined />)
        }
    ]

    return (
        <div className="page-layout-app">
            <div className="page-layout-sidebar">
                
            </div>
            <Header />
            <div style={{padding: 20}}>
                {children}
            </div>
        </div>
    )
}
