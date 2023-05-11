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
} from "@ant-design/icons";
import { Button, Col, Input, Progress, Row, Space } from "antd";
import {Input as InputApp, TableApp} from '../../../components'
import { useState } from "react";
import {
  FooterClient,
  HeaderClient,
} from "../../../components";
import './DetailCampaign.scss';
import { useEffect } from "react";
import { useRef } from "react";
import campaignService from "../../app/CampaignList/CampaignService";

function DetailCampaign() {

  const [tab, setTab] = useState(0);
  const [valueSearch, setValueSearch] = useState()

  const { Search } = Input;

  const dataDonation = [
    {
      key: 1,
      name: 'Xuân Sơn',
      amount: '400.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    },
    {
      key: 2,
      name: 'Trịnh Hoàng',
      amount: '200.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    },
    {
      key: 3,
      name: 'Bá Tiên',
      amount: '1.000.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    },
    {
      key: 4,
      name: 'Văn Hải',
      amount: '2.300.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    },
    {
      key: 5,
      name: 'Văn Kiên',
      amount: '400.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    },
    {
      key: 6,
      name: 'Mạnh Linh',
      amount: '400.000đ',
      note: 'ủng hộ',
      date: '22/03/2023'
    }
  ];

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

  const handleOnSearch = () => {
    console.log("hi");
    console.log(valueSearch)
  };

  const btnBackToTop = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let btn = btnBackToTop.current;
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    })

    ;(async () => {
      try {
        let res = await campaignService.getAllCampaign();
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

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
            
                <header className="header">
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
                </header>

                <div className='tab'>
                  <Row style={{borderTop: '1px solid var(--color-border)'}}>
                      <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
                            className={tab == 0 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                            onClick={() => setTab(0)}
                      >
                        Giới thiệu
                      </Col>
                      <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
                            className={tab == 1 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                            onClick={() => setTab(1)}
                      >
                        Hoạt động
                      </Col>
                      <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
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
                                                  <span style={{ fontSize: "16px", fontWeight: 600}}> Tổ chức thiện nguyện A</span>
                                                  <CheckCircleTwoTone
                                                    style={{ fontWeight: 600, fontSize: "20px" }}
                                                    twoToneColor="#52c41a"
                                                  />
                                                </Space>
                                          </div>
                                        <div className="class-common">Chi tiết về cuộc vận động:</div>
                                        <div>
                                        Để kịp thời chia sẻ với những khó khăn, thiệt hại to lớn của đồng bào và các địa phương bị thiệt hại do mưa lũ gây ra, và hưởng ứng lời kêu gọi của Chính phủ và Bộ Tài chính, Công đoàn Bộ cũng đã phát động toàn thể cán bộ, công chức, viên chức, người lao động ở các đơn vị thuộc và trực thuộc Bộ Tài chính tham gia ủng hộ đồng bào các tỉnh miền Trung bị thiệt hại do bão lũ tối thiểu 01 ngày lương.
                                        </div>
                                        <div className="class-common">Đối tượng vận động: </div>
                                        <div>Toàn bộ người dân trong nước</div>
                                        <div className="class-common">Địa chỉ vận động:</div>
                                        <div>Nhân dân miền Trung</div>
                                        <div className="class-common">Video & Ảnh mô tả:</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                          <iframe width="60%" height="315" src="https://www.youtube.com/embed/im08YRl3df4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                        <div className="img-info">
                                            <img src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                            <img src="/images/mien-trung-2.jpg" alt="bla bla"></img>
                                            <img src="/images/mien-trung-2.jpg" alt="bla bla"></img>
                                        </div>
                                        <div className="class-common">Quá trình quyên góp:</div>
                                        <div className="detail-campaign-block">
                      <Row justify={"space-between"}>
                        <div>
                          <SmileTwoTone /> 400 Người đã ủng hộ{" "}
                          <span style={{ marginLeft: "24px" }}>
                            <HeartTwoTone twoToneColor="#eb2f96" /> 99
                          </span>
                        </div>
                        <div>
                          <StarOutlined style={{ color: "green" }} /> 0 Nhận xét
                        </div>
                      </Row>
                      <div style={{ margin: "20px 0" }}></div>
                      <Row justify={"space-between"}>
                        <div>150.000.000 đ Đã ủng hộ</div>
                        <div>200.000.000 đ Mục tiêu</div>
                      </Row>
                      <div style={{ margin: "0 0 4px 0" }}></div>
                      <Row>
                        <Progress percent={75} status="active" />
                      </Row>
                      <div style={{ margin: "4px 0" }}></div>
                      <Row justify={"space-between"}>
                        <div>5 ngày còn lại</div>
                        <div>75% Thành công</div>
                      </Row>
                      <div style={{ margin: "12px 0" }}></div>
                      <Row>
                        <div style={{ fontWeight: 600 }}>
                          Dự án còn 5 ngày nữa sẽ kết thúc.
                        </div>
                      </Row>
                                        </div>
                                        <div style={{margin: '16px auto', display: 'flex', justifyContent: 'center'}}>
                                          <Button size="large" type="primary" style={{fontWeight: 600}}>Ủng hộ ngay</Button>
                                        </div>
                                        
                  </div>          
                }
                
                {
                  tab === 2 && 
                  <div className="detail-campaign-statement">
                  <Row justify={"end"}>
                      <Space>
                          <InputApp
                            placeholder="Nhập tên người dùng"
                            type="search"
                            onSearch={() => {
                              handleOnSearch()
                            }}
                            value={valueSearch}
                            onChange={(e) => {
                              setValueSearch(e.target.value)
                            }}
                            style={{
                              minWidth: 300
                            }}
                          />
                          <button className="btn-primary">
                              Tải xuống
                          </button>
                      </Space>
                  </Row>
                  <br />
                  <div className="table-donation-client">
                    <TableApp 
                      columns={columns}
                      dataSource={dataDonation}
                    />
                  </div>
                    {/* <table className="detail-campaign-table">
                        <tbody>
                            <tr className="detail-campaign-table">
                                <th>Họ và tên</th>
                                <th>Số tiền quyên góp</th>
                                <th>Ghi chú</th>
                                <th>Thời gian</th>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Sơn</td>
                                <td>500.000đ</td>
                                <td>kcj</td>
                                <td>22/03/2023</td>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Hoàng</td>
                                <td>500.000đ</td>
                                <td>ủng hộ</td>
                                <td>22/03/2023</td>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Tiên</td>
                                <td>300.000đ</td>
                                <td>pro vjp</td>
                                <td>22/03/2023</td>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Linh</td>
                                <td>300.000đ</td>
                                <td>pro vjp</td>
                                <td>22/03/2023</td>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Hải</td>
                                <td>400.000đ</td>
                                <td>kcj</td>
                                <td>22/03/2023</td>
                            </tr>
                            <tr className="detail-campaign-table">
                                <td>Kiên</td>
                                <td>400.000đ</td>
                                <td>kcj</td>
                                <td>22/03/2023</td>
                            </tr>
                        </tbody>
                    </table> */}
                  </div>
                }

              </div>
            ) : (
              <div className="list-detail-campaign-activity">
                {
                  [1,2,3].map((item, i) => (
                    <div 
                      key={i}
                      className="detail-campaign-activity"
                      style={{
                        borderRadius: 8,
                        background :'#ffffff', 
                        marginTop :10,
                        marginBottom : 20,
                        padding: "24px 30px"
                      }}
                    >
                        <div>
                            <div style={{fontSize: 18, fontWeight: 600}}>Bài đăng ủng hộ bão lũ miền Trung</div>
                            <div>Thời gian đăng: 22/03/2023</div>
                        </div>
                        <br />
                        <div style={{fontSize: 16, fontWeight: 600}}>Mô tả - Giới thiệu:</div>
                        <div>Trong thời gian vừa qua, thanh thiếu nhi và nhân dân nhiều địa phương trong cả nước, đặc biệt là các tỉnh duyên hải miền Trung, Tây Nguyên phải hứng chịu nhiều thiên tai gây thiệt hại nặng nề về người và của, đời sống của nhân dân gặp nhiều khó khăn; nhằm phát huy tinh thần “Tương thân tương ái”, “Lá lành đùm lá rách” của dân tộc. </div>
                        <br />
                        <Row justify="center">
                            <Space wrap>
                                <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                            </Space>
                        </Row>
                        <div className="see-detail">Xem thêm</div>
                        <div style={{margin: '12px 0', height: '1px', background: 'gray'}}></div>
                        <Row justify={"space-around"}>
                            <Col>
                                <button className='btn-actions' style={{fontWeight: 600}}><HeartOutlined /> Thích</button>
                            </Col>
                            <Col>
                                <button className='btn-actions' style={{fontWeight: 600}}><CommentOutlined /> Bình luận</button>
                            </Col>
                            <Col>
                                <button className='btn-actions' style={{fontWeight: 600}}><ShareAltOutlined /> Chia sẻ</button>                              
                            </Col>
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

      
      <FooterClient />

    </div>
  );
}

export default DetailCampaign;
