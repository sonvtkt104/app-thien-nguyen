import { EnvironmentOutlined, GlobalOutlined, MailOutlined, NotificationOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { FooterClient, HeaderClient } from "../../../components";
import "./css/index.css"

export default function ProfileCharity() {
    const [tab, setTab] = useState(0)

    return (
        <div>
            <HeaderClient />
            <Row justify='center'
                style={{
                    background :'var(--color-background)',
                    minHeight: 'calc(100vh - 90px)'
                }}
            >
                <Col xs={20} sm={20} md={20} lg={20} xl={20}
                    style={{paddingBottom: 70}}
                >
                    <div
                        style={{background: '#FFFF', borderRadius: '0 0 6px 6px',boxShadow: '-1px 1px 6px rgba(0,0,0,.05)'}}
                    >
                        <div
                            style={{
                                backgroundImage: 'url("/images/banner-charity.jpeg")',
                                backgroundSize: 'cover',
                                backgroundPosition :'center',
                                height: 250
                            }}
                        >
                        </div>
                        <Row
                            style={{padding: '30px 24px 30px 154px', position: 'relative'}}
                            justify='space-between'
                        >
                            <img src="/images/logo.png" alt="logo" 
                                style={{
                                    width :130,
                                    height : 130,
                                    borderRadius: 8,
                                    position: 'absolute',
                                    left: 24,
                                    bottom: 30,
                                    background: '#ffffff'
                                }}
                            />
                            <Col
                                className="flex-col-center"
                                style={{marginLeft: 30}}
                            >
                                <div style={{fontSize: 24, fontWeight: '600', marginBottom :7}}>
                                    Tổ chức Áo ấm trao em
                                </div>
                                <Row>
                                    <span>
                                        <GlobalOutlined style={{color: 'var(--color-gray)'}}/>
                                        <span style={{marginLeft: 5, color: 'var(--color-gray)'}}>http://www.thiennguyen.com/</span>
                                    </span>
                                    <span style={{marginLeft: 50}}>
                                        <NotificationOutlined style={{fontWeight: '600'}} />
                                        <span style={{marginLeft: 5, fontWeight: '600'}}>Dự án: 7</span>
                                    </span>
                                </Row>
                            </Col>
                            <Col
                                className="flex-col-center"
                            >
                                <Button className="btn-primary">
                                    Theo dõi tổ chức
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{borderTop: '1px solid var(--color-border)'}}>
                            <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
                                className={tab == 0 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(0)}
                            >
                                Trang chủ
                            </Col>
                            <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
                                className={tab == 1 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(1)}
                            >
                                Dự án
                            </Col>
                            <Col style={{padding: '20px 30px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', borderBottom: '1.5px solid #fff'}}
                                className={tab == 2 ? 'profile-charity-menu-item active' : 'profile-charity-menu-item'}
                                onClick={() => setTab(2)}
                            >
                                Hình ảnh
                            </Col>
                        </Row>
                    </div>
                    {
                        tab == 0 ? (
                            <div style={{marginTop: 20}}>
                                <Row>
                                    <Col xs={15} sm={15} md={15} lg={15} xl={15}
                                        style={{paddingRight : 30}}
                                    >
                                        <div style={{background: '#fff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: 20}}>
                                            <div style={{marginBottom: 20}}>
                                                <Row style={{paddingLeft : 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                                                    Giới thiệu tổ chức
                                                </Row>
                                                <div style={{lineHeight: '21px', marginBottom: 10}}>
                                                    Xin chào và chào mừng đến với tổ chức từ thiện "Áo ấm trao em". <br/> Chúng tôi hoạt động với mục đích giúp đỡ những trẻ em khó khăn và gia đình nghèo trong cộng đồng. Chúng tôi cố gắng cung cấp cho các em cơ hội học tập và phát triển bản thân để họ có thể có một tương lai tốt đẹp hơn. Chân thành cảm ơn sự quan tâm và hỗ trợ của các bạn!
                                                </div>
                                            </div>
                                        <div style={{marginBottom: 20}}>
                                            <Row style={{paddingLeft : 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                                                    Phương châm
                                                </Row>
                                                <div style={{lineHeight: '21px', marginBottom: 10}}>
                                                    Phương trâm của tổ chức từ thiện "Áo ấm trao em" là giúp đỡ những trẻ em nghèo và vùng khó khăn trong cộng đồng bằng cách cung cấp các dịch vụ cơ bản như thức ăn, nước uống, quần áo và y tế. Chúng tôi cũng tập trung vào việc giúp đỡ trẻ em bị bỏ rơi, đưa họ đến trường và hỗ trợ họ trong việc học tập và phát triển bản thân.
                                                </div>
                                        </div>
                                            <div style={{marginBottom: 20}}>
                                                <Row style={{paddingLeft : 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                                                    Mục tiêu
                                                </Row>
                                                <div style={{lineHeight: '21px', marginBottom: 10}}>
                                                    Mục tiêu của tổ chức từ thiện "Áo ấm trao em" là cung cấp áo ấm và quần áo miễn phí cho trẻ em và người lớn khó khăn trong cộng đồng, đặc biệt là trong mùa đông lạnh giá. Chúng tôi mong muốn giúp đỡ và mang lại sự ấm áp cho những người đang gặp khó khăn trong cuộc sống.
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{background: '#fff', borderRadius: 6, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding:'24px 30px',marginTop: 20}}>
                                            <div style={{marginBottom: 50}}>
                                                <div style={{fontSize: 18, fontWeight: '600', marginBottom:20}}>
                                                    Video Giới thiệu
                                                </div>
                                                <div>
                                                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/6h2fq03pJTk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                                </div>
                                            </div>
                                            <div>
                                                <Row justify='space-between'
                                                    style={{marginBottom: 12}}
                                                >
                                                    <span style={{fontSize: 18, fontWeight: '600'}}>
                                                        Hình ảnh của tổ chức
                                                    </span>
                                                    <span className="text-hover" style={{fontSize: 16, fontWeight: '600', color: 'var(--color-blue)', cursor: 'pointer'}}>
                                                        Tất cả hình ảnh
                                                    </span>
                                                </Row>
                                                <Row>
                                                    {
                                                        [1,2,3].map((item, i) => (
                                                            <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                                                style={{padding: '10px', }}
                                                            >
                                                                <img src="https://media.doisongphapluat.com/333/2014/4/8/7.jpg" alt="charity_image" 
                                                                    style={{width:"100%"}}
                                                                />
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={9} sm={9} md={9} lg={9} xl={9} >
                                        <div
                                            style={{background: '#fff',boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', padding: 20}}
                                        >
                                            <Row style={{paddingLeft : 10, borderLeft: '3px solid var(--color-blue)', fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                                                Liên hệ
                                            </Row>
                                            <Row style={{padding: '16px 0', borderBottom: '1px solid var(--color-border)'}}>
                                                <img src="/images/logo.png" alt="logo" 
                                                    style={{width: 50, height: 50, borderRadius: '50%', marginRight: 24}}
                                                />
                                                <span style={{fontSize: 16, fontWeight: '500'}}
                                                    className='flex-col-center'
                                                >
                                                    Áo ấm cho em
                                                </span>
                                            </Row>
                                            <div style={{padding: '16px 0'}}>
                                                <Row style={{lineHeight: '20px', fontSize: 15, marginBottom: '16px'}}>
                                                    <PhoneOutlined  style={{color: 'var(--color-blue', marginRight :12, fontSize : 20}}/>
                                                    0349348227
                                                </Row>
                                                <Row  style={{lineHeight: '20px', fontSize: 15, marginBottom: '16px'}}>
                                                    <GlobalOutlined  style={{color: 'var(--color-blue', marginRight :12, fontSize : 20}} />
                                                    http://www.thiennguyen.com/
                                                </Row>
                                                <Row  style={{lineHeight: '20px', fontSize: 15, marginBottom: '16px'}}>
                                                    <MailOutlined style={{color: 'var(--color-blue', marginRight :12, fontSize : 20}} />
                                                    thiennguyen@gmail.com
                                                </Row>
                                                <Row  style={{lineHeight: '20px', fontSize: 15, marginBottom: '16px', flexWrap :'nowrap'}}>
                                                    <EnvironmentOutlined style={{color: 'var(--color-blue', marginRight :12, fontSize : 20}}  />
                                                    Trường ĐH Công nghệ - Đại học quốc gia Hà Nội, 144 Xuân Thủy, Cầu Giấy, Hà Nội
                                                </Row>
                                                <div style={{marginBottom: 20}}>
                                                    <div style={{fontSize: 16, fontWeight: '600', marginBottom: 20}}>Địa chỉ trụ sở chính</div>
                                                    <div>
                                                        <iframe title="Google map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s" style={{border: 0, width: '100%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{fontSize: 16, fontWeight: '600', marginBottom: 20}}>Liên hệ qua mạng xã hội</div>
                                                    <Row>
                                                        <div style={{marginRight: 12, padding: '0 10px', textAlign: 'center'}}>
                                                            <img src="/images/facebook.png" alt="logo facebook" 
                                                                style={{width: 33, marginBottom: 8}}
                                                            />
                                                            <div style={{color:"var(--color-blue)", lineHeight: '18px'}}>
                                                                Facebook
                                                            </div>
                                                        </div>
                                                        <div style={{marginRight: 12, padding: '0 10px', textAlign: 'center'}}>
                                                            <img src="/images/instagram.png" alt="logo instagram" 
                                                                style={{width: 33, marginBottom: 8}}
                                                            />
                                                            <div style={{color:"var(--color-blue)", lineHeight: '18px'}}>
                                                                Instagram
                                                            </div>
                                                        </div>
                                                        <div style={{marginRight: 12, padding: '0 10px', textAlign: 'center'}}>
                                                            <img src="/images/twitter.png" alt="logo Twitter" 
                                                                style={{width: 33, marginBottom: 8}}
                                                            />
                                                            <div style={{color:"var(--color-blue)", lineHeight: '18px'}}>
                                                                Twitter
                                                            </div>
                                                        </div>
                                                        <div style={{padding: '0 10px', textAlign: 'center'}}>
                                                            <img src="/images/linkedin.png" alt="logo LinkedIn" 
                                                                style={{width: 33, marginBottom: 8}}
                                                            />
                                                            <div style={{color:"var(--color-blue)", lineHeight: '18px'}}>
                                                                LinkedIn
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ) : tab == 1 ? (
                            <div style={{marginTop: 20}}>
                                hello
                            </div>
                        ) : (
                            <div style={{marginTop: 20}}>
                                hello image
                            </div>
                        )
                    }
                </Col>
            </Row>
            <FooterClient/>
        </div>
    )
}

