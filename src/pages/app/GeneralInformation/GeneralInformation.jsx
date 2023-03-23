import "./GeneralInformation.css"
import { Button, Image } from "antd"
import { PageLayout } from "../../../components"
import React, { useState, useEffect, useRef, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";
import {CheckCircleFilled} from '@ant-design/icons';
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
          "socialNetwork": [
            "https://www.google.com/",
            "https://www.facebook.com/"
          ],
          "isVerification": true,
          "followers": 157422,
          "introduction": "Hội Từ thiện Minh Tâm Hà Nội được thành lập vào ngày 15/4/2014, là Hội từ thiện tự nguyện do các thành viên ở khắp mọi nơi với nhiều ngành nghề khác nhau có cùng chung một mục đích chia sẻ với những hoàn cảnh kém may mắn. Dựa trên tinh thần tự nguyện nên các thành viên tự đóng góp tài chính và kêu gọi từ anh, chị, em, bạn bè, người thân cho các hoạt động chung của Hội",
          "numberCampaigns": 4,
          "accountNumber": "0123456789 - Nguyen Van A - MB Bank - Ngân hàng Quân đội",
          "reach": [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024],
        }
    },[])


    useEffect(()=> {
        setCharity(infoCharity)
    },[infoCharity])
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
                            src= {charity.avatar}
                            width={150}
                            className="gi-image"
                        />
                    <div className="gi-name">
                        <h3>{charity.name}</h3>
                        <CheckCircleFilled 
                            className="gi-icon-check"
                            style={{display: charity.isVerification ? "" : "none"}}
                            // disabled
                        />
                    </div>
                </div>
                <p> <b> Lời giới thiệu:</b> {charity.introduction}</p>
                <p> <b>Mục tiêu:</b> {charity.targetOfOrganization}</p>
                <p> <b>Phương châm:</b> {charity.mottoOfOrganization}</p>
                <p> <b>Số điện thoại:</b> {charity.phone}</p>
                <p> <b>Email:</b> {charity.email}</p>
                <p> <b>Số tài khoản:</b> {charity.accountNumber}</p>
                <p> <b>Địa chỉ:</b> {charity.address}</p>
                <p> <b>Link mạng xã hội khác:</b></p>
                <div className="gi-link">
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
                </div>
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