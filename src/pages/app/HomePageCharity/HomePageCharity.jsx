import "./HomePageCharity.css"
import { PageLayout } from "../../../components"
import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {CheckCircleFilled} from '@ant-design/icons';
import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactApexChart from "react-apexcharts";
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";
import { getCharityByID } from "./HomePageCharityService";


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
            curve: 'straight'
            // curve: 'smooth',
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
          // colors: ["#43DA86"],
          colors: ["#6DCCE3"],
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
      getCharityByID("abc123").then(res=> {
        console.log(res)
        setCharity(res.data)
        setChart((chart)=> {
            return {...chart, "series": [{
                name: "Lượt tiếp cận",
                data: res.data.reach
              }],}
        })
      })
    },[])
    console.log("aaaaa")
    // const infoCharity = useSelector((state) => state.donation.infoCharity)
    // console.log(infoCharity)
  //   const infoCharity = {
  //     "id": "abc123",
  //           "name": "Áo ấm cho em",
  //           "avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //           "phone": "0369852147",
  //           "email": "tuthien@gmail.com",
  //           "address": "144 Xuân thủy Cầu giấy Hà Nội",
  //           "targetOfOrganization": "Mục tiêu của tổ chức từ thiện 'Áo ấm trao em' là cung cấp áo ấm và quần áo miễn phí cho trẻ em và người lớn khó khăn trong cộng đồng, đặc biệt là trong mùa đông lạnh giá. Chúng tôi mong muốn giúp đỡ và mang lại sự ấm áp cho những người đang gặp khó khăn trong cuộc sống.",
  //           "mottoOfOrganization": "Phương trâm của tổ chức từ thiện 'Áo ấm trao em' là giúp đỡ những trẻ em nghèo và vùng khó khăn trong cộng đồng bằng cách cung cấp các dịch vụ cơ bản như thức ăn, nước uống, quần áo và y tế. Chúng tôi cũng tập trung vào việc giúp đỡ trẻ em bị bỏ rơi, đưa họ đến trường và hỗ trợ họ trong việc học tập và phát triển bản thân.",
  //           "socialNetwork": {
  //               "facebook": "https://www.facebook.com/",
  //               "instagram": "https://www.instagram.com/",
  //               "twitter": "https://twitter.com/?lang=en",
  //               "linkedIn": "https://www.linkedin.com/",
  //           },
  //           "introVideo": "https://www.youtube.com/embed/6h2fq03pJTk",
  //           "images": [
  //               "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
  //               "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //               "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
  //               "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
  //               "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg"
  //           ],
  //           "googlemap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s",
  //           "isVerification": true,
  //           "followers": 157422,
  //           "introduction": "Xin chào và chào mừng đến với tổ chức từ thiện 'Áo ấm trao em'. Chúng tôi hoạt động với mục đích giúp đỡ những trẻ em khó khăn và gia đình nghèo trong cộng đồng. Chúng tôi cố gắng cung cấp cho các em cơ hội học tập và phát triển bản thân để họ có thể có một tương lai tốt đẹp hơn. Chân thành cảm ơn sự quan tâm và hỗ trợ của các bạn!",
  //           "numberCampaigns": 4,
  //           "accountNumber": "0123456789 - Nguyen Van A - MB Bank - Ngân hàng Quân đội",
  //           "reach": [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024],
  // }

    // useEffect(()=> {
    //     setCharity(infoCharity)
    //     setChart((chart)=> {
    //         return {...chart, "series": [{
    //             name: "Lượt tiếp cận",
    //             data: infoCharity.reach
    //           }],}
    //     })
    // },[infoCharity])

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