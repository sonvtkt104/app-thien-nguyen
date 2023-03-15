import { ExceptionOutlined, HomeOutlined, OrderedListOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
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
        },
        {
            key: 3,
            title: 'Cuộc vận động',
            link: '/campaign-list',
            icon: (<OrderedListOutlined />)
        }
    ]

    return (
        <div className="page-layout-app">
            <div className="page-layout-sidebar">
                <div>Logo</div>
                {
                    menus.map((item, index) => {
                        return (
                            <Link to={item.link} className="p-l-s-container" key={index}>
                                <div className="p-l-s-icon">{item.icon}</div>
                                <div>{item.title}</div>
                            </Link>
                        )
                    })
                }
            </div>
            <Header />
            <div style={{padding: 20}}>
                {children}
            </div>
        </div>
    )
}
