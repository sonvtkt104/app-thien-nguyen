import "./GeneralInformation.css"
import { Button, Image } from "antd"
import { PageLayout } from "../../../components"
import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";

function GeneralInformation() {

    const dispatch = useDispatch()
    const [charity, setCharity] = useState({})

    useEffect(()=> {
        getApp("abc123").then(res=> dispatch(getInfoCharity(res.data)))
    },[])
    
    const infoCharity = useSelector((state) => state.donation.infoCharity)
    console.log(infoCharity)

    useEffect(()=> {
        setCharity(infoCharity)
    },[infoCharity])
    console.log(charity.socialNetwork)
    return (
        <PageLayout>
            <div className="gi-header">
                <h1>Thông tin chung</h1>
                <Button type="primary">Chỉnh sửa</Button>
            </div>
            <div className="gi-modal">
                <div className="gi-modal-header">
                        <Image
                            src= {charity.avatar}
                            width={100}
                            className="gi-image"
                        />
                    <h3>{charity.name}</h3>
                </div>
                <p> <b> Lời giới thiệu:</b> {charity.introduction}</p>
                <p> <b>Mục tiêu:</b> {charity.targetOfOrganization}</p>
                <p> <b>Phương châm:</b> {charity.mottoOfOrganization}</p>
                <p> <b>Số điện thoại:</b> {charity.phone}</p>
                <p> <b>Email:</b> {charity.email}</p>
                <p> <b>Link mạng xã hội khác:</b></p>
                <div className="gi-link">
                    {
                        charity.socialNetwork?.map((link,index) => 
                                <p>
                                    <a 
                                        key={index}
                                        href={link}
                                    >
                                    {link}
                                    </a>
                                </p>
                                
                            )
                    }
                </div>
            </div>
        </PageLayout>
    )

}

export default GeneralInformation