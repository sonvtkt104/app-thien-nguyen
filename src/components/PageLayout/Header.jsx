import { BellOutlined } from "@ant-design/icons"
import { Col, Popover, Row, Modal } from "antd"
import { memo, useMemo, useState } from "react"
import { NotificationIcon, SettingIcon } from "../Icon"
import { Link, useNavigate } from "react-router-dom"
import { logOutApp } from "../../pages/client/MyAccount/MyAccountService"

function Header({

}) {

    const navigate = useNavigate()

    const [openNotice, setOpenNotice] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const handleLogOut = () => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn Đăng xuất?`,
            okText: "Có",
            cancelText: "Quay lại",
            okType: "danger",
            onOk: () => {
                logOutApp().then(res => {
                    if(res?.status === 200) {
                        navigate('/')
                    }
                })
            }
        });
    }

    const arrNotice = useMemo(() => {
        return [
            {
                id: 1,
                image: "https://yt3.ggpht.com/gxc1jOYPN-TOex8HbAmzSXrMu35AEUmqVbfnYy4nn1RkFR-zR5kyesPXDUjdvWwrc59R7vds0g=s88-c-k-c0x00ffffff-no-rj",
                newNotice: true,
                description: 'Recommended: Còn ai nghe “Đôi Bờ” chứ ạ? #doibo #trucnhan #xhtdrlx2 #xhtđrlx2 #foreststudio',
                timeCreated: "11 hours ago",
            },
            {
                id: 2,
                image: "https://yt3.ggpht.com/gxc1jOYPN-TOex8HbAmzSXrMu35AEUmqVbfnYy4nn1RkFR-zR5kyesPXDUjdvWwrc59R7vds0g=s88-c-k-c0x00ffffff-no-rj",
                newNotice: false,
                description: "Daniel Truong Dev uploaded: Lần đầu trải nghiệm Competitive Programming - Advent of Code 2022 ( Day 3 )",
                timeCreated: "16 hours ago",
            },
        ]
    }, [])

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
                        placement="bottomRight"
                        content={
                            <div style={{ maxWidth: '360px' }}>
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
                                        arrNotice?.map((item, index) => (
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
                                </div>
                            </div>
                        }
                        trigger="click"
                        open={openNotice}
                        onOpenChange={() => setOpenNotice(!openNotice)}
                    >
                        <span className="icon-app-header" style={{ cursor: 'pointer', padding: 5, borderRadius: "50%", background: 'transparent' }}>
                            <NotificationIcon fontSize={25} />
                        </span>
                    </Popover>
                </span>
                <span>
                    <Popover
                        placement="bottomRight"
                        content={
                            <div style={{ width: 250 }}>
                                <Row style={{ padding: '16px 16px 8px', borderBottom: '1px solid var(--color-border)', flexWrap: 'nowrap' }}>
                                    <img src="/images/logo.png" alt="logo"
                                        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }}
                                    />
                                    <Col
                                        className="flex-col-center"
                                        style={{ fontSize: 18, fontWeight: '500' }}
                                    >
                                        Mùa đông ấm áp
                                    </Col>
                                </Row>
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
                                        onClick={handleLogOut}
                                    >
                                        <span style={{marginRight: 16}}><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{width: 24, height: 24}}><g className="style-scope yt-icon"><path d="M20,3v18H8v-1h11V4H8V3H20z M11.1,15.1l0.7,0.7l4.4-4.4l-4.4-4.4l-0.7,0.7l3.1,3.1H3v1h11.3L11.1,15.1z" className="style-scope yt-icon"></path></g></svg></span>
                                        Đăng xuất
                                    </Row>
                                </div>
                            </div>
                        }
                        trigger="click"
                        open={openProfile}
                        onOpenChange={() => setOpenProfile(!openProfile)}
                    >
                        <img src="/images/logo.png" alt="logo-user"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }}
                        />
                    </Popover>
                </span>
            </Row>
        </div>
    )
}

export default memo(Header)