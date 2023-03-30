import "./GeneralInformation.css"
import { Button, Image, Row, Col } from "antd"
import { PageLayout } from "../../../components"
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";
import { CheckCircleFilled } from '@ant-design/icons';
import GeneralInformationDialog from "./GeneralInformationDialog";

function GeneralInformation() {

    const dispatch = useDispatch()

    const [charity, setCharity] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})

    // useEffect(()=> {
    //     getApp("abc123").then(res=> dispatch(getInfoCharity(res.data)))
    // },[])

    // const infoCharity = useSelector((state) => state.donation.infoCharity)
    // console.log(infoCharity)

    const infoCharity = useMemo(() => {
        return {
            "id": "abc123",
            "name": "Hội Từ thiện Minh Tâm Hà Nội",
            "avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "phone": "0369852147",
            "email": "tuthien@gmail.com",
            "address": "144 Xuân thủy Cầu giấy Hà Nội",
            "targetOfOrganization": "Giúp đỡ người gặp hoàn cảnh khó khăn trong cuộc sống mà tự họ không thể thay đổi được",
            "mottoOfOrganization": "Chung sức vì nhân đạo",
            "socialNetwork": {
                "facebook": "https://www.facebook.com/",
                "instagram": "https://www.instagram.com/",
                "twitter": "https://twitter.com/?lang=en",
                "linkedIn": "https://www.linkedin.com/",
            },
            "introVideo": "https://www.youtube.com/embed/6h2fq03pJTk",
            "images": [
                "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
                "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
                "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg"
            ],
            "googlemap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s",
            "isVerification": true,
            "followers": 157422,
            "introduction": "Hội Từ thiện Minh Tâm Hà Nội được thành lập vào ngày 15/4/2014, là Hội từ thiện tự nguyện do các thành viên ở khắp mọi nơi với nhiều ngành nghề khác nhau có cùng chung một mục đích chia sẻ với những hoàn cảnh kém may mắn. Dựa trên tinh thần tự nguyện nên các thành viên tự đóng góp tài chính và kêu gọi từ anh, chị, em, bạn bè, người thân cho các hoạt động chung của Hội",
            "numberCampaigns": 4,
            "accountNumber": "0123456789 - Nguyen Van A - MB Bank - Ngân hàng Quân đội",
            "reach": [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024],
        }
    }, [])


    useEffect(() => {
        setCharity(infoCharity)
    }, [infoCharity])
    // console.log(charity)


    const handleCloseModal = () => {
        setOpenDialog(false)
        setDataUpdate({})
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
                        setDataUpdate(infoCharity)
                    }}
                >
                    Chỉnh sửa
                </Button>
            </div>
            <div className="gi-modal">
                <div className="gi-modal-header">
                    <Image
                        src={charity.avatar}
                        width={150}
                        className="gi-image"
                    />
                    <div className="gi-name">
                        <h3>{charity.name}</h3>
                        <CheckCircleFilled
                            className="gi-icon-check"
                            style={{ display: charity.isVerification ? "" : "none" }}
                        // disabled
                        />
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{width:"60%"}}>
                        <p> <b> Lời giới thiệu:</b> {charity.introduction}</p>
                        <p> <b>Mục tiêu:</b> {charity.targetOfOrganization}</p>
                        <p> <b>Phương châm:</b> {charity.mottoOfOrganization}</p>
                        <p> <b>Số tài khoản:</b> {charity.accountNumber}</p>
                        <div>
                        <p><b>Video giới thiệu:</b></p>
                            <iframe width="100%" height="350" src={charity.introVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <p><b>Ảnh:</b></p>
                        <div style={{ display:"flex", flexWrap:"wrap" }}>
                            {
                                charity.images?.map((image, index) =>
                                    <div style={{margin: "2px", border: "1px solid #e7e5e5", display:"flex", alignItems: "center", height:130, width:130 }}>
                                        <Image
                                            className="modal-detail-image"
                                            style={{maxHeight:130, maxWidth:130}}
                                            key={index}
                                            width={130}
                                            src={image}>
                                        </Image>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div style={{width:"37%"}}>
                        <p> <b>Số điện thoại:</b> {charity.phone}</p>
                        <p> <b>Email:</b> {charity.email}</p>
                        <p> <b>Địa chỉ:</b> {charity.address}</p>
                        <iframe title="Google map" src={charity.googlemap} style={{border: 0, width: '100%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <p> <b>Mạng xã hội khác:</b></p>
                        <div style={{ marginLeft: 20 }}>
                            <p className="gi-socialNetwork">Facebook:  <a href={charity.socialNetwork?.facebook} target="_blank" className="gi-socialNetwork-link"> "{charity.socialNetwork?.facebook}"</a></p>
                            <p className="gi-socialNetwork">Instagram: <a href={charity.socialNetwork?.instagram} target="_blank" className="gi-socialNetwork-link">"{charity.socialNetwork?.instagram}"</a></p>
                            <p className="gi-socialNetwork">Twitter: <a href={charity.socialNetwork?.twitter} target="_blank" className="gi-socialNetwork-link">"{charity.socialNetwork?.twitter}"</a></p>
                            <p className="gi-socialNetwork">LinkedIn: <a href={charity.socialNetwork?.linkedIn} target="_blank" className="gi-socialNetwork-link">"{charity.socialNetwork?.linkedIn}"</a></p>
                        </div>
                    </div>
                </div>
                {/* <p> <b> Lời giới thiệu:</b> {charity.introduction}</p>
                <p> <b>Mục tiêu:</b> {charity.targetOfOrganization}</p>
                <p> <b>Phương châm:</b> {charity.mottoOfOrganization}</p>
                <p> <b>Số tài khoản:</b> {charity.accountNumber}</p>
                <p> <b>Số điện thoại:</b> {charity.phone}</p>
                <p> <b>Email:</b> {charity.email}</p>
                <p> <b>Địa chỉ:</b> {charity.address}</p>
                <p> <b>Mạng xã hội khác:</b></p>
                <div style={{ marginLeft: 20 }}>
                    <p>Facebook: <a href={charity.socialNetwork?.facebook} target="_blank">"{charity.socialNetwork?.facebook}"</a></p>
                    <p>Instagram: <a href={charity.socialNetwork?.instagram} target="_blank">"{charity.socialNetwork?.instagram}"</a></p>
                    <p>Twitter: <a href={charity.socialNetwork?.twitter} target="_blank">"{charity.socialNetwork?.twitter}"</a></p>
                    <p>LinkedIn: <a href={charity.socialNetwork?.linkedIn} target="_blank">"{charity.socialNetwork?.linkedIn}"</a></p>
                </div>
                <div>
                    <p><b>Video giới thiệu:</b></p>
                    <iframe width="50%" height="300" src={charity.introVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <p><b>Ảnh:</b></p>
                <div style={{ display:"flex", flexWrap:"wrap" }}>
                    {
                        charity.images?.map((image, index) =>
                            <div style={{margin: "2px", border: "1px solid #e7e5e5", display:"flex", alignItems: "center", height:120, width:120 }}>
                                <Image
                                    className="modal-detail-image"
                                    style={{maxHeight:120, maxWidth:120}}
                                    key={index}
                                    width={120}
                                    src={image}>
                                </Image>
                            </div>
                        )
                    }
                </div> */}
               
                {/* <div className="gi-link">
                    { 
                        charity.socialNetwork?.map((link,index) => 
                                <p key={index}>
                                    <a 
                                        // key={index}
                                        href={link}
                                    >
                                    {link}
                                    </a>
                                </p>
                                
                            )
                    }
                </div> */}
            </div>
            {
                openDialog && <GeneralInformationDialog
                    dataUpdate={dataUpdate}
                    handleCloseModal={handleCloseModal}
                />
            }
        </PageLayout>
    )

}

export default GeneralInformation