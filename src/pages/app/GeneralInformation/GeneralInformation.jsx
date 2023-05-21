import "./GeneralInformation.css"
import { Button, Image, Row, Col } from "antd"
import { PageLayout } from "../../../components"
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GeneralInformationDialog from "./GeneralInformationDialog";
import { CheckCircleFilled, CloseOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, NotificationOutlined, PhoneOutlined } from "@ant-design/icons";
import { getCurrentCharity } from "../HomePageCharity/HomePageCharityService"
import { useNavigate } from "react-router-dom"
import ReactPlayer from 'react-player'

function GeneralInformation() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [charity, setCharity] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [reloadData, setReloadData] = useState()

    useEffect(() => {
        getCurrentCharity().then(res => {
            console.log(res.data.data);
            setCharity(res.data.data)
        })
    }, [reloadData])
    // console.log(reloadData)
    // console.log(charity)


    const handleCloseModal = () => {
        setOpenDialog(false)
        // setReloadData("1")
        // setDataUpdate({})
    }
    const handleReloadData = (data) => {
        setReloadData(data)
    }


    return (
        <PageLayout keyActive='info'>
            <div className="gi-header">
                <h1>Thông tin chung</h1>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        style={{ marginRight: "8px" }}
                        onClick={() => {
                            // navigate("/profile-charity")
                            // window.open('/profile-charity', '_blank');
                            window.open(`/profile-charity/${charity?.charityId}`, '_blank');
                        }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            setOpenDialog(true)
                            // setDataUpdate(infoCharity)
                            setDataUpdate(charity)
                            setReloadData("1")
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
            <div>
                <Row>
                    <Col xs={15} sm={15} md={15} lg={15} xl={15}
                        style={{ paddingRight: 20 }}
                    >
                        <div style={{ background: '#fff', borderRadius: 6, boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px', padding: 20 }}>
                            <div style={{ marginBottom: 20 }}>
                                <Row>
                                    <div className="gi-modal-header">
                                        <Image
                                            src={charity?.avatar || "/images/avartarDefault.png"}
                                            // fallback="data:image/png;base64,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"
                                            width={60}
                                            height={60}
                                            className="gi-image"
                                        />
                                        <div style={{ marginLeft: 12 }}>
                                            <div className="gi-name">
                                                <h4>{charity?.name}</h4>
                                                <CheckCircleFilled
                                                    className="gi-icon-check"
                                                    style={{ display: charity?.isVerified === 2 ? "" : "none" }}
                                                />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <p style={{ marginRight: 8 }}>{`${charity?.numFollow} người theo dõi,`}</p>
                                                <p>{`${charity?.numCampaign} cuộc vận động`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Giới thiệu tổ chức
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                    {charity?.charityDescription}
                                </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Phương châm
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                    {charity?.charityMotto}
                                </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Mục tiêu
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                    {charity?.charityTarget}
                                </div>
                            </div>
                        </div>
                        <div style={{ background: '#fff', borderRadius: 6, boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px', padding: '24px 30px', marginTop: 20 }}>
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                                    Video Giới thiệu
                                </div>
                                {
                                    ReactPlayer.canPlay(charity?.charityIntroVideo) &&
                                        <ReactPlayer 
                                            url={charity?.charityIntroVideo}
                                            style={{ width: '100%', display: charity?.charityIntroVideo && charity?.charityIntroVideo !== "" ? "" : "none"  }}
                                            width='100%'
                                            height="350px"
                                        />
                                }
                            </div>
                            <div>
                                <Row justify='space-between'
                                    style={{ marginBottom: 12 }}
                                >
                                    <span style={{ fontSize: 18, fontWeight: '600' }}>
                                        Hình ảnh
                                    </span>
                                </Row>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {
                                        charity?.charityBanner && charity?.charityBanner !== "" &&
                                        <div style={{ margin: "4px", border: "1px solid #e7e5e5", display: "flex", alignItems: "center", height: 125, width: 125 }}>
                                            <Image
                                                className="modal-detail-image"
                                                style={{ maxHeight: 125, maxWidth: 125 }}
                                                width={125}
                                                src={charity?.charityBanner}>
                                            </Image>
                                        </div>

                                    }

                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {
                                        charity?.charityImages && charity?.charityImages !== "" && charity?.charityImages?.split(",").map((image, index) =>
                                            <div key={index} style={{ margin: "4px", border: "1px solid #e7e5e5", display: "flex", alignItems: "center", height: 125, width: 125 }}>
                                                <Image
                                                    className="modal-detail-image"
                                                    style={{ maxHeight: 125, maxWidth: 125 }}
                                                    // key={index}
                                                    width={125}
                                                    src={image}>
                                                </Image>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} >
                        <div
                            style={{ background: '#fff', borderRadius: 6, boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px', padding: 20 }}
                        >
                            <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                Liên hệ
                            </Row>
                            <div style={{ paddingTop: 6 }}>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10, }}>
                                    <PhoneOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {charity?.phoneNumber}
                                </Row>
                                    <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10, display: charity?.charityWebsite && charity?.charityWebsite !== "" ? "" : "none" }}>
                                        <GlobalOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                        {charity?.charityWebsite}
                                    </Row>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10, }}>
                                    <MailOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {charity?.email}
                                </Row>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10, flexWrap: 'nowrap' }}>
                                    <EnvironmentOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {`${charity?.address}, ${charity?.ward}, ${charity?.district}, ${charity?.province}`}
                                </Row>
                                <div style={{ margin: "0 10px 20px 10px", }}>
                                    <div style={{display: charity?.googleMap && charity?.googleMap !== "" ? "" : "none" }}>
                                        <iframe title="Google map" src={charity?.googleMap} style={{ border: 0, width: '100%', height:200 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div style={{display:charity?.charityFacebook !== "" || charity?.charityInstagram !== "" || charity?.charityLinkedIn !== "" || charity?.charityTwitter !== "" ? "" : "none" }}>
                                    <div style={{ fontSize: 16, fontWeight: '600', marginBottom: 20, borderLeft: '3px solid var(--color-blue)', paddingLeft: 10 }}>Liên hệ qua mạng xã hội</div>
                                    <Row>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center', display: charity?.charityFacebook && charity?.charityFacebook !== "" ? "" : "none" }}>
                                            <img src="/images/facebook.png" alt="logo facebook"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a
                                                href={charity?.charityFacebook}
                                                target="_blank"
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if (charity?.charityFacebook === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Facebook</a>

                                        </div>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center', display: charity?.charityInstagram && charity?.charityInstagram !== "" ? "" : "none" }}>
                                            <img src="/images/instagram.png" alt="logo instagram"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a
                                                href={charity?.charityInstagram}
                                                target="_blank"
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if (charity?.charityInstagram === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Instagram</a>

                                        </div>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center', display: charity?.charityTwitter && charity?.charityTwitter !== "" ? "" : "none" }}>
                                            <img src="/images/twitter.png" alt="logo Twitter"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a
                                                href={charity?.charityTwitter}
                                                target="_blank"
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if (charity?.charityTwitter === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Twitter</a>

                                        </div>
                                        <div style={{ padding: '0 10px', textAlign: 'center', display: charity?.charityLinkedIn && charity?.charityLinkedIn !== "" ? "" : "none" }}>
                                            <img src="/images/linkedin.png" alt="logo LinkedIn"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a
                                                href={charity?.charityLinkedIn}
                                                target="_blank"
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if (charity?.charityLinkedIn === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >LinkedIn</a>

                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>




            {
                openDialog && <GeneralInformationDialog
                    dataUpdate={dataUpdate}
                    handleCloseModal={handleCloseModal}
                    handleReloadData={handleReloadData}
                />
            }
        </PageLayout>
    )

}

export default GeneralInformation