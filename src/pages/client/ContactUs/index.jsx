import { Button, Col, Input, Row } from "antd";
import { FooterClient, HeaderClient } from "../../../components";
import './css/index.css'

const {TextArea} = Input

export default function ContactUs() {
    return (
        <div>
            <HeaderClient />
            <Row
                style={{ background: 'var(--color-background-header)', height: '300px' }}
                className='flex-col-center'
                justify='center'
            >
                <Row className="h1-app" justify='center'>LIÊN HỆ</Row>
            </Row>
            <Row justify='center'
                style={{padding: '70px 0'}}
            >
                <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                    <iframe title="Google map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s" width="600" height="450" style={{border: 0, width: '100%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <Row style={{marginTop: 70}}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}
                             className='flex-col-center'
                        >
                            <img src="/images/mail.png" alt="mail" 
                                style={{width: '80%', display: 'block', margin: 'auto'}}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} 
                            className='flex-col-center'
                        >
                            <div className="h1-app" style={{textAlign: 'center', fontSize: 28}}>LIÊN HỆ VỚI CHÚNG TÔI</div>
                            <Row justify='center' style={{color: 'gray', fontSize: 16, margin: '20px 0 50px'}}>Nếu bạn có câu hỏi nào, hãy để lời nhắn cho chúng tôi</Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingRight: 10}}>
                                    <Input placeholder="Tên của bạn"
                                        className="input-app"
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingLeft: 10}}>
                                    <Input placeholder="Địa chỉ Email"
                                        className="input-app"
                                    />
                                </Col>
                            </Row>
                            <TextArea className="textarea-app"
                                placeholder="Tin nhắn của bạn"
                                style={{marginTop: 20, minHeight: 130}}
                            />
                            <Row justify='center' style={{marginTop: 25}}>
                                <Button className="btn-primary">GỬI PHẢN HỒI</Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <FooterClient />
        </div>
    )
}
