import { Affix, Button, Col, Popover, Row } from "antd"
import { memo } from "react"
import { NotificationIcon, SearchIcon } from "../Icon"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"
import { useSelector } from "react-redux"

export function HeaderClient({
    page
}) {
    const navigate = useNavigate()

    const { infoUser } = useSelector(state => state?.app)
    console.log("user", infoUser)

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
                                            style={{
                                                color: page == 'home' ? "var(--color-blue)" : "var(--color-black)"
                                            }}
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
                                            style={{
                                                color: page == 'campaign-all' ? "var(--color-blue)" : "var(--color-black)"
                                            }}
                                        >
                                            Cuộc vận động
                                        </span>
                                    </Link>
                                </Col>
                                <Col
                                    className="home-item-header flex-col-center"
                                >
                                    <Link to="/charity-all">
                                        <span
                                            style={{
                                                color: page == 'charity-all' ? "var(--color-blue)" : "var(--color-black)"
                                            }}
                                        >
                                            Tổ chức từ thiện
                                        </span>
                                    </Link>
                                </Col>
                                <Col
                                    className="home-item-header flex-col-center"
                                >
                                    <Link to='/contact-us'>
                                        <span
                                            style={{
                                                color: page == 'contact-us' ? "var(--color-blue)" : "var(--color-black)"
                                            }}
                                        >
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
                                {
                                    infoUser && infoUser.roleId == 2 ? (
                                        <Col
                                            className="flex-col-center"
                                        >
                                            <Row>
                                                <span style={{ marginLeft: 15 }} className='flex-col-center'>
                                                    <Popover
                                                        placement="bottomRight"
                                                        content={
                                                            <div style={{ maxWidth: '360px' }}>
                                                                {/* <Row
                                                                    style={{ padding: '16px 16px 8px', borderBottom: '1px solid var(--color-border)' }}
                                                                >
                                                                    <span className='flex-col' style={{ fontWeight: '600', fontSize: 16 }}>
                                                                        Thông báo
                                                                    </span>
                                                                </Row>
                                                                <div
                                                                    style={{
                                                                        maxHeight: '80vh',
                                                                        overflow: 'auto'
                                                                    }}
                                                                >
                                                                    {
                                                                        [1,2,3]?.map((item, index) => (
                                                                            <Row
                                                                                className="app-hover"
                                                                                key={index}
                                                                                style={{ flexWrap: 'nowrap', margin: '0 15px', padding: '10px 10px 10px 0', borderBottom: '1px solid var(--color-border)', position: 'relative' }}
                                                                            >
                                                                                <img src={item.image} alt={item.image}
                                                                                    style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }}
                                                                                />
                                                                                <div>
                                                                                    <div style={{ lineHeight: '21px', marginBottom: 8 }}>{item.description}</div>
                                                                                    <div style={{ fontSize: 12, color: 'var(--color-gray)' }}>{item.timeCreated}</div>
                                                                                </div>
                                                                                {
                                                                                    item.newNotice ? (
                                                                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: "var(--color-blue)", position: 'absolute', top: 10, right: 0 }}></span>
                                                                                    ) : ''
                                                                                }
                                                                            </Row>
                                                                        ))
                                                                    }
                                                                </div> */}
                                                            </div>
                                                        }
                                                        trigger="click"
                                                        open={true}
                                                        onOpenChange={() => {}}
                                                    >
                                                        <span style={{ cursor: 'pointer', padding: 5, borderRadius: "50%", background: 'transparent' }}>
                                                            <NotificationIcon fontSize={25} color="#96A2BA" />
                                                        </span>
                                                    </Popover>
                                                </span>
                                                <span style={{fontWeight: '600', margin: '0 30px 0 15px', cursor: 'pointer'}}
                                                    onClick={() => {
                                                        // navigate("/my-account")
                                                        window.location.replace("/my-account")
                                                    }}
                                                    className="flex-col-center"
                                                >
                                                    Tài khoản
                                                </span>
                                            </Row>
                                        </Col>
                                    ) : (
                                        <>
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
                                        </>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Affix>
    )
}
