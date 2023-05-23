import { CloseOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, NotificationOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { FooterClient, HeaderClient, ItemCampaign, SearchIcon, TickIcon } from "../../../components";
import "./css/index.css"
import { getInfoCharity, setFollowCharity } from "../../../api/charities";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllProvinces, getCampaignByCharityId, getCampaignFollow } from "../../../api/campaigns";
import ReactPlayer from 'react-player'

export default function ProfileCharity() {
    const navigate = useNavigate()
    const { infoUser, userType } = useSelector(state => state?.app)
    const { charityId } = useParams()

    const [tab, setTab] = useState(0)
    const [previewImage, setPreviewImage] = useState(false)
    const [infoCharity, setInfoCharity] = useState({})
    const [listCampaign, setListCampaign] = useState([])
    const [listCampaignOrigin, setListCampaignOrigin] = useState([])
    const [listProvinces, setListProvinces] = useState({})
    const [listCampaignFollow, setListCampaignFollow] = useState([])
    const [search, setSearch] = useState("")
    const [imagePreview, setImagePreview] = useState("")

    const handleSearch = () => {
        if(search) {
            let result = listCampaignOrigin?.filter(campaign => {
                return campaign?.campaignName?.toLowerCase()?.includes(search?.toLowerCase())
            })
            setListCampaign(JSON.parse(JSON.stringify(result)))
        } else {
            setListCampaign(JSON.parse(JSON.stringify(listCampaignOrigin)))
        }
    }

    console.log('charityId', charityId)

    useEffect(() => {
        getInfoCharity(charityId).then(res => {
            setInfoCharity(JSON.parse(JSON.stringify(res?.data?.data)))
        })

        getCampaignFollow().then(res => {
            console.log('campaign follow', res.data)
            let arr = []
            res.data?.forEach(item => {
                arr.push(item.id)
            })
            console.log('arrr list campaign follow', arr)
            setListCampaignFollow(arr)
        })

        getAllProvinces().then(res => {
            console.log('getAllProvinces', res.data)
            let obj = {}
            res?.data?.forEach(item => {
                obj[item?.codeName] =  item?.name
            })
            setListProvinces(JSON.parse(JSON.stringify(obj)))
        })

        getCampaignByCharityId(charityId).then(res => {
            let arr = [];
            res?.data?.forEach(item => {
                console.log(item)
                let obj = {
                    campaignId: item.id,
                    campaignName: item.campaignName,
                    campaignImage: item.campaignImage,  // ???
                    campaignTargetAmount: Number(item.targetAmount),
                    campaignReceiveAmount: Number(item.receiveAmount),
                    campaignRegion: item.region,
                    campaignStatus: item.status,
                    campaignStartDate: item.startDate,
                    campaignStopDate: item.stopDate,
                    campaignTargeObject: item.targetObject,
                    charityId: item?.organization.id,
                    charityName: item?.organization.charityName,
                    charityAvatar: item?.organization.avatar,
                    charityIsVerified: item?.organization.isVerified
                }
                arr.push(obj)
            })
            console.log(arr)
            console.log('list campaign by charity', arr)
            setListCampaign(arr)
            setListCampaignOrigin(arr)
        })
    }, [])

    /**
     * infoCharity = { 
     *  id,
     *  avatar,
     *  charityAccountNumber,
     * charityBank,
     * charityBanner,
     * charityDescription,
     * charityFacebook,
     * charityFile,
     * charityImages,
     * charityInstagram,
     * charityIntroVideo,
     * charityLinkedIn,
     * charityMotto,
     * charityName,
     * charityTarget,
     * charityTwitter,
     * charityWebsite,
     * googleMap,
     * isFollow,
     * isVerified
     * }
     */

    console.log("infoCharity", infoCharity)

    return (
        <div>
            <HeaderClient />
            <Row justify='center'
                style={{
                    background: 'var(--color-background)',
                    minHeight: 'calc(100vh - 90px)'
                }}
            >
                <Col xs={20} sm={20} md={20} lg={20} xl={20}
                    style={{ paddingBottom: 70 }}
                >
                    <div
                        style={{ background: '#FFFF', borderRadius: '0 0 6px 6px', boxShadow: '-1px 1px 6px rgba(0,0,0,.05)' }}
                    >
                        <div
                            style={
                                infoCharity?.charityBanner ? {
                                    backgroundImage: `url(${infoCharity?.charityBanner})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: 250
                                } : {
                                    height: 250,
                                    background: 'rgb(240, 240, 240)'
                                }
                            }
                        >
                        </div>
                        <Row
                            style={{ padding: '30px 24px 30px 154px', position: 'relative' }}
                            justify='space-between'
                        >
                            <img src={infoCharity?.avatar || "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"} alt="logo"
                                style={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    left: 24,
                                    bottom: 30,
                                    background: '#ffffff'
                                }}
                            />
                            <Col
                                className="flex-col-center"
                                style={{ marginLeft: 30 }}
                            >
                                <Row style={{ fontSize: 24, fontWeight: '600', marginBottom: 7 }}>
                                    {infoCharity?.charityName}
                                    {
                                        infoCharity?.isVerified == 2? (
                                            <span className="flex-col-center" style={{marginLeft: 10}}>
                                                <TickIcon />
                                            </span>
                                        ) : ""
                                    }
                                </Row>
                                <Row>
                                    {
                                        infoCharity?.charityWebsite ? (
                                            <span style={{ marginRight: 50 }}>
                                                <GlobalOutlined style={{ color: 'var(--color-gray)' }} />
                                                <span style={{ marginLeft: 5, color: 'var(--color-gray)' }}>{infoCharity?.charityWebsite}</span>
                                            </span>
                                        ) : ""
                                    }
                                    <span>
                                        <NotificationOutlined style={{ fontWeight: '600' }} />
                                        <span style={{ marginLeft: 5, fontWeight: '600' }}>Cuộc vận động: {listCampaignOrigin?.length}</span>
                                    </span>
                                </Row>
                            </Col>
                            <Col
                                className="flex-col-center"
                            >

                                <Button className={infoCharity?.isFollow ? "btn-primary charity-un-follow-profile" : "btn-primary"}
                                    onClick={() => {
                                        if (userType == 'normal_user') { // follow or un follow
                                            if (infoCharity?.isFollow) { // un follow
                                                setFollowCharity(infoUser.id, charityId, false).then(res => {
                                                    console.log("---un follow-------", res.data)
                                                    if (res?.data?.data) {

                                                        setInfoCharity(
                                                            {
                                                                ...infoCharity,
                                                                isFollow: 0
                                                            }
                                                        )
                                                    }
                                                })
                                            } else { // follow
                                                setFollowCharity(infoUser.id, charityId, true).then(res => {
                                                    console.log("-----follow-----", res.data)
                                                    if (res?.data?.data) {

                                                        setInfoCharity(
                                                            {
                                                                ...infoCharity,
                                                                isFollow: 1
                                                            }
                                                        )
                                                    }
                                                })
                                            }
                                        } else { // login
                                            navigate("/login")
                                        }
                                    }}
                                >
                                    {infoCharity?.isFollow ? "Hủy theo dõi" : "Theo dõi"}
                                </Button>

                            </Col>
                        </Row>
                        <Row style={{ borderTop: '1px solid var(--color-border)' }}>
                            <Col style={{ padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff' }}
                                className={tab == 0 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(0)}
                            >
                                Trang chủ
                            </Col>
                            <Col style={{ padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff' }}
                                className={tab == 1 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(1)}
                            >
                                Cuộc vận động
                            </Col>
                            <Col style={{ padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff' }}
                                className={tab == 2 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(2)}
                            >
                                Hình ảnh
                            </Col>
                        </Row>
                    </div>
                    {
                        tab == 0 ? (
                            <div style={{ marginTop: 20 }}>
                                <Row>
                                    <Col xs={15} sm={15} md={15} lg={15} xl={15}
                                        style={{ paddingRight: 30 }}
                                    >
                                        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: 20 }}>
                                            {
                                                infoCharity?.charityDescription ? (
                                                    <div style={{ marginBottom: 20 }}>
                                                        <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                                            Giới thiệu tổ chức
                                                        </Row>
                                                        <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                                            {infoCharity?.charityDescription}
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                            {
                                                infoCharity?.charityMotto ? (
                                                    <div style={{ marginBottom: 20 }}>
                                                        <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                                            Phương châm
                                                        </Row>
                                                        <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                                            {infoCharity?.charityMotto}
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                            {
                                                infoCharity?.charityTarget ? (
                                                    <div style={{ marginBottom: 20 }}>
                                                        <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                                            Mục tiêu
                                                        </Row>
                                                        <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                                            {infoCharity?.charityTarget}
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                        </div>
                                        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: '24px 30px', marginTop: 20 }}>
                                            {
                                                infoCharity?.charityIntroVideo ? (
                                                    <div style={{ marginBottom: 50 }}>
                                                        <div style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                                                            Video Giới thiệu
                                                        </div>
                                                        <div>
                                                            <ReactPlayer url={infoCharity?.charityIntroVideo} 
                                                                style={{width: '100%'}}
                                                                width='100%'
                                                            />
                                                            {/* <iframe width="100%" height="400" src={infoCharity?.charityIntroVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                            {
                                                infoCharity?.charityImages ? (
                                                    <div>
                                                        <Row justify='space-between'
                                                            style={{ marginBottom: 12 }}
                                                        >
                                                            <span style={{ fontSize: 18, fontWeight: '600' }}>
                                                                Hình ảnh của tổ chức
                                                            </span>
                                                            <span className="text-hover" style={{ fontSize: 16, fontWeight: '600', color: 'var(--color-blue)', cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setTab(2)
                                                                }}
                                                            >
                                                                Tất cả hình ảnh
                                                            </span>
                                                        </Row>
                                                        <Row>
                                                            {
                                                                infoCharity?.charityImages?.split(',')?.map((item, i) => {
                                                                    if( i == 0 || i == 1 || i == 2 ) {
                                                                        return (
                                                                            <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                                                                style={{ padding: '10px', }}
                                                                                key={i}
                                                                            >
                                                                                <img src={item} alt="charity_image"
                                                                                    style={{ width: "100%", objectFit: 'cover', maxHeight: 140 }}
                                                                                />
                                                                            </Col>
                                                                        )
                                                                    } else return ''
                                                                })
                                                            }
                                                        </Row>
                                                    </div>
                                                ) : ""
                                            }
                                        </div>
                                    </Col>
                                    <Col xs={9} sm={9} md={9} lg={9} xl={9} >
                                        <div
                                            style={{ background: '#fff', boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: 20 }}
                                        >
                                            <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                                Liên hệ
                                            </Row>
                                            <Row style={{ padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
                                                <img src={infoCharity?.avatar || "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"} alt="logo"
                                                    style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 24 }}
                                                />
                                                <span style={{ fontSize: 16, fontWeight: '500' }}
                                                    className='flex-col-center'
                                                >
                                                    <Row>
                                                        {infoCharity?.charityName}
                                                        {
                                                            infoCharity?.isVerified == 2 ? (
                                                                <span className="flex-col-center" style={{marginLeft: 10}}>
                                                                    <TickIcon />
                                                                </span>
                                                            ) : ""
                                                        }
                                                    </Row>
                                                </span>
                                            </Row>
                                            <div style={{ padding: '16px 0' }}>
                                                {
                                                    infoCharity?.phoneNumber ? (
                                                        <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px' }}>
                                                            <PhoneOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                                            {infoCharity?.phoneNumber}
                                                        </Row>
                                                    ) : ""
                                                }
                                                {
                                                    infoCharity?.charityWebsite ? (
                                                        <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px' }}>
                                                            <GlobalOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                                            {infoCharity?.charityWebsite}
                                                        </Row>
                                                    ) : ""
                                                }
                                                {
                                                    infoCharity?.email ? (
                                                        <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px' }}>
                                                            <MailOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                                            {infoCharity?.email}
                                                        </Row>
                                                    ) : ""
                                                }
                                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', flexWrap: 'nowrap' }}>
                                                    <EnvironmentOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                                    Trường ĐH Công nghệ - Đại học quốc gia Hà Nội, 144 Xuân Thủy, Cầu Giấy, Hà Nội
                                                </Row>
                                                {
                                                    infoCharity?.googleMap ? (
                                                        <div style={{ marginBottom: 20 }}>
                                                            <div style={{ fontSize: 16, fontWeight: '600', marginBottom: 20 }}>Địa chỉ trụ sở chính</div>
                                                            <div>
                                                                <iframe title="Google map" src={infoCharity?.googleMap} style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                                            </div>
                                                        </div>
                                                    ) : ""
                                                }
                                                {
                                                    (infoCharity?.charityFacebook || infoCharity?.charityInstagram || infoCharity?.charityTwitter || infoCharity?.charityLinkedIn) ? (
                                                        <div>
                                                            <div style={{ fontSize: 16, fontWeight: '600', marginBottom: 20 }}>Liên hệ qua mạng xã hội</div>
                                                            <Row>
                                                                {
                                                                    infoCharity?.charityFacebook ? (
                                                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                                                            <img src="/images/facebook.png" alt="logo facebook"
                                                                                style={{ width: 33, marginBottom: 8, cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityFacebook, '_blank')
                                                                                }}
                                                                            />
                                                                            <div style={{ color: "var(--color-blue)", lineHeight: '18px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityFacebook, '_blank')
                                                                                }}
                                                                            >
                                                                                Facebook
                                                                            </div>
                                                                        </div>
                                                                    ) : ""
                                                                }
                                                                {
                                                                    infoCharity?.charityInstagram ? (
                                                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                                                            <img src="/images/instagram.png" alt="logo instagram"
                                                                                style={{ width: 33, marginBottom: 8, cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityInstagram, '_blank')
                                                                                }}
                                                                            />
                                                                            <div style={{ color: "var(--color-blue)", lineHeight: '18px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityInstagram, '_blank')
                                                                                }}
                                                                            >
                                                                                Instagram
                                                                            </div>
                                                                        </div>
                                                                    ) : ""
                                                                }
                                                                {
                                                                    infoCharity?.charityTwitter ? (
                                                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                                                            <img src="/images/twitter.png" alt="logo Twitter"
                                                                                style={{ width: 33, marginBottom: 8, cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityTwitter, '_blank')
                                                                                }}
                                                                            />
                                                                            <div style={{ color: "var(--color-blue)", lineHeight: '18px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityTwitter, '_blank')
                                                                                }}
                                                                            >
                                                                                Twitter
                                                                            </div>
                                                                        </div>
                                                                    ) : ""
                                                                }
                                                                {
                                                                    infoCharity?.charityLinkedIn ? (
                                                                        <div style={{ padding: '0 10px', textAlign: 'center' }}>
                                                                            <img src="/images/linkedin.png" alt="logo LinkedIn"
                                                                                style={{ width: 33, marginBottom: 8, cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityLinkedIn, '_blank')
                                                                                }}
                                                                            />
                                                                            <div style={{ color: "var(--color-blue)", lineHeight: '18px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(infoCharity?.charityLinkedIn, '_blank')
                                                                                }}
                                                                            >
                                                                                LinkedIn
                                                                            </div>
                                                                        </div>
                                                                    ) : ""
                                                                }
                                                            </Row>
                                                        </div>
                                                    ) : ""
                                                }
                                            </div>
                                        </div>
                                        {
                                            listCampaignOrigin?.length > 0 ? (
                                                <div
                                                    style={{ background: '#fff', boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: 20, marginTop: '20px' }}
                                                >
                                                    <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 20 }}>
                                                        Cuộc vận động nổi bật
                                                    </Row>
                                                    <div>
                                                        <ItemCampaign
                                                            style={{ marginBottom: 0 }}
                                                            data={listCampaignOrigin[0]}
                                                            listProvinces={listProvinces}
                                                            hideFollow={true}
                                                        />
                                                    </div>
                                                </div>
                                            ) : ""
                                        }
                                    </Col>
                                </Row>
                            </div>
                        ) : tab == 1 ? (
                            <div style={{ marginTop: 20, background: '#ffffff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: '30px 50px' }}>
                                <Row justify='space-between'
                                    style={{ marginBottom: 30 }}
                                >
                                    <Col style={{ lineHeight: '30px' }}>
                                        <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
                                            Danh sách cuộc vận động
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Form
                                            name="basic"
                                            onFinish={() => {
                                                console.log("finish")
                                                handleSearch()
                                            }}
                                        >
                                            <Row style={{ flexWrap: 'nowrap' }}>
                                                <Input className="input-app"
                                                    style={{ maxHeight: 40, borderRadius: "4px 0 0 4px", minWidth: 300 }}
                                                    value={search}
                                                    onChange={(e) => { setSearch(e.target.value) }}
                                                />
                                                <Button className="btn-primary"
                                                    onClick={() => {
                                                        console.log("finish")
                                                        handleSearch()
                                                    }}
                                                    style={{ maxHeight: 40, borderRadius: '0 4px 4px 0', border: "1px solid var(--color-blue)" }}
                                                >
                                                    <Row style={{ flexWrap: 'nowrap', lineHeight: '20px' }}>
                                                        <span>
                                                            <SearchIcon color='#fff' style={{ marginRight: 5 }} />
                                                        </span>
                                                        Tìm kiếm
                                                    </Row>
                                                </Button>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        listCampaign?.length > 0 ? (

                                            <Row justify='space-between'
                                                style={{width: '100%',}}
                                            >
                                                {
                                                    listCampaign?.map((item, i) => (
                                                        <Col xs={11} sm={11} md={11} lg={11} xl={11}
                                                            key={i}
                                                        >
                                                            <ItemCampaign
                                                                data={item}  
                                                                isFollow={listCampaignFollow?.includes(item?.campaignId)}  
                                                                listCampaignFollow={listCampaignFollow}
                                                                setListCampaignFollow={setListCampaignFollow}
                                                                listProvinces={listProvinces}
                                                            />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        ) : "Không tìm thấy cuộc vận động nào"
                                    }
                                </Row>
                            </div>
                        ) : (
                            <div style={{ marginTop: 20, background: '#ffffff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: '30px 50px' }}>
                                <Row
                                    style={{ marginBottom: 30 }}
                                >
                                    <Col style={{ lineHeight: '30px' }}>
                                        <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
                                            Tất cả hình ảnh của tổ chức
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        infoCharity?.charityImages ? (
                                            <Row>
                                                {
                                                    infoCharity?.charityImages?.split(",")?.map((item, i) => (
                                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}
                                                            style={{ padding: '0 12px', marginBottom: 20 }}
                                                            key={i}
                                                        >
                                                            <img src={item} alt="charity_image"
                                                                style={{ width: '100%', borderRadius: 10, cursor: 'pointer', maxHeight: 170, objectFit: 'cover' }}
                                                                onClick={() => {
                                                                    setPreviewImage(true)
                                                                    setImagePreview(item)
                                                                }}
                                                            />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        ) : "Tổ chức chưa thêm hình ảnh nào"
                                    }
                                </Row>
                            </div>
                        )
                    }
                </Col>
            </Row>
            <FooterClient />
            <Modal
                className="modal-preview-image-app"
                open={previewImage}
                footer={null}
                closeIcon={<CloseOutlined style={{ fontSize: 24, color: '#ffffff' }} />}
                width={800}
                onCancel={() => {
                    setPreviewImage(false);
                }}
            >
                <img src={imagePreview} alt="charity_image"
                    style={{ width: '100%', height: '100%' }}
                />
            </Modal>
        </div>
    )
}

