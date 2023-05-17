import "./HomePageCharity.css"
import { PageLayout } from "../../../components"
import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {CheckCircleFilled} from '@ant-design/icons';
import React, { useState, useEffect, useRef, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactApexChart from "react-apexcharts";
import { getCurrentCharity } from "./HomePageCharityService";


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
    
    const [charity, setCharity] = useState()
    const [chart, setChart] = useState(chartObj)
    console.log("aaaaaa")
    useEffect(()=> {
      getCurrentCharity().then(res=> {
        setCharity(res?.data?.data)
        // setChart((chart)=> {
        //     return {...chart, "series": [{
        //         name: "Lượt tiếp cận",
        //         data: res?.data?.reach
        //       }],}
        // })
        setChart((chart)=> {
          return {...chart, "series": [{
              name: "Lượt tiếp cận",
              data: [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024]
            }],}
      })
      })
    },[])
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
        <PageLayout keyActive="dashboard">
            <div className="hpc-modal">
                <div className="hpc-modal-main">
                    <div className="hpc-title">
                        <div className="hpc-title-left">
                            <Image 
                                className="hpc-image"
                                src= {charity?.avatar || "/images/avartarDefault.png"}
                                // fallback="data:image/png;base64,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"
                                width={80}
                                height={80}
                            />
                            <h1 className="hpc-name">{charity?.name}</h1>
                            <CheckCircleFilled 
                              className="hpc-icon-check"
                              style={{display: charity?.isVerification ? "" : "none"}}
                              // disabled
                            />
                            
                        </div>
                        <p className="hpc-follow">Số người theo dõi: {convertToString(charity?.followers)}</p>
                    </div>
                    <div className="hpc-content">
                        {/* <p className="hpc-introduction">{charity?.charityDescription}</p> */}
                        <p className="hpc-introduction">Là tổ chức nổi bật, đóng góp tính cực cho cộng đồng, gồm những hoạt động mang nhiều ý nhân văn.</p>
                        <p className="hpc-number-campaigns">Số cuộc vận động: {charity?.numberCampaigns}</p>
                    </div>

                </div>
            </div>
            <div className="hpc-modal-reach">
                <ReactApexChart options={chart?.options} series={chart?.series} type="area" height={350} />
            </div>
        </PageLayout>
    )

}

export default HomePageCharity