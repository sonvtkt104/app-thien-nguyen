import { BellOutlined } from "@ant-design/icons"
import { Col, Popover, Row, Modal } from "antd"
import { memo, useEffect, useMemo, useState } from "react"
import { NotificationIcon, SettingIcon } from "../Icon"
import { Link, useNavigate } from "react-router-dom"
import { logOutApp } from "../../pages/client/MyAccount/MyAccountService"
import { handleLogout } from "../../pages/Authentication/HandleUserInfomation"
import { userGetReplyAdmin } from "../../api/feedbacks"
import { userGetNotification } from "../../api/notifications"
import { useSelector } from "react-redux"
import moment from "moment"
import ModalNotification from "../ModalNotification"

function Header({

}) {

    const navigate = useNavigate()
    const { infoUser} = useSelector(state => state?.app)

    const [openNotice, setOpenNotice] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const [listReplyAdmins, setListReplyAdmins] = useState([])
    const [listMessageUsers, setListMessageUsers] = useState([])
    const [listNotifications, setListNotifications] = useState([])

    const [dataNotification, setDataNotification] = useState({})
    const [open, setOpen] = useState(false)

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


    useEffect(() => {
        if(openNotice || openProfile) {
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = 'auto'
        }

        return () => {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [openNotice, openProfile])
    

    return (
        <div className="page-layout-header flex-col-center">
            <Row justify='end'
                style={{ paddingRight: 30 }}
            >
                <Col className="flex-col-center" style={{marginRight: 20}}>
                        <span className="icon-app-header" style={{ cursor: 'pointer', padding: '5px 5px 4px 5px', borderRadius: "50%", background: 'transparent' }}
                            onClick={() => {
                                navigate("/settings")
                            }}
                        >
                            <SettingIcon color='var(--color-black)' fontSize='25'/>
                        </span>
                </Col>
                
                <span style={{ marginRight: 20 }} className='flex-col-center'>
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
                        <span className="icon-app-header" style={{ cursor: 'pointer', padding: 5, borderRadius: "50%", background: 'transparent', position: 'relative' }}>
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
                            <NotificationIcon fontSize={25} />
                        </span>
                    </Popover>
                </span>
                <span className="flex-col-center">
                    <Popover
                        placement="bottomRight"
                        content={
                            <div style={{ width: 250 }}>
                                {/* <Row style={{ padding: '16px 16px 8px', borderBottom: '1px solid var(--color-border)', flexWrap: 'nowrap' }}>
                                    <img src="/images/logo.png" alt="logo"
                                        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }}
                                    />
                                    <Col
                                        className="flex-col-center"
                                        style={{ fontSize: 18, fontWeight: '500' }}
                                    >
                                        Mùa đông ấm áp
                                    </Col>
                                </Row> */}
                                <div style={{padding: '8px 0'}}>
                                    {/* <Row className="app-hover-background" style={{ padding: '8px 16px', lineHeight: '24px'}}>
                                        <span style={{marginRight: 16}}><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{width: 24, height: 24}}><g className="style-scope yt-icon"><path d="M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z" className="style-scope yt-icon"></path></g></svg></span>
                                        Thông tin tài khoản
                                    </Row>
                                    <Row className="app-hover-background" style={{ padding: '8px 16px', lineHeight: '24px'}}>
                                        <span style={{marginRight: 16}}><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{width: 24, height: 24}}><g className="style-scope yt-icon"><path d="M12 20.95Q8.975 20.075 6.987 17.312Q5 14.55 5 11.1V5.7L12 3.075L19 5.7V11.35Q18.775 11.275 18.5 11.2Q18.225 11.125 18 11.075V6.375L12 4.15L6 6.375V11.1Q6 12.575 6.438 13.938Q6.875 15.3 7.625 16.438Q8.375 17.575 9.413 18.425Q10.45 19.275 11.625 19.725L11.675 19.7Q11.8 20 11.975 20.288Q12.15 20.575 12.375 20.825Q12.275 20.85 12.188 20.888Q12.1 20.925 12 20.95ZM17 17Q17.625 17 18.062 16.562Q18.5 16.125 18.5 15.5Q18.5 14.875 18.062 14.438Q17.625 14 17 14Q16.375 14 15.938 14.438Q15.5 14.875 15.5 15.5Q15.5 16.125 15.938 16.562Q16.375 17 17 17ZM17 20Q17.8 20 18.438 19.65Q19.075 19.3 19.5 18.7Q18.925 18.35 18.3 18.175Q17.675 18 17 18Q16.325 18 15.7 18.175Q15.075 18.35 14.5 18.7Q14.925 19.3 15.562 19.65Q16.2 20 17 20ZM17 21Q15.325 21 14.163 19.837Q13 18.675 13 17Q13 15.325 14.163 14.162Q15.325 13 17 13Q18.675 13 19.837 14.162Q21 15.325 21 17Q21 18.675 19.837 19.837Q18.675 21 17 21ZM12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Q12 11.95 12 11.95Z" className="style-scope yt-icon"></path></g></svg></span>
                                        Thay đổi mật khẩu
                                    </Row> */}
                                    <Row className="app-hover-background" style={{ padding: '8px 16px', lineHeight: '24px'}} 
                                    >
                                        <Col span={24} className="flex-col-center" style={{cursor: 'pointer'}}
                                            onClick={handleLogOutApp}
                                        >
                                            <Row >
                                                <span className="flex-col-center" style={{marginRight: 16}}><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{width: 24, height: 24}}><g className="style-scope yt-icon"><path d="M20,3v18H8v-1h11V4H8V3H20z M11.1,15.1l0.7,0.7l4.4-4.4l-4.4-4.4l-0.7,0.7l3.1,3.1H3v1h11.3L11.1,15.1z" className="style-scope yt-icon"></path></g></svg></span>
                                                Đăng xuất
                                            </Row>
                                        </Col>
                                    </Row>
                                    
                                </div>
                            </div>
                        }
                        trigger="click"
                        open={openProfile}
                        onOpenChange={() => setOpenProfile(!openProfile)}
                    >
                        <span
                            className="flex-col-center"
                            style={{cursor: 'pointer', fontWeight :'600'}}
                        >
                            Tài khoản
                        </span>
                    </Popover>
                </span>
            </Row>
            <ModalNotification 
                open={open}
                setOpen={setOpen}
                data={dataNotification}
            />
        </div>
    )
}

export default memo(Header)