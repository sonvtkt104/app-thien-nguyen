import { Component, useMemo } from "react";
import { ArrowLeftIcon, PageLayout, SegmentedApp, TableApp, Tag } from "../../../components";
import { Button, Col, Divider, Modal, Row, Upload, message } from "antd";
import { Link } from "react-router-dom";
import Chart from 'react-apexcharts';

import './CampaignPreview.scss';

import 'react-markdown-editor-lite/lib/index.css';
import { DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleFilled, VerticalAlignBottomOutlined } from "@ant-design/icons";
import ModalCreatePost from "./ModalCreatePost";
import { toast } from "react-toastify";
import ModalEditPost from "./ModalEditPost";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import moment from "moment";

// Papaparse
import Papa from 'papaparse';
import {CSVLink} from "react-csv";

import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";

const { confirm } = Modal;

function CamPaignPreview() {

    let { campaignId } = useParams();

    let [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false)
    let [isOpenModalEditPost, setIsOpenModalEditPost] = useState(false)
    let [valueOption, setValueOption] = useState(1)
    let [dataPosts, setDataPosts] = useState([])
    let [dataDonors, setDataDonors] = useState([])


    let options = [
        {label: 'Thông tin chung', value: 1},
        {label: 'Bài viết', value: 2}, 
        {label: 'Sao kê', value: 3}, 
        // {label: 'Thống kê', value: 4}
    ]

    let columns = [
                        {
                          key: 1,
                          title: "Tiêu đề",
                          dataIndex: "name",
                          align: 'center',
                        },
                        {
                          key: 2,
                          title: "Kiểu bài đăng",
                          dataIndex: "postType",
                          align: 'center',
                        },
                        {
                          key: 3,
                          title: "Thời gian đăng",
                          dataIndex: "date",
                          align: 'center',
                        },
                        {
                          key: 4,
                          title: "Hành động",
                          dataIndex: "action",
                          align: 'center',
                          render: (text, record, index) => {
                            return (
                                <div className="campaign-list-actions">
                                    <EditOutlined
                                        className="actions-edit"
                                        onClick={()=> handleActions(record, 'edit')}
                                    />

                                    <DeleteOutlined
                                        className="actions-delete"
                                        onClick={() => showDeleteConfirm(record)}
                                    />       
                                </div>
                            )
                        }
                        },
    ]

    const showDeleteConfirm = (record) => {
        // console.log(campaignId);
        // console.log(record)
        // setPostId(record.postId)
        // console.log(postId)
        // return;     
        confirm({
          title: 'Bạn muốn xóa bài viết này?',
          icon: <ExclamationCircleFilled />,
          content: 'Dữ liệu bị xóa sẽ không thể khôi phục, vẫn tiếp tục?',
          okText: 'Đồng ý',
          okType: 'danger',
          cancelText: 'Hủy bỏ',
          centered: true,
          async onOk() {
            await axios({
                method: 'delete',
                url: `http://localhost:8089/charity/post/delete-post?campaign-id=${campaignId}&post-id=${record.postId}`,
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                },
            });
            toast.success('Đã xóa bài viết này!');
            getDataPosts();
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
    };

    let dataSource = dataPosts.map((item, index) => ({
        key: index,
        name: item.title,
        postType: item.type,
        date: moment(item.submitTime).format("DD/MM/YYYY"),
        postId: item.id
    }))

    let columns2 = [
                        {
                          key: 1,
                          title: "Họ và tên",
                          dataIndex: "fullname",
                          align: 'center',
                        },
                        {
                          key: 2,
                          title: "Số tiền ủng hộ",
                          dataIndex: "money",
                          align: 'center',
                        },
                        {
                          key: 3,
                          title: "Nội dung ủng hộ",
                          dataIndex: "content",
                          align: 'center',
                        },
                        {
                          key: 4,
                          title: "Thời gian ủng hộ",
                          dataIndex: "date",
                          align: 'center',
                        },                        
    ]
    let dataSource2 = dataDonors.map((item, index) => ({
        key: index,
        fullname: item.name,
        money: `${item.amount} VNĐ`,
        content: item.note,
        type: item.type,
        date: moment(item.timeCreate).format("DD/MM/YYYY")
    }))

    let dataSourceMau = [
        {
            name: 'ten nguoi ung ho',
            amount: 'nhap so tien ung ho',
            note: 'nhap noi dung o day',
            type: 'nhan hoac trao',
        }
    ]

    // let dataSource2 = [
    //                     {
    //                         key: 1,
    //                         fullname: "Nguyễn Xuân Sơn",
    //                         money: "8.000.000 VNĐ",
    //                         content: "Ủng hộ",
    //                         date: '15/03/2023',
    //                     },
    //                     {
    //                         key: 2,
    //                         fullname: "Trịnh Hoàng",
    //                         money: "5.000.000 VNĐ",
    //                         content: "Ủng hộ bà con",
    //                         date: '15/03/2023',
    //                     },
    //                     {
    //                         key: 3,
    //                         fullname: "Nguyễn Bá Tiên",
    //                         money: "3.000.000 VNĐ",
    //                         content: "ung ho",
    //                         date: '15/03/2023',
    //                     },
    //                     {
    //                         key: 4,
    //                         fullname: "Khuất Văn Hải",
    //                         money: "2.000.000 VNĐ",
    //                         content: "Ủng hộ miền Trung",
    //                         date: '15/03/2023',
    //                     },
    //                     {
    //                         key: 5,
    //                         fullname: "Lê Mạnh Linh",
    //                         money: "10.000.000 VNĐ",
    //                         content: "Ủng hộ",
    //                         date: '15/03/2023',
    //                     },
    //                     {
    //                         key: 6,
    //                         fullname: "Lê Văn Kiên",
    //                         money: "4.000.000 VNĐ",
    //                         content: "Ủng hộ",
    //                         date: '15/03/2023',
    //                     },
    // ]

    let optionsChart1 = {
                        series: [98, 2],
                        labels: ["Đã ủng hộ", "Chưa ủng hộ"],
                        chart: {
                        type: 'donut',
                      },
                      responsive: [{
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 200
                          },
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }]
    }

    let optionsChart2 = {
                        series: [{
                            name: 'Số lượt tiếp cận',
                            data: [100, 200, 150, 400, 1000, 800, 100, 2000, 300, 40, 600, 1000]
                        }],
                        xaxis:{
                            categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
                          },
        
                          options: {
                            chart: {
                              height: 300,
                              type: 'area'
                            },
                            dataLabels: {
                              enabled: false,
                              style: {
                                colors: ['#F44336', '#E91E63', '#9C27B0']
                              }
                            },
                            stroke: {
                              curve: 'smooth'
                            },
                          },
                        
    }


    const [nameCampaign, setNameCampaign] = useState('')
    const [targetAudience, setTargetAudience] = useState('')
    const [targetCampaign, setTargetCampaign] = useState('')
    const [intro, setIntro] = useState('')
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')
    const [region, setRegion] = useState('')
    const [postId, setPostId] = useState('')
    let [provinces, setProvinces] = useState([])
    let [totalDonor, setTotalDonor] = useState(0)

    useEffect(() => {
        (async () => {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/campaign/get-by-id?campaign-id=${campaignId}`,
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                }
            }).then(res => res.data)
            
            if(res && res.organization && res.organization.id) {
                setNameCampaign(res.campaignName)
                setTargetAudience(res.targetObject)
                setTargetCampaign(res.targetAmount)
                setIntro(res.introduction)
                // setStartDay(res.startDate)
                // setEndDay(res.stopDate)
                setStartDay(moment(res.startDate).format('DD/MM/YYYY'))
                setEndDay(moment(res.stopDate).format('DD/MM/YYYY'))
                setRegion(res.region)
            }
        })() 
        ;(async () => {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/post/get-post?campaign-id=${campaignId}`,
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                }
            }).then(res => res.data)
            if(res) {
                setDataPosts(res);
            }
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:8089/charity/address/provinces',
                    headers: {
                        Authorization: `Bearer ${getTokenFromCookies()}`,
                        Token: getTokenFromCookies()
                    }
                }).then(res => res.data)
                setProvinces(res)
                
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])

    let getDataStatement = async () => {
        try {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/campaign/get-statement-campaign?campaign-id=${campaignId}`,
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                }
            }).then(res => res.data)
            if(res && res.length > 0) {
                setTotalDonor(res.length)
                setDataDonors(res)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // ;(async () => {
        //     try {
        //         let res = await axios({
        //             method: 'get',
        //             url: `http://localhost:8089/charity/campaign/get-statement-campaign?campaign-id=${campaignId}`,
        //             headers: {
        //                 Authorization: `Bearer ${getTokenFromCookies()}`,
        //                 Token: getTokenFromCookies()
        //             }
        //         }).then(res => res.data)
        //         if(res && res.length > 0) {
        //             setTotalDonor(res.length)
        //             setDataDonors(res)
        //         }
                
        //     } catch (error) {
        //         console.log(error)
        //     }
        // })()
        getDataStatement();
    }, [])

    let splitRegion = region.split(', ')
    let dataRegion = provinces.filter((item) => {
        let temp = splitRegion.filter((split) => {
            return (split === item.codeName)
        })
        return temp.length > 0;
    })

    let resultRegion = dataRegion.map(data => data.fullName).join(', ')    

    const getDataPosts = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8089/charity/post/get-post?campaign-id=${campaignId}`,
            headers: {
                Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
            }
        }).then(res => res.data)
        if(res) {
            setDataPosts(res);
        }
    }
        

    const handleOk = () => {
        setIsOpenModalCreatePost(false)
        setIsOpenModalEditPost(false)           
    }
        
    const handleCancel = () => {
        setIsOpenModalCreatePost(false)
        setIsOpenModalEditPost(false) 
    }
        
    const handleActions = (record, type) => {
        if(type === 'edit') {
            setIsOpenModalEditPost(true);
            setPostId(record.postId)
        }
    }

    const handleChangeImport = (e) => {
        // console.log(e.target.file[0])
        // console.log(e.target.files[0])
        // return;
        if(e.target.files[0]) {
            Papa.parse(e.target.files[0], {
                header: true,
                complete: async (results) => {
                    console.log(results)
                    if(results.data.length > 0) {
                        let data = results.data.filter((item) => {
                            if(item.name && item.amount && item.note && item.type) return item
                        })
                        if(data.length > 0) {
                            let res = await axios({
                                method: 'post',
                                url: `http://localhost:8089/charity/campaign/add-statement-campaign?campaign-id=${campaignId}`,
                                headers: {
                                    Authorization: `Bearer ${getTokenFromCookies()}`,
                                    Token: getTokenFromCookies()
                                },
                                data: data 
                            })
                            if(res.status === 200) {
                                await getDataStatement()
                                toast.success('Import file thành công!')
                            }
                            else {
                                toast.error('Import file thất bại')
                            }
                        }
                        else {
                            toast.error('Import file không đúng định dạng!')
                        }

                    }                
                    else {
                        toast.error('Import file không đúng định dạng!')
                    }
                }
            });
        }

    }

    return(
        <>
                <PageLayout>
                    <div className="campaign-preview-container">
                        <div className="navigation-bar" style={{marginTop: 10}}>
                            <div className="n-b-left">
                                <Link to={"/campaign-list"} className="n-b-l-back">
                                    <ArrowLeftIcon fontSize={24} color={"black"} style={{cursor: 'pointer'}} />
                                </Link>
                                <div style={{fontSize: 24, fontWeight: '600'}}>{nameCampaign}</div>
                            </div>
                            <div className="n-b-right">
                                <Button style={{pointerEvents: 'none'}} disabled>Xem chi tiết</Button>
                            </div>
                        </div>
                        <SegmentedApp 
                            className="segmented-preview"
                            style={{boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"}}
                            options={options}
                            value={valueOption}
                            onChange={(valueOption) => setValueOption(valueOption)}
                        />
                        {
                            valueOption === 1 &&
                            <>
                                <div className="c-p-c-content" style={{boxShadow:"rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"}}>
                                    {/* <button className="btn-preview-edit">Chỉnh sửa</button> */}
                                    <div className="content-info">
                                        <div className="form-group">
                                            <div className='description-name'>Tên cuộc vận động:</div>
                                            <div className='description-info'>{nameCampaign}</div>
                                        </div>
                                        <div className="form-group">
                                            <div className='description-name'>Giới thiệu:</div>
                                            <div className='description-info' dangerouslySetInnerHTML={{__html: intro}}>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className='description-name'>Đối tượng hướng tới:</div>
                                            <div className='description-info'>{targetAudience}</div>
                                        </div>
                                        <div className="form-group">
                                            <div className='description-name'>Thời gian bắt đầu:</div>
                                            <div className='description-info'>{startDay}</div>
                                        </div>
                                        <div className="form-group">
                                            <div className='description-name'>Thời gian kết thúc:</div>
                                            <div className='description-info'>{endDay}</div>
                                        </div>
                                        <div className="form-group">
                                            <div className='description-name'>Khu vực kêu gọi:</div>
                                            {/* <div className='description-info'>{dataRegion[0]?.fullName}</div> */}
                                            <div className='description-info'>{resultRegion}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            valueOption === 2 &&
                            <div className="activity-container" style={{boxShadow:"rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"}}>
                                <div className="header-title" style={{paddingBottom: 20}}>
                                    <div className="h-t-name">Danh sách các bài viết</div>
                                    <button 
                                        className=" btn-primary"                                      
                                        onClick={() => setIsOpenModalCreatePost(true)}
                                    >Thêm bài viết mới</button>
                                </div>
                                <Divider />
                                <TableApp columns={columns} dataSource={dataSource}>

                                </TableApp>
                                {
                                    isOpenModalCreatePost ? (
                                        <ModalCreatePost
                                            isOpenModalCreatePost={isOpenModalCreatePost}
                                            handleOk={handleOk}
                                            handleCancel={handleCancel}
                                            // dataPosts={dataPosts}
                                            postId={postId}
                                            getDataPosts={getDataPosts}
                                        />
                                    ) : ''
                                }
                                {
                                    isOpenModalEditPost ? (
                                        <ModalEditPost
                                            isOpenModalEditPost={isOpenModalEditPost}
                                            handleOk={handleOk}
                                            handleCancel={handleCancel}
                                            // dataPosts={dataPosts}
                                            postId={postId}
                                            getDataPosts={getDataPosts}
                                        />
                                    ) : ''
                                }
                            </div>
                        }
                        {
                            valueOption === 3 &&
                            <div className="statement-container" style={{boxShadow:"rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"}}>
                                <div className="s-c-down" style={{position: 'relative'}}>
                                    <div className="s-c-up"
                                        style={{position: 'absolute', right: 20, top: '-40px'}}
                                    >
                                        <div className="total-donor" style={{fontSize: 16}}>Tổng số người ủng hộ: <span style={{color: 'var(--color-blue)', fontSize: 16}}>{totalDonor}</span></div>
                                        
                                    </div>

                                    <div className="statement-table">
                                        <div className="header-title" style={{paddingBottom: 20}}>
                                            <Row className="h-t-name flex-col-center" justify='space-between'>
                                                <Col>
                                                    <Row>
                                                        <span style={{fontSize: 18, fontWeight: '600'}}>Danh sách sao kê</span>
                                                        <Tag
                                                            title={(
                                                                <span style={{color: 'var(--color-blue)', lineHeight: '23px'}}  >
                                                                    <CSVLink className="color-blue-app" data={dataSourceMau} filename={'new-file-data.csv'} target="_blank">
                                                                        Tải xuống file mẫu
                                                                    </CSVLink>
                                                                    <DownloadOutlined style={{fontSize: 16, fontWeight: '700', marginLeft: 5}} />
                                                                </span>
                                                            )}
                                                            className='app-hover'
                                                            background="#44b3cf1f"
                                                            style={{
                                                                fontSize: 14,
                                                                marginLeft: 12
                                                            }}
                                                        >
                                                        </Tag>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                
                                                </Col>
                                            </Row>
                                            <div className="btn-actions">
                                                
                                                <label htmlFor="custom-file-input" className="btn-primary" >Import</label>
                                                <input className="custom-file-input" id="custom-file-input" type="file" onChange={(e) => handleChangeImport(e)} />                                                         
                                                <CSVLink className="btn-action-export btn-primary" data={dataSource2} filename={'my-file.csv'} target="_blank">
                                                    Export
                                                </CSVLink>
                                            </div>
                                        </div>
                                        <Divider />
                                        <TableApp columns={columns2} dataSource={dataSource2}>

                                        </TableApp>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* {
                            valueOption === 4 &&
                            <div className="statistical-container">
                                <div className="statistical-up">
                                    <div className="s-t-left">
                                        <div className="s-t-l-title">Tiến độ hoàn thành</div>
                                        <Divider />
                                        <div className="s-t-l-body">
                                            <Chart options={optionsChart1} type="donut" series={optionsChart1.series} width={'100%'} height={120} />
                                        </div>
                                            <div className="thong-ke">
                                                <div>Trạng thái: <span style={{fontWeight: '600'}}>Hoạt động</span></div>
                                                <div>Mục tiêu: <span style={{fontWeight: '600'}}>500.000.000 triệu</span></div>
                                                <div>Đã ủng hộ: <span style={{fontWeight: '600'}}>490.000.000 triệu</span></div>
                                            </div>
                                    </div>
                                    <div className="s-t-right">
                                        <div className="s-t-r-title">Thống kê số lượt tiếp cận</div>
                                        <Divider />
                                        <Chart options={optionsChart2} type="area" series={optionsChart2.series} width={'100%'} height={220} />                                      
                                    </div>
                                </div>
                                <div className="statistical-down">
                                    <div className="s-t-r-title">Thống kê ủng hộ</div>
                                    <Divider />  
                                    <Chart options={optionsChart2} type="area" series={optionsChart2.series} width={'100%'} height={250} />                                                                         
                                </div>
                            </div>
                        } */}
                        
                    </div>
                </PageLayout>
        </>
    )
}

export default CamPaignPreview;