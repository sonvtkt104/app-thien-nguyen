import { Col, Row } from "antd"
import { memo } from "react"

function HomeNumber() {
    return (
        <div style={{background: 'var(--color-background-website)'}}>
            <Row justify='center'
                style={{paddingTop: 50}}
            >
                <Col>
                    <div
                        style={{fontSize: 46, fontWeight: '600', marginBottom: 10}}
                    >
                        11000+
                    </div>
                    <Row
                        style={{
                            color: 'var(--color-blue)',fontSize: 28
                        }}
                    >
                        NGƯỜI ỦNG HỘ
                        <i className="fa-solid fa-person"
                            style={{fontSize: 36, marginLeft: 10}}
                        ></i>
                    </Row>
                </Col>
                <Col style={{margin: '0 150px'}}>
                    <div
                        style={{fontSize: 46, fontWeight: '600', marginBottom: 10}}
                    >
                        652
                    </div>
                    <Row
                        style={{
                            color: 'var(--color-blue)',fontSize: 28
                        }}
                    >
                        NHÀ TỪ THIỆN
                        <i className="fas fa-users"
                            style={{fontSize: 36, marginLeft: 10}}
                        ></i>
                    </Row>
                </Col>
                <Col>
                    <div
                        style={{fontSize: 46, fontWeight: '600', marginBottom: 10}}
                    >
                        756+
                    </div>
                    <Row
                        style={{
                            color: 'var(--color-blue)',fontSize: 28
                        }}
                    >
                        HOẠT ĐỘNG TÌNH NGUYỆN
                        <i className="fa-solid fa-person-hiking"
                            style={{fontSize: 36, marginLeft: 10}}
                        ></i>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'
                style={{padding: '50px 0'}}
            >
                <Col style={{padding: '0 75px'}}>
                    <div
                        style={{fontSize: 46, fontWeight: '600', marginBottom: 10}}
                    >
                        5000+
                    </div>
                    <Row
                        style={{
                            color: 'var(--color-blue)',fontSize: 28
                        }}
                    >
                        HOÀN CẢNH KHÓ KHĂN <br/> CẦN GIÚP ĐỠ
                        <i className="fa-solid fa-house-flag"
                            style={{fontSize: 36, marginLeft: 10}}
                        ></i>
                    </Row>
                </Col>
                <Col style={{padding: '0 75px'}}>
                    <div
                        style={{fontSize: 46, fontWeight: '600', marginBottom: 10}}
                    >
                        200
                    </div>
                    <Row
                        style={{
                            color: 'var(--color-blue)',fontSize: 28
                        }}
                    >
                        TÌNH NGUYỆN VIÊN
                        <i className="fa-solid fa-person-walking-arrow-right"
                            style={{fontSize: 36, marginLeft: 10}}
                        ></i>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default memo(HomeNumber)