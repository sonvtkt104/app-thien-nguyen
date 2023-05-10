import { Col, Row } from "antd";
import { memo } from "react"

function ItemTestimonial({content, date, name, image}) {
    return (
        <Col xs={6} sm={6} md={6} lg={6} xl={6}
            style={{padding: '0 50px', marginBottom: 50}}
        >
            <div
                style={{fontStyle: 'italic', textAlign: 'center', lineHeight:"21px", letterSpacing: '-3%', minHeight: 147}}
            >
                {content}
            </div>
            <div
                style={{fontSize: 72, fontWeight: '600', textAlign: 'center', fontFamily: 'cursive', lineHeight: '70px'}}
            >
                "
            </div>
            <Row justify='center'>
                <Col className="flex-col-center"
                    style={{marginRight: 12}}
                >
                    <img src={image} alt="logo" 
                        style={{width: 50, borderRadius: '50%'}}
                    />
                </Col>
                <div className="flex-col-center">
                    <div style={{fontWeight: '600', marginBottom: 5}}>
                        {name}
                    </div>
                    <Row style={{fontSize: 12, color: 'var(--color-gray)', lineHeight :'16px', fontWeight: '600'}}>
                        <img src="/images/star.png" alt="rate star" 
                            style={{height: 16, marginRight: 5}}
                        /> 
                        {date}
                    </Row>
                </div>
            </Row>
        </Col>
    )
}

export default memo(ItemTestimonial);