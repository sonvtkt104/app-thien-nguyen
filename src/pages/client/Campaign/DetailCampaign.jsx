import {
  CheckCircleTwoTone,
  CommentOutlined,
  HeartOutlined,
  HeartTwoTone,
  ShareAltOutlined,
  SmileTwoTone,
  StarOutlined,
  GlobalOutlined,
  NotificationOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  UpOutlined,
  TeamOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Col, Input, Progress, Row, Space, Modal } from "antd";
import {Input as InputApp, TableApp, Tag, TickIcon} from '../../../components'
import { useState } from "react";
import {
  FooterClient,
  HeaderClient,
} from "../../../components";
import './DetailCampaign.scss';
import { useEffect } from "react";
import { useRef } from "react";
import campaignService from "../../app/CampaignList/CampaignService";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
import moment from "moment";
import Search from "antd/es/input/Search";
import { CSVLink } from "react-csv";
import ReactPlayer from 'react-player';
import { useSelector } from "react-redux";
import { setUserFollowCampaign, setUserUnFollowCampaign } from "../../../api/campaigns";

function DetailCampaign() {

  const [tab, setTab] = useState(0);
  const [valueSearch, setValueSearch] = useState()

  const navigate = useNavigate()
  const { infoUser, userType } = useSelector(state => state?.app) 

  // const { Search } = Input;

  const {campaignId} = useParams();
  
  const [nameCampaign, setNameCampaign] = useState('')
  const [nameOrganization, setNameOrganization] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetObject, setTargetObject] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [region, setRegion] = useState('')
  const [follow, setFollow] = useState(0)
  const [stkBank, setStkBank] = useState('')
  const [intro, setIntro] = useState('')
  const [imageCampaign, setImageCampaign] = useState('')
  const [imagePosts, setImagePosts] = useState('')
  const [introVideo, setIntroVideo] = useState('')
  const [imageOriganization, setImageOriganization] = useState('')
  const [charityIsVerified, setCharityIsVerified] = useState(0)
  const [followCampaign, setFollowCampaign] = useState(false)
  const [statusCampaign, setStatusCampaign] = useState("Đang vận động")
  const [charityId, setCharityId] = useState();
  const [stopDateCampaign, setStopDateCampaign] = useState()

  let [provinces, setProvinces] = useState([])
  let [dataPosts, setDataPosts] = useState([])
  
  let [dataDonation, setDataDonation] = useState([])
  let [dataDonationSearch, setDataDonationSearch] = useState([])

  let dataSourceMau = [
    {
        name: 'ten nguoi ung ho',
        money: 'nhap so tien ung ho',
        content: 'nhap noi dung o day',
        type: 'nhan hoac trao',
    }
  ]

  // useEffect(() => {
  //   if(stopDateCampaign) {
  //     let stop = new Date(stopDateCampaign).getTime()
  //     let current = new Date().getTime()
  //     if(stop < current) {
  //       setStatusCampaign("Kết thúc")
  //     } else {
  //       setStatusCampaign("Đang vận động")
  //     }
  //   }
  // }, [stopDateCampaign, setStatusCampaign])

  // Modal thông tin ủng hộ
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "name",
      title: "Tên người ủng hộ",
      dataIndex: "name",
    },
    {
      key: "amount",
      title: "Số tiền ủng hộ",
      dataIndex: "amount",
    },
    {
      key: "note",
      title: "Ghi chú",
      dataIndex: "note",
    },
    {
      key: "date",
      title: "Thời gian",
      dataIndex: "date",
    },
  ];

  // const handleOnSearch = () => {
  //   console.log(valueSearch)
  // };

  const btnBackToTop = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let btn = btnBackToTop.current;
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        if(btn) {
          btn.style.display = "flex";
        }
      } else {
        if(btn) {
          btn.style.display = "none";
        }
      }
    })

    ;(async () => {
      try {
        let res = await axios({
          method: 'get',
          url: `http://localhost:8089/charity/campaign/get-by-id?campaign-id=${campaignId}`,
          headers: {
            Authorization: '',
            Token: ''
          }
        }).then(res => res.data)
        console.log(res[0])
        setNameCampaign(res[0].campaignName)
        setNameOrganization(res[0].organization.charityName)
        setCharityIsVerified(res[0].organization.isVerified)
        setCharityId(res[0].organization.id)
        setFollowCampaign(res[0]?.follow)
        setStatusCampaign(res[0]?.status)
        setStopDateCampaign(res[0]?.stopDate)
        setTargetObject(res[0].targetObject)
        setTargetAmount(res[0].targetAmount)
        setReceiveAmount(res[0].receiveAmount)
        setRegion(res[0].region)
        setStkBank(res[0].organization.charityAccountNumber)
        setImageOriganization(res[0].organization.avatar)
        setIntro(res[0].introduction)
        setIntroVideo(res[0].introVideo)
        // console.log(res[0].images)
        let arr = res[0].images ? res[0].images.split(', ').map(image => ({url: image})) : null; 
        // console.log(arr)
        setImageCampaign(arr)
        // if(res && res.organization && res.organization.id) {
        // }
      } catch (err) {
        console.log(err)
      }
    })()

    ;(async () => {
      try {
          let res = await axios({
              method: 'get',
              url: 'http://localhost:8089/charity/address/provinces',
              headers: {
                  Authorization: '',
                  Token: ''
              }
          }).then(res => res.data)
          setProvinces(res)
          
      } catch (error) {
          console.log(error)
      }

  })()

  }, [])

  let [totalDonor, setTotalDonor] = useState(0)
  useEffect(() => {
    ;(async () => {
        try {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/campaign/get-statement-campaign?campaign-id=${campaignId}`,
                headers: {
                    Authorization: '',
                    Token: ''
                }
            }).then(res => res.data)
            if(res && res.length > 0) {
                setTotalDonor(res.length)
            }
            
        } catch (error) {
            console.log(error)
        }
    })()
    ;(async () => {
        try {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/campaign/campaign-get-follower?campaign-id=${campaignId}`,
                headers: {
                    Authorization: '',
                    Token: ''
                }
            }).then(res => res.data)
            if(res.length > 0) {
              setFollow(res.length)
            }            
        } catch (error) {
            console.log(error)
        }
    })()
  }, [])

  useEffect(() => {

    ;(async () => {
        try {
            let res = await axios({
                method: 'get',
                url: `http://localhost:8089/charity/campaign/get-statement-campaign?campaign-id=${campaignId}`,
                headers: {
                    Authorization: '',
                    Token: ''
                }
            }).then(res => res.data)
            if(res && res.length > 0) {
                let data = res.map((item, index) => ({
                  key: index,
                  name: item.name,
                  amount: item.amount,
                  note: item.note,
                  date: moment(item.timeCreate).format("DD/MM/YYYY"),
                  user_id: item.id,
                  type: item.type
                }))
                setDataDonation(data)
                setDataDonationSearch(data)
            }
            
        } catch (error) {
            console.log(error)
        }
    })()

    ;(async () => {
      try {
          let res = await axios({
              method: 'get',
              url: `http://localhost:8089/charity/post/get-post?campaign-id=${campaignId}`,
              headers: {
                  Authorization: '',
                  Token: ''
              }
          }).then(res => res.data)
          console.log(res)
          if(res && res.length > 0) {
            setDataPosts(res)
            let arr = res[0].images ? res[0].images.split(', ').map(image => ({url: image})) : null; 
            // console.log(arr)
            setImagePosts(arr) 
          }
          
      } catch (error) {
          console.log(error)
      }
  })()
  }, [])

  let splitRegion = region.split(', ')
  let dataRegion = provinces.filter((item) => {
        let temp = splitRegion.filter((split) => {
            return (split === item.codeName)
        })
        return temp.length > 0;
  })

  let resultRegion = dataRegion.map(data => data.fullName).join(', ')

  const globalSearch = (value) => {
    const filteredData = dataDonation.filter((data) => {
        return (
            data.name.toLowerCase().includes(value.toLowerCase())
        )
    })
    setDataDonationSearch(filteredData)
}


  return (
    <div className="main">
      <HeaderClient />
      <Row justify='center'
          style={{
              background :'var(--color-background)',
              minHeight: 'calc(100vh - 90px)'
          }}
      > 
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          <div className='wrapper'>
            
            <Row 
              style={{marginTop: 20, background: "#ffffff", borderRadius :6, flexWrap :'nowrap'}}
            >
                <Col
                  style={{borderRadius: 6,width: 450, position: 'relative'}}
                >
                  <img src={imageCampaign && imageCampaign.length > 0 ? imageCampaign[0].url : "https://givenow.vn/wp-content/uploads/2023/03/Cover-2-800x600.png"} alt="a" 
                    style={{
                      width: 450,
                      height: 350,
                      objectFit: 'cover',
                      borderRadius: '6px 0 0 6px'
                    }}
                  />
                  <span
                    style={{position: 'absolute', top: 20, left: 10, opacity: '0.9'}}
                  >
                    <Tag 
                      title={targetObject}
                      color="#FFFFFF"
                      background="var(--color-blue)"
                      style={{fontSize: 14, fontWeight: '600', padding: 10}}
                    />
                  </span>
                </Col>
                <Col
                  style={{
                    padding: '20px 30px',
                    width: 'calc(100% - 450px)',
                    position: 'relative'
                  }}
                >
                  {/* <span
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 28,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      if(userType == 'normal_user') { // follow or un follow
                        if(followCampaign) { // click to un follow
                          setUserUnFollowCampaign(campaignId).then(res => {
                              setFollowCampaign(false)
                              if(follow > 0) {
                                setFollow(pre => pre - 1)
                              }
                          }) 
                        } else { // click to follow
                          setUserFollowCampaign(campaignId).then(res => {
                              setFollowCampaign(true)
                              setFollow(pre => pre + 1)
                          }) 
                        }
                      } else { // login
                          navigate("/login")
                      }
                    }}
                  >
                    {
                      followCampaign ? (
                        <HeartFilled style={{fontSize: 20, fontWeight: '600', color: 'var(--color-red)'}} />
                      ) : (
                        <HeartOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)',}} />
                      )
                    }
                  </span> */}
                  <div 
                    className="h1-app"
                    style={{fontSize: 20, paddingRight: 30}}
                  >
                    {/* Chung tay chăm sóc sức khỏe cho 200 trẻ nhập cư tại Trường tình thương Ái Linh */}
                    {nameCampaign}
                  </div>
                  <Row
                    style={{lineHeight: '60px', fontWeight: '600', fontSize: 16, marginTop: 10}}
                  >
                    <img src={imageOriganization ? imageOriganization : "https://givenow.vn/wp-content/uploads/2023/02/NhaCuaVui-scaled.jpeg"} alt="campaign" 
                      style={{width: 60, height: 60, borderRadius: '50%', marginRight: 12, cursor: 'pointer'}}
                      onClick={() => {
                        if(charityId) {
                          navigate("/profile-charity/" + charityId)
                        }
                      }}
                    />
                    {/* Xuan Son */}
                    {nameOrganization}
                    {
                      charityIsVerified == 2 ? (
                        <div
                          style={{marginLeft: 12}}
                        >
                          <TickIcon />
                        </div>
                      ) : ""
                    }
                  </Row>
                  <Row justify='space-between'
                    style={{marginTop: 15}}
                  >
                    <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-gray)'}}>
                      Mục tiêu cuộc vận động
                    </span>
                    <span style={{fontSize: 18, fontWeight: '600', color: '#666d7a'}}>
                      {/* 50.000.000đ */}
                      {`${new Intl.NumberFormat('vi-VI').format(targetAmount)} VNĐ`}
                    </span>
                  </Row>  
                  <Row
                    style={{margin: '10px 0'}}
                  >
                    <Progress strokeColor={'#6DCCE3'} percent={receiveAmount/targetAmount * 100} showInfo={false} />
                  </Row>
                  <Row justify='space-between' align={'center'}
                    
                  >
                    <Col>
                      <span style={{marginRight: 4, }}>
                        <TeamOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)',}} />
                      </span>
                      <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-gray)'}}>
                        {`${totalDonor} lượt ủng hộ`}
                      </span>

                      <span style={{marginRight: 4, marginLeft: 12, }}>
                        <HeartOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)',}} />
                      </span>
                      <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-gray)'}}>
                        {/* 10 lượt yêu thích */}
                        {`${follow} lượt yêu thích`}
                      </span>

                    </Col>
                    
                    <Col>
                        <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-gray)'}}>
                          Đã nhận được : {"  "}
                        </span>
                        <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-blue)'}}>
                          {/* 22.000.000đ */}
                          {`${new Intl.NumberFormat('vi-VI').format(receiveAmount)} VNĐ`}
                        </span>
                      </Col>
                    
                  </Row> 
                  <Row
                    justify='center'
                    style={{marginTop: 20}}
                  >
                    {/* <button
                      className="btn"
                      style={{fontSize: 16, fontWeight: '600', background: "#ffffff", marginRight: 20}}
                    >
                      Chia sẻ
                    </button> */}
                    {
                      statusCampaign == 'Đang vận động' ? (
                        <button
                          className="btn-primary"
                          style={{fontSize: 16, fontWeight: '600'}}
                          onClick={() => setIsModalOpen(true)}
                        >
                          Ủng hộ ngay
                        </button>
                      ) : (
                        <span style={{
                          padding: "10px 20px",
                          background: "var(--color-background)",
                          borderRadius: "12px",
                          marginTop: "10px",
                        }}>
                          <Row>
                            <img src="https://givenow.vn/wp-content/themes/funlin-progression-child/images/icons/hoanthanh.svg" alt="icon" />
                            <span style={{lineHeight :'32px', marginLeft: 10, color: 'var(--color-blue)'}} className="h3-app">
                              Cuộc vận động kết thúc
                            </span>
                          </Row>
                        </span>
                      )
                    }
                  </Row>
                  {/* <header className="header">
                      <div className="header-body">
                          <div className="header-1">
                            <div style={{ fontSize: 24, fontWeight: "600", marginBottom: 7 }}>
                              Quyên góp miền Trung
                            </div>
                            <button className="btn-follow">Theo dõi</button>
                          </div>
                          <div className="header-2">
                            <Space>
                              <Button type="primary" style={{ fontWeight: 600 }}>
                                Ủng hộ ngay
                              </Button>
                              <Button
                                type="primary"
                                style={{ backgroundColor: "#43DA86", fontWeight: 600 }}
                              >
                                Chia sẻ
                              </Button>
                            </Space>
                          </div>
                      </div>
                      <span>
                              <GlobalOutlined style={{ color: "var(--color-gray)" }} />
                              <span style={{ marginLeft: 5, color: "var(--color-gray)" }}>
                                http://www.thiennguyen.com/
                              </span>
                      </span>           
                  </header> */}
                </Col>
            </Row>

            <div className='tab'
              style={{ background: 'transparent'}}
            >
              <Row >
                  <Col 
                    style={{
                      padding: '25px 30px 15px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid trans',
                      color: tab == 0 ? "var(--color-blue)" : "var(--color-gray)"
                    }}
                    className={tab == 0 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                    onClick={() => setTab(0)}
                  >
                    Giới thiệu
                  </Col>
                  <Col 
                    style={{
                      padding: '25px 30px 15px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid trans',
                      color: tab == 1 ? "var(--color-blue)" : "var(--color-gray)"
                    }}
                    className={tab == 1 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                    onClick={() => setTab(1)}
                  >
                    Hoạt động
                  </Col>
                  <Col 
                    style={{
                      padding: '25px 30px 15px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid trans',
                      color: tab == 2 ? "var(--color-blue)" : "var(--color-gray)"
                    }}
                    className={tab == 2 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                    onClick={() => setTab(2)}
                  >
                    Thống kê
                  </Col>
              </Row>
            </div>
              
          </div>

          {
            tab == 0 || tab == 2 ? (
              <div className="container">
                {
                  tab === 0 && 
                  <div className="detail-campaign-intro">
                      <div className="class-common">Đơn vị tổ chức kêu gọi:</div>
                                          <div>
                                                <Space align={"center"}>
                                                  <span style={{ fontSize: 18, fontWeight: 600}}> {nameOrganization}</span>
                                                  {/* <CheckCircleTwoTone
                                                    style={{ fontWeight: 600, fontSize: "20px" }}
                                                    twoToneColor="#52c41a"
                                                  /> */}
                                                  {
                                                    charityIsVerified == 2 ? (
                                                      <TickIcon />
                                                    ) : ''
                                                  }
                                                </Space>
                                          </div>
                                        <div className="class-common">Giới thiệu về cuộc vận động:</div>
                                        <div
                                          dangerouslySetInnerHTML={{__html: intro}}
                                        />
                                        <div className="class-common">Đối tượng hướng tới: </div>
                                        <div>{targetObject}</div>
                                        <div className="class-common">Khu vực kêu gọi:</div>
                                        <div>{resultRegion}</div>
                                        <div className="class-common">Video & Ảnh mô tả:</div>
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                                          {
                                              ReactPlayer.canPlay(introVideo) ?
                                                  <ReactPlayer 
                                                      url={introVideo}
                                                      style={{ width: '100%', display: 'flex', justifyContent: 'center'}}
                                                      width='60%'
                                                      height="350px"
                                                  /> : ''
                                          }
                                        </div>
                                        {/* {
                                          introVideo && (
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                              <iframe width="60%" height="315" src={introVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                            </div>
                                          )
                                        } */}
                                        
                                        <div className="img-info" style={{marginTop: 24}}>
                                          {
                                            imageCampaign && imageCampaign.length > 0 &&
                                            imageCampaign.map((img, index) => (
                                              <img src={img.url} alt="bla bla" key={index} className="custom-img"></img>
                                            ))
                                          }
                                            {/* <img src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                            <img src="/images/mien-trung-2.jpg" alt="bla bla"></img>
                                            <img src="/images/mien-trung-2.jpg" alt="bla bla"></img> */}
                                        </div>
                                      
                                        <div style={{margin: '16px auto', display: 'flex', justifyContent: 'center'}}>
                                          {
                                            statusCampaign == 'Đang vận động' ? (
                                            <button
                                              className="btn-primary"
                                              style={{fontSize: 16, fontWeight: '600'}}
                                              onClick={() => setIsModalOpen(true)}
                                            >
                                              Ủng hộ ngay
                                            </button>
                                            ) : (
                                              <span style={{
                                                padding: "10px 20px",
                                                background: "var(--color-background)",
                                                borderRadius: "12px",
                                                marginTop: "10px",
                                              }}>
                                                <Row>
                                                  <img src="https://givenow.vn/wp-content/themes/funlin-progression-child/images/icons/hoanthanh.svg" alt="icon" />
                                                  <span style={{lineHeight :'32px', marginLeft: 10, color: 'var(--color-blue)'}} className="h3-app">
                                                    Cuộc vận động kết thúc
                                                  </span>
                                                </Row>
                                              </span>
                                            )
                                          }
                                        </div>
                                        
                  </div>          
                }
                
                {
                  tab === 2 && 
                  <div className="detail-campaign-statement">
                  <Row justify={"end"}>
                      <Space>
                          {/* <InputApp
                            placeholder="Nhập tên người dùng"
                            type="search"
                            onSearch={() => {
                              handleOnSearch()
                            }}
                            value={valueSearch}
                            onChange={(e) => {
                              setValueSearch(e.target.value)
                            }}
                            // onSearch={(value) => globalSearch(value)}
                            style={{
                              minWidth: 300
                            }}
                          /> */}
                          <Search
                            placeholder="Tìm kiếm người ủng hộ"
                            allowClear
                            style={{
                                width: 300,
                            }}
                            onSearch={(value) => {
                                globalSearch(value)
                            }} 
                            onChange={(e) => {
                                globalSearch(e.target.value)
                            }}
                          />
                          <CSVLink className="btn-primary" data={dataSourceMau} filename={'file-donation.csv'} target="_blank">
                              Tải xuống
                          </CSVLink>
                      </Space>
                  </Row>
                  <br />
                  <div className="table-donation-client">
                    <TableApp 
                      columns={columns}
                      dataSource={dataDonationSearch}
                    />
                  </div>
                    
                  </div>
                }

              </div>
            ) : (
              <div className="list-detail-campaign-activity">
                {
                  dataPosts && dataPosts.length > 0 ? <>
                    {
                      dataPosts.map((item, i) => (
                        <div 
                          key={i}
                          className="detail-campaign-activity"
                          style={{
                            borderRadius: 6,
                            background :'#ffffff', 
                            marginTop :20,
                            marginBottom : 30,
                            padding: "24px 30px"
                          }}
                        >
                            <div>
                                <div style={{fontSize: 20, fontWeight: 600}}>{item.title}</div>
                                <div>Thời gian đăng: <span style={{fontWeight: 600}}>{moment(item.submitTime).format('DD/MM/YYYY')}</span></div>
                                {/* <div>Kiểu bài đăng: <span style={{fontWeight: 600}}>{item.type}</span></div> */}
                            </div>
                            <br />
                            {/* <div style={{fontSize: 18, fontWeight: 600}}>Mô tả - Giới thiệu:</div> */}
                            <div
                              dangerouslySetInnerHTML={{__html: item.content}}
                            />
                            <br />
                            <div className="list-images">
                                  {
                                    item.images && item.images.length > 0 &&
                                    item.images.split(', ').map((img, index) => (
                                    <img src={img} alt="bla bla" key={index} className="detail-campaign-img"></img>
                                    ))
                                  }
                            </div>
                        </div>
                      ))
                    }
                  </> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24}}>Cuộc vận động này chưa có bài viết.</div>
                }
              </div>
            )
          }
        </Col>
      </Row>
      
      <div style={{margin: '12px 0', padding: '0 24px', display: 'flex', justifyContent: 'flex-end'}}>
        <div className="btn-up" ref={btnBackToTop} onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}>
          <UpOutlined style={{fontSize: 24, fontWeight: 600, color: '#fff'}} />
        </div>
      </div>

      {
        isModalOpen && (
          <Modal 
            centered
            okText={'Đồng ý'}
            cancelText={'Hủy bỏ'}
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            className="modal-app"
            footer={null}
            // width={800}
          >
            <div>
              {/* <div className="h2-app" style={{color: 'var(--color-blue)'}}>Thông tin ủng hộ của tổ chức</div> */}
              <div>
                <div style={{textAlign: 'center'}}>
                  <img src={imageOriganization} alt="avatar" 
                    style={{width: 70, height: 70, borderRadius:'50%', margin: 'auto'}}
                  />
                </div>
                <div style={{fontSize: 16, fontWeight: "600", textAlign: 'center'}}>
                  {nameOrganization} 
                  {
                    charityIsVerified == 2? (
                      <span
                        style={{marginLeft: 12}}
                      >
                        <TickIcon />
                      </span>
                    ) : ""
                  }
                </div>
                <Row style={{ textAlign: 'center', margin: '10px 0'}} justify='center'>
                  <Col span={16}>
                    <span>
                      Hãy cùng ủng hộ vào cuộc vận động <span style={{color: 'var(--color-blue)', fontWeight: '600'}}>{nameCampaign}</span> ngay nào
                    </span>
                  </Col>
                </Row>
                <Row style={{ textAlign: 'center', margin: '10px 0'}} justify='center'>
                  <span style={{whiteSpace: 'nowrap',padding: "10px 20px",
                          background: "var(--color-background)",
                          borderRadius: "12px",
                          marginTop: "10px",
                          fontWeight: "600"
                        }}>
                    {stkBank}
                  </span>
                </Row>
                <Row
                    justify='center'
                    style={{margin: 20}}
                >
                    <span>
                      <Row style={{fontSize: 12, fontWeight: 600, lineHeight: '20px', cursor: 'pointer'}}
                        onClick={() => {
                            navigate("/")
                        }} 
                      >
                        <img src="/images/logo-app.png" alt="logo app"
                            style={{width: 20, marginRight: 4}}
                        />
                        Thiện Nguyện
                      </Row>
                    </span>
                </Row>
              </div>
            </div>
          </Modal>
        )
      }

      
      <FooterClient />

    </div>
  );
}

export default DetailCampaign;
