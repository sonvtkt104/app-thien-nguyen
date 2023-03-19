import "./HomePageCharity.css"
import { PageLayout } from "../../../components"
import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {EyeOutlined, PhoneOutlined, SearchOutlined,CheckCircleFilled} from '@ant-design/icons';
import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactApexChart from "react-apexcharts";
import { getInfoCharity } from "../../../redux/donationSlice";
import { getApp } from "../Donation/myDonation/MyDonationService";


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
            text: 'Thống kê lượt tiếp cận năm 2022',
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
    
    const infoCharity = useSelector((state) => state.donation.infoCharity)
    // console.log(infoCharity)
    
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
                                width={60}
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