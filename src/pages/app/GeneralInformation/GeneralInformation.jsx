import "./GeneralInformation.css"
import { Button, Image, Row, Col } from "antd"
import { PageLayout } from "../../../components"
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";
import GeneralInformationDialog from "./GeneralInformationDialog";
import { CheckCircleFilled, CloseOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, NotificationOutlined, PhoneOutlined } from "@ant-design/icons";
import { getCharityByID } from "../HomePageCharity/HomePageCharityService"

function GeneralInformation() {

    const dispatch = useDispatch()

    const [charity, setCharity] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [reloadData, setReloadData] = useState("1")


    useEffect(()=> {
        // getApp("abc123").then(res=> dispatch(getInfoCharity(res.data)))
        getCharityByID("abc123").then(res=> setCharity(res.data))
    },[reloadData])
    console.log(reloadData)

    // const infoCharity = useSelector((state) => state.donation.infoCharity)
    // console.log(infoCharity)

    // const infoCharity = useMemo(() => {
    //     let message1 = "https://www.google.com/maps/embed/v1/place&center=21.0368559,105.7801041&q="
    //     let message = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.883391940674!2d105.80691271473164!3d21.037351285993743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab14f8420767%3A0x8e7487a3ba6b8764!2zMzQyIMSQ4buZaSBD4bqlbiwgQ-G7kW5nIFbhu4ssIEJhIMSQw6xuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1680325397474!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    //     const test = message.split(" ")[1].slice(5,-1)
    //     return {
    //         "id": "abc123",
    //         "name": "Áo ấm cho em",
    //         "avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //         "phone": "0369852147",
    //         "email": "tuthien@gmail.com",
    //         "address": "144 Xuân thủy Cầu giấy Hà Nội",
    //         "targetOfOrganization": "Mục tiêu của tổ chức từ thiện 'Áo ấm trao em' là cung cấp áo ấm và quần áo miễn phí cho trẻ em và người lớn khó khăn trong cộng đồng, đặc biệt là trong mùa đông lạnh giá. Chúng tôi mong muốn giúp đỡ và mang lại sự ấm áp cho những người đang gặp khó khăn trong cuộc sống.",
    //         "mottoOfOrganization": "Phương trâm của tổ chức từ thiện 'Áo ấm trao em' là giúp đỡ những trẻ em nghèo và vùng khó khăn trong cộng đồng bằng cách cung cấp các dịch vụ cơ bản như thức ăn, nước uống, quần áo và y tế. Chúng tôi cũng tập trung vào việc giúp đỡ trẻ em bị bỏ rơi, đưa họ đến trường và hỗ trợ họ trong việc học tập và phát triển bản thân.",
    //         "socialNetwork": {
    //             "facebook": "https://www.facebook.com/",
    //             "instagram": "https://www.instagram.com/",
    //             "twitter": "https://twitter.com/?lang=en",
    //             "linkedIn": "https://www.linkedin.com/",
    //         },
    //         "introVideo": "https://www.youtube.com/embed/6h2fq03pJTk",
    //         "images": [
    //             "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    //             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //             "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
    //             "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
    //             "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg"
    //         ],
    //         // "googlemap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s",
            
    //         "googlemap": test,
    //         "isVerification": true,
    //         "followers": 157422,
    //         "introduction": "Xin chào và chào mừng đến với tổ chức từ thiện 'Áo ấm trao em'. Chúng tôi hoạt động với mục đích giúp đỡ những trẻ em khó khăn và gia đình nghèo trong cộng đồng. Chúng tôi cố gắng cung cấp cho các em cơ hội học tập và phát triển bản thân để họ có thể có một tương lai tốt đẹp hơn. Chân thành cảm ơn sự quan tâm và hỗ trợ của các bạn!",
    //         "numberCampaigns": 4,
    //         "accountNumber": "0123456789 - Nguyen Van A - MB Bank - Ngân hàng Quân đội",
    //         "reach": [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024],
    //     }
    // }, [])


    // useEffect(() => {
    //     setCharity(infoCharity)
    // }, [infoCharity])


    // console.log(charity)


    const handleCloseModal = () => {
        setOpenDialog(false)
        setReloadData("1")
        // setDataUpdate({})
    }
    const handleReloadData = (data) => {
        console.log(data)
        setReloadData(data)
    }


    return (
        <PageLayout>
            <div className="gi-header">
                <h1>Thông tin chung</h1>
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
                                            src={charity.avatar}
                                            width={60}
                                            height={60}
                                            className="gi-image"
                                        />
                                        <div className="gi-name">
                                            <h4>{charity.name}</h4>
                                            <CheckCircleFilled
                                                className="gi-icon-check"
                                                style={{ display: charity.isVerification ? "" : "none" }}
                                            // disabled
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Giới thiệu tổ chức
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                    {charity.introduction}
                                </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Phương châm
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                {charity.mottoOfOrganization}
                                </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <Row style={{ paddingLeft: 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Mục tiêu
                                </Row>
                                <div style={{ lineHeight: '21px', marginBottom: 10 }}>
                                    {charity.targetOfOrganization}
                                </div>
                            </div>
                        </div>
                        <div style={{ background: '#fff', borderRadius: 6, boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px', padding: '24px 30px', marginTop: 20 }}>
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                                    Video Giới thiệu
                                </div>
                                <div>
                                    <iframe width="100%" height="350" src="https://www.youtube.com/embed/6h2fq03pJTk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
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
                                        charity.images?.map((image, index) =>
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
                            <Row style={{paddingLeft:10 , borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                Liên hệ
                            </Row>
                            {/* <Row style={{ padding: '3px 0', borderBottom: '1px solid var(--color-border)' }}></Row> */}
                            <div style={{ paddingTop: 6}}>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10,}}>
                                    <PhoneOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {charity.phone}
                                </Row>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10,}}>
                                    <GlobalOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    http://www.thiennguyen.com/
                                </Row>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10,}}>
                                    <MailOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {charity.email}
                                </Row>
                                <Row style={{ lineHeight: '20px', fontSize: 15, marginBottom: '16px', marginLeft: 10, flexWrap: 'nowrap' }}>
                                    <EnvironmentOutlined style={{ color: 'var(--color-blue', marginRight: 12, fontSize: 20 }} />
                                    {charity.address}
                                </Row>
                                <div style={{ margin: "0 10px 20px 10px", }}>
                                    {/* <div style={{ fontSize: 16, fontWeight: '600', marginBottom: 20 }}>Địa chỉ trụ sở chính</div> */}
                                    <div>
                                        {/* {charity.googlemap} */}
                                        <iframe title="Google map" src={charity.googlemap} style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: '600', marginBottom: 20, borderLeft: '3px solid var(--color-blue)', paddingLeft:10 }}>Liên hệ qua mạng xã hội</div>
                                    <Row>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                            <img src="/images/facebook.png" alt="logo facebook"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a 
                                                href={charity.socialNetwork?.facebook} 
                                                target="_blank" 
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if(charity.socialNetwork?.facebook === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Facebook</a>

                                        </div>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                            <img src="/images/instagram.png" alt="logo instagram"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a 
                                                href={charity.socialNetwork?.instagram} 
                                                target="_blank" 
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if(charity.socialNetwork?.instagram === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Instagram</a>

                                        </div>
                                        <div style={{ marginRight: 12, padding: '0 10px', textAlign: 'center' }}>
                                            <img src="/images/twitter.png" alt="logo Twitter"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a 
                                                href={charity.socialNetwork?.twitter} 
                                                target="_blank" 
                                                className="gi-socialNetwork-link"
                                                onClick={(e) => {
                                                    if(charity.socialNetwork?.twitter === "") {
                                                        e.preventDefault()
                                                    }
                                                }}
                                            >Twitter</a>

                                        </div>
                                        <div style={{ padding: '0 10px', textAlign: 'center' }}>
                                            <img src="/images/linkedin.png" alt="logo LinkedIn"
                                                style={{ width: 33, marginBottom: 8 }}
                                            />
                                            <a 
                                                href={charity.socialNetwork?.linkedIn} 
                                                target="_blank" 
                                                className="gi-socialNetwork-link" 
                                                onClick={(e) => {
                                                    if(charity.socialNetwork?.linkedIn === "") {
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