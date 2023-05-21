import { Affix, Button, Col, Popover, Row } from "antd"
import { memo, useEffect, useState } from "react"
import { NotificationIcon, SearchIcon } from "../Icon"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"
import { useSelector } from "react-redux"
import { userGetReplyAdmin } from "../../api/feedbacks"
import { userGetNotification } from "../../api/notifications"
import moment from "moment"
import ModalNotification from "../ModalNotification"

export function HeaderClient({
    page
}) {
    const navigate = useNavigate()

    const { infoUser } = useSelector(state => state?.app)
    console.log("user", infoUser)

    const [listReplyAdmins, setListReplyAdmins] = useState([])
    const [listMessageUsers, setListMessageUsers] = useState([])
    const [listNotifications, setListNotifications] = useState([])

    const [dataNotification, setDataNotification] = useState({})
    const [open, setOpen] = useState(false)
    const [openNotice, setOpenNotice] = useState(false)

    useEffect(() => {
        if(openNotice) {
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = 'auto'
        }

        return () => {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [openNotice])

    useEffect(() => {
        userGetReplyAdmin().then(res => {
            console.log('user get reply admin', res.data)
            if(res.data) {
                setListReplyAdmins(res.data)
            }
        })

        userGetNotification().then(res => {
            console.log('user get notification ', res.data)
            if(res.data) {
                setListMessageUsers(res.data)
            }
        })
    }, [])

    useEffect(() => {
        let arr = []
        if(listReplyAdmins && listReplyAdmins?.length > 0) {
            listReplyAdmins?.forEach(item => {
                if(item?.reply) {
                    let obj = {}
                    obj.image = 'https://cdn-icons-png.flaticon.com/512/1253/1253685.png'
                    obj.newNotice = true
                    obj.title = 'Thông báo phản hồi từ hệ thống'
                    obj.message = item?.message
                    obj.reply = item?.reply
                    obj.date = item?.timeReply
                    obj.type = 'admin'

                    arr.push(obj)
                }
            })
        }

        if(listMessageUsers && listMessageUsers?.length > 0) {
            listMessageUsers?.forEach(item => {
                let obj = {}
                obj.image = "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"
                obj.newNotice = true
                obj.title = `${item?.createdUser?.roleId == 2 ? "Người dùng" : item?.createdUser?.roleId == 3 ? "Tổ chức" : ''} ${item?.createdUser?.name}`
                obj.message = item?.message
                obj.reply = item?.message
                obj.date = item?.timeCreate
                obj.type = 'user'

                arr.push(obj)
            })
        }

        setListNotifications(arr)
    } , [listReplyAdmins, listMessageUsers])

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
                                                        placement="topRight"
                                                        content={
                                                            <div style={{ width: '360px' }}>
                                                                <Row
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
                                                                        listNotifications?.sort((a, b) => {
                                                                            let timeA = a.date ? new Date(a.date).getTime() : 0
                                                                            let timeB = b.date ? new Date(b.date).getTime() : 0
                                                                            if(timeA > timeB) { return 1}
                                                                            else if (timeA < timeB) { return -1}
                                                                            else return 0
                                                                        })?.map((item, index) => (
                                                                            <Row
                                                                                className="app-hover"
                                                                                key={index}
                                                                                style={{ flexWrap: 'nowrap', margin: '0 15px', padding: '10px 10px 10px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    setDataNotification(JSON.parse(JSON.stringify(item)))
                                                                                    setOpen(true)
                                                                                    setOpenNotice(false)
                                                                                }}
                                                                            >
                                                                                <img src={item.image} alt={item.image}
                                                                                    style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }}
                                                                                />
                                                                                <div>
                                                                                    <div style={{ lineHeight: '21px', marginBottom: 8, fontWeight: 600 }}>{item.title}</div>
                                                                                    <div style={{ lineHeight: '21px', marginBottom: 8 }}>{item.reply}</div>
                                                                                    <div style={{ fontSize: 12, color: 'var(--color-gray)' }}>{moment(item.date).format('DD-MM-YYYY')}</div>
                                                                                </div>
                                                                                {
                                                                                    item.newNotice ? (
                                                                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: "var(--color-blue)", position: 'absolute', top: 10, right: 0 }}></span>
                                                                                    ) : ''
                                                                                }
                                                                            </Row>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        trigger="click"
                                                        open={openNotice}
                                                        onOpenChange={() => {
                                                            setOpenNotice(!openNotice)
                                                        }}
                                                    >
                                                        <span style={{ cursor: 'pointer', padding: 5, borderRadius: "50%", background: 'transparent', position: 'relative' }}>
                                                            {
                                                                listNotifications && listNotifications.length > 0 ? (
                                                                    <span style={{
                                                                        position: 'absolute',
                                                                        width: "6px",
                                                                        height: "6px",
                                                                        borderRadius: "50%",
                                                                        background: "var(--color-red)",
                                                                        right: 7}}></span>
                                                                ) : ""
                                                            }
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
                <ModalNotification
                    open={open}
                    setOpen={setOpen}
                    data={dataNotification}
                />
            </Row>
        </Affix>
    )
}
