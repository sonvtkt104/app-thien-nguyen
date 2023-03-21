import { Affix, Button, Col, Row } from "antd"
import { memo } from "react"
import { SearchIcon } from "../Icon"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"

export function HeaderClient({
    page=1
}) {
    const navigate = useNavigate()

    return (
        <Affix offsetTop={0}>
            <Row
                justify='space-between'
                
                style={{
                    height: 90,
                    background: '#fff',
                    boxShadow:"4px 3px 19px 0 rgba(0,0,0,.14)"
                }}
            >
                <Col xs={18} sm={18} md={18} lg={18} xl={18}
                    className='flex-col-center'
                >
                    <Row justify='center'>
                        <Row style={{fontSize: 18, fontWeight: 600, lineHeight: '50px', cursor: 'pointer'}}>
                            <img src="/images/logo-app.png" alt="logo app"
                                style={{width: 50, marginRight: 4}}
                            />
                            Thiện Nguyện
                        </Row>
                        <Col
                            className="home-item-header flex-col-center"
                        >
                            <Link to="/">
                                <span
                                >
                                    Trang chủ
                                </span>
                            </Link>
                        </Col>
                        <Col
                            className="home-item-header flex-col-center"
                        >
                            <Link to="/campaign-all">
                                <span
                                >
                                    Toàn bộ các dự án
                                </span>
                            </Link>
                        </Col>
                        <Col
                            className="home-item-header flex-col-center"
                        >
                            <Link to='/contact-us'>
                                <span>
                                    Liên hệ
                                </span>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}
                    className='flex-col-center'
                >
                    <Row>
                        <Col className="flex-col-center">
                            <span style={{cursor: 'pointer'}}>
                                <SearchIcon fontSize={26} />
                            </span>
                        </Col>
                        <Col
                            className="flex-col-center"
                        >
                            <span style={{fontWeight: '600', margin: '0 30px', cursor: 'pointer'}}>
                                Đăng nhập
                            </span>
                        </Col>
                        <Button type='primary'
                            className="btn-app app-hover"
                            style={{
                                fontWeight: '600',
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Affix>
    )
}