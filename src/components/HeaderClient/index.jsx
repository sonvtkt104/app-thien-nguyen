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
                justify='center'
                
                style={{
                    height: 90,
                    background: '#fff',
                    boxShadow:"4px 3px 19px 0 rgba(0,0,0,.14)"
                }}
            >
                <Col xs={21} sm={21} md={21} lg={21} xl={21}>
                    <Row
                        style={{height: "100%"}}
                    >
                        <Col xs={18} sm={18} md={18} lg={18} xl={18}
                            className='flex-col-center'
                        >
                            <Row justify={'left'}>
                                <Row style={{fontSize: 18, fontWeight: 600, lineHeight: '50px', cursor: 'pointer'}}
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                >
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
                                            Toàn bộ các cuộc vận động
                                        </span>
                                    </Link>
                                </Col>
                                <Col
                                    className="home-item-header flex-col-center"
                                >
                                    <Link to="/charity-all">
                                        <span
                                        >
                                            Toàn bộ các tổ chức từ thiện
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
                            <Row justify={'end'}>
                                <Col className="flex-col-center">
                                    <span style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            navigate("/campaign-all")
                                        }}
                                    >
                                        <SearchIcon fontSize={26} />
                                    </span>
                                </Col>
                                <Col
                                    className="flex-col-center"
                                >
                                    <span style={{fontWeight: '600', margin: '0 30px', cursor: 'pointer'}}
                                        onClick={() => {
                                            navigate("/login")
                                        }}
                                    >
                                        Đăng nhập
                                    </span>
                                </Col>
                                <Button type='primary'
                                    className="btn-app app-hover"
                                    style={{
                                        fontWeight: '600',
                                    }}
                                    onClick={() => {
                                        navigate("/sign-up")
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Affix>
    )
}
