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
import { useParams } from "react-router-dom";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
import moment from "moment";
import Search from "antd/es/input/Search";
import { CSVLink } from "react-csv";

function DetailCampaign() {

  const [tab, setTab] = useState(0);
  const [valueSearch, setValueSearch] = useState()

  // const { Search } = Input;

  const {organizationId, campaignId} = useParams();

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
  const [introVideo, setIntroVideo] = useState('')
  const [imageOriganization, setImageOriganization] = useState('')

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
            Authorization: `Bearer ${getTokenFromCookies()}`,
            Token: getTokenFromCookies()
          }
        }).then(res => res.data)
        console.log(res)
        if(res && res.organization && res.organization.id) {
          setNameCampaign(res.campaignName)
          setNameOrganization(res.organization.charityName)
          setTargetObject(res.targetObject)
          setTargetAmount(res.targetAmount)
          setReceiveAmount(res.receiveAmount)
          setRegion(res.region)
          setStkBank(res.organization.charityAccountNumber)
          setImageOriganization(res.organization.avatar)
          setIntro(res.introduction)
          setIntroVideo(res.introVideo)
          // console.log(res.images)
          let arr = res.images ? res.images.split(', ').map(image => ({url: image})) : null; 
          // console.log(arr)
          setImageCampaign(arr)
        }
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

  let [totalDonor, setTotalDonor] = useState(0)
  useEffect(() => {
    ;(async () => {
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
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
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
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
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
                  Authorization: `Bearer ${getTokenFromCookies()}`,
                  Token: getTokenFromCookies()
              }
          }).then(res => res.data)
          // console.log(res)
          if(res && res.length > 0) {
            setDataPosts(res)
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
                  <span
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 28,
                      cursor: 'pointer'
                    }}
                  >
                    <HeartOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)', color: 'var(--color-gray)', transform: 'translateY(-3px)'}} />
                  </span>
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
                    <img src={imageOriganization ? imageOriganization : "https://givenow.vn/wp-content/uploads/2023/02/NhaCuaVui-scaled.jpeg"} alt="image campaign" 
                      style={{width: 60, height: 60, borderRadius: '50%', marginRight: 12}}
                    />
                    {/* Xuan Son */}
                    {nameOrganization}
                    <div
                      style={{marginLeft: 12}}
                    >
                      <TickIcon />
                    </div>
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
                        <TeamOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)', transform: 'translateY(-3px)'}} />
                      </span>
                      <span style={{fontSize: 16, fontWeight: '600', color: 'var(--color-gray)'}}>
                        {`${totalDonor} lượt ủng hộ`}
                      </span>

                      <span style={{marginRight: 4, marginLeft: 12, }}>
                        <HeartOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)', color: 'var(--color-gray)', transform: 'translateY(-3px)'}} />
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
                    <button
                      className="btn-primary"
                      style={{fontSize: 16, fontWeight: '600'}}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Ủng hộ ngay
                    </button>
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
                                                  <TickIcon />
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
                                        {
                                          introVideo && (
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                              <iframe width="60%" height="315" src={introVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                            </div>
                                          )
                                        }
                                        
                                        <div className="img-info">
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
                                          <button
                                            className="btn-primary"
                                            style={{fontSize: 16, fontWeight: '600'}}
                                            onClick={() => setIsModalOpen(true)}
                                          >
                                            Ủng hộ ngay
                                          </button>
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
                            <div>Kiểu bài đăng: <span style={{fontWeight: 600}}>{item.type}</span></div>
                        </div>
                        <br />
                        <div style={{fontSize: 18, fontWeight: 600}}>Mô tả - Giới thiệu:</div>
                        <div
                          dangerouslySetInnerHTML={{__html: item.content}}
                        />
                        <br />
                        <Row justify="center">
                            <Space wrap>
                              {
                                imageCampaign && imageCampaign.length > 0 &&
                                imageCampaign.map((img, index) => (
                                <img src={img.url} alt="bla bla" key={index} className="detail-campaign-img"></img>
                                ))
                              }
                            </Space>
                        </Row>
                    </div>
                  ))
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
            title="Thông tin ủng hộ của tổ chức" 
            centered
            okText={'Đồng ý'}
            cancelText={'Hủy bỏ'}
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}>
            <div>Tên tổ chức: <span style={{fontSize: 16, fontWeight: 600, fontStyle: 'italic'}}>{nameOrganization}</span></div>
            <div>Tên cuộc vận động: <span style={{fontSize: 16, fontWeight: 600, fontStyle: 'italic'}}>{nameCampaign}</span></div>
            <div>Số tài khoản: <span style={{fontSize: 16, fontWeight: 600, fontStyle: 'italic'}}>{stkBank}</span></div>
          </Modal>
        )
      }

      
      <FooterClient />

    </div>
  );
}

export default DetailCampaign;
