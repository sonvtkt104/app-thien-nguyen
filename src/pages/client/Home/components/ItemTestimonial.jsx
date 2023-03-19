import { Col, Row } from "antd";
import { memo } from "react"

function ItemTestimonial() {
    return (
        <Col xs={6} sm={6} md={6} lg={6} xl={6}
            style={{padding: '0 50px', marginBottom: 50}}
        >
            <div
                style={{fontStyle: 'italic', textAlign: 'center', lineHeight:"21px", letterSpacing: '-3%'}}
            >
                Tôi rất vui khi được tham gia vào hoạt động từ thiện và góp phần giúp đỡ cộng đồng. Tôi hy vọng mọi người cũng có cơ hội tham gia và tạo ra sự khác biệt tích cực trong xã hội. Tôi rất vui khi được tham gia vào hoạt động từ thiện và góp phần giúp đỡ cộng đồng.
            </div>
            <div
                style={{fontSize: 72, fontWeight: '600', textAlign: 'center', fontFamily: 'cursive'}}
            >
                "
            </div>
            <Row justify='center'>
                <Col className="flex-col-center"
                    style={{marginRight: 12}}
                >
                    <img src="/images/logo.png" alt="logo" 
                        style={{width: 50}}
                    />
                </Col>
                <div className="flex-col-center">
                    <div style={{fontWeight: '600', marginBottom: 5}}>
                        XUÂN SƠN
                    </div>
                    <Row style={{fontSize: 12, color: 'var(--color-gray)', lineHeight :'16px', fontWeight: '600'}}>
                        <img src="/images/star.png" alt="rate star" 
                            style={{height: 16, marginRight: 5}}
                        /> 
                        Mar 19, 2023
                    </Row>
                </div>
            </Row>
        </Col>
    )
}

export default memo(ItemTestimonial);