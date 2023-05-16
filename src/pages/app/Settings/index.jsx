import { Col, Row } from "antd";
import { Card, Header, PageLayout } from "../../../components";
import SettingVerification from "./components/SettingVerification";
import SettingPassword from "./components/SettingPassword";
import FeedbackSupport from "./components/FeedbackSupport";

export default function Settings() {
    return (
        <PageLayout>
            <div>
                <Header title="Settings" style={{marginBottom: 30}}/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}
                        style={{paddingRight: 15}}
                    >
                        <SettingVerification />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}
                        style={{paddingLeft: 15}}
                    >
                        <div
                            style={{marginBottom: 20}}
                        >
                            <SettingPassword />
                        </div>
                        <div>
                            <FeedbackSupport/>
                        </div>
                        {/* <Card
                            title="Trợ giúp"
                        >
                            <div
                                style={{padding: '20px 30px'}}
                            >
                                <div
                                    style={{
                                        fontSize:16,
                                        fontWeight: '500',
                                        margin: '0px 0 10px'
                                    }}
                                >
                                    Gửi phản hồi của bạn
                                </div>
                                <Row>
                                    <textarea className='input-app'
                                        placeholder="Nhập ...."
                                        style={{width: '100%', minHeight: 100}}
                                    />
                                </Row>
                                <button className='btn-primary' style={{marginTop: 20}}>
                                    Gửi
                    </button> 
                            </div>
                        </Card> */}
                    </Col>
                </Row>
            </div>
        </PageLayout>
    )
}