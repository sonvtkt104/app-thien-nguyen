import "./HomePageCharity.css"
import { PageLayout } from "../../../components"
import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {CheckCircleFilled} from '@ant-design/icons';
import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactApexChart from "react-apexcharts";
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";
import { getCharity } from "./HomePageCharityService";


function HomePageCharity() {
    const dispatch = useDispatch()
    const chartObj = {
          
        series: [{
          name: "Lượt tiếp cận",
          data: []
        }],
        options: {
          chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            // curve: 'straight'
            curve: 'smooth',
          },
          title: {
            text: 'Thống kê Lượt tiếp cận năm 2022',
            align: 'center',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  "Poppins",
                color:  '#263238'
            }
          },
          colors: ["#43DA86"],
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
          xaxis: {
            type: 'month',
          },
          yaxis: {
            opposite: false
          }
        },
      
      
    };
    
    const [charity, setCharity] = useState({})
    const [chart, setChart] = useState(chartObj)
    
    useEffect(()=> {
        getApp("abc123").then(res=> dispatch(getInfoCharity(res.data)))
    },[])
    
    // const infoCharity = useSelector((state) => state.donation.infoCharity)
    // console.log(infoCharity)
    const infoCharity = {
      "id": "abc123",
      "name": "Hội Từ thiện Minh Tâm Hà Nội",
      "avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      "phone": "0369852147",
      "email": "tuthien@gmail.com",
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

    useEffect(()=> {
        setCharity(infoCharity)
        setChart((chart)=> {
            return {...chart, "series": [{
                name: "Lượt tiếp cận",
                data: infoCharity.reach
              }],}
        })
    },[infoCharity])

    const convertToString = (number) => {
        if (number < 999) {
          number = number + ""
        } else if (number === 1000) {
          number = (number / 1000).toFixed(0) + "k"
        } else if (number < 1000000) {
          number = (number / 1000).toFixed(1) + "k"
        } else if (number === 1000000) {
          number = (number / 1000000).toFixed(0) + "M"
        } else {
          number = (number / 1000000).toFixed(2) + "M"
        }
        return number
    }

    return (
        <PageLayout>
            <div className="hpc-modal">
                <div className="hpc-modal-main">
                    <div className="hpc-title">
                        <div className="hpc-title-left">
                            <Image 
                                className="hpc-image"
                                src= {charity.avatar}
                                width={80}
                            />
                            <h1 className="hpc-name">{charity.name}</h1>
                            <CheckCircleFilled 
                              className="hpc-icon-check"
                              style={{display: charity.isVerification ? "" : "none"}}
                              // disabled
                            />
                            
                        </div>
                        <p className="hpc-follow">Số người theo dõi: {convertToString(charity.followers)}</p>
                    </div>
                    <div className="hpc-content">
                        <p className="hpc-introduction">{charity.introduction}</p>
                        <p className="hpc-number-campaigns">Số cuộc vận động: {charity.numberCampaigns}</p>
                    </div>

                </div>
            </div>
            <div className="hpc-modal-reach">
                <ReactApexChart options={chart.options} series={chart.series} type="area" height={350} />
            </div>
        </PageLayout>
    )

}

export default HomePageCharity