import { Col, Row, Steps } from "antd"
import { memo } from "react"
import { Link } from "react-router-dom";

function HomeProcess() {
    const items = [
        {
          description: (
            <div>
                <div style={{fontSize: 16, fontWeight: "600", whiteSpace: 'nowrap'}}>
                    Đăng ký là Tổ chức từ thiện</div>
                <div style={{marginTop: 12}}>
                    <Link to="" style={{fontWeight: "600", color: '#44b3cf'}}>
                        ĐĂNG KÝ NGAY {">"}    
                    </Link> 
                </div>
            </div>
          ),
        },
        {
          description: (
            <div>
                <div
                    style={{fontSize: 16, fontWeight: "600", whiteSpace: 'nowrap', color: 'var(--color-black)'}}
                >
                    Tạo mới một dự án
                </div>
                <div
                    style={{ color: 'var(--color-gray)', marginTop: 12}}
                >
                    Giới thiệu cho chúng tôi biết <br />thông tin về dự án của bạn
                </div>
            </div>
          ),
        },
        {
          description: (
            <div>
                <div
                    style={{fontSize: 16, fontWeight: "600", whiteSpace: 'nowrap', color: 'var(--color-black)'}}
                >
                    Chia sẻ với mọi người
                </div>
                <div
                    style={{ color: 'var(--color-gray)', marginTop: 12}}
                >
                    Lan tỏa và thu hút sự ủng hộ từ mọi người
                </div>
            </div>
          ),
        },
    ];

    return (
        <Row justify='center'
            style={{ padding: '50px 0' }}
        >
            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                <div className="h1-app" style={{ color: 'var(--color-black)', marginBottom: 30 }}>BẮT ĐẦU MỘT DỰ ÁN MỚI</div>
                <Steps current={0} labelPlacement="vertical" items={items} 
                    style={{width: '80%', margin: 'auto'}}
                />
                
            </Col>
        </Row>
    )
}
export default memo(HomeProcess)