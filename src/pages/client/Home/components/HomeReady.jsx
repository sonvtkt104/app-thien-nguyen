import { Button, Col, Row } from "antd"
import { memo } from "react"

function HomeReady() {
    return (
        <Row justify='center' style={{padding : '50px 0'}}>
            <Col xs={11} sm={11} md={11} lg={11} xl={11}
                className='flex-col-center'
            >
                <div className="h1-app" style={{color:"var(--color-black)", marginBottom: 30}}>
                    Bạn đã sẵn sàng chưa? <br />
                    Hãy tham gia cùng chúng tôi ngay nào.
                </div>
                <div>
                    <Row>
                        <Button className="btn-primary" style={{marginRight: 30}}>TẠO MỘT DỰ ÁN MỚI</Button>
                        <Button className="btn">QUYÊN GÓP NGAY</Button>
                    </Row>
                </div>
            </Col>
            <Col xs={10} sm={10} md={10} lg={10} xl={10}
                className='flex-col-center'
            >
                <img src="/images/last-home.png" alt="charity start" 
                    style={{display: 'block', margin: 'auto', width: '60%'}}
                />
            </Col>
        </Row>
    )
}

export default memo(HomeReady)