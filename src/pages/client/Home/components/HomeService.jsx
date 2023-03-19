import { Col, Row } from "antd";
import { memo } from "react"
import { SuccessIcon } from "../../../../components";

function HomeService() {
    return (
        <Row justify='center' style={{paddingTop: 50}}>
            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                <img src="/images/detail-home.jpeg" alt="detail" 
                    style={{width: '80%', display: 'block', margin : 'auto'}}
                />
            </Col>
            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                <div className="h1-app" style={{color: 'var(--color-black)', marginBottom: 20}}>DỊCH VỤ CUNG CẤP</div>
                <div>
                    <Row style={{padding:'10px 0'}}>
                        <SuccessIcon color="var(--color-blue)" style={{marginRight: 12}} />
                        Cung cấp một nền tảng CMS cho tổ chức từ thiện
                    </Row>
                    <Row style={{padding:'10px 0'}}>
                        <SuccessIcon color="var(--color-blue)" style={{marginRight: 12}}/>
                        Bắt đầu kêu gọi và theo dõi một cuộc vận động mới
                    </Row>
                    <Row style={{padding:'10px 0'}}>
                        <SuccessIcon color="var(--color-blue)" style={{marginRight: 12}}/>
                        Quản lý danh sách quyên góp cho tổ chức từ thiện
                    </Row>
                    <Row style={{padding:'10px 0'}}>
                        <SuccessIcon color="var(--color-blue)" style={{marginRight: 12}}/>
                        Một hệ thống minh bạch công khai rõ ràng cho người ủng hộ
                    </Row>
                    <Row style={{marginTop: 16}}>
                        Hơn nữa ...
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default memo(HomeService);