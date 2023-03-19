import { Col, Row } from "antd"
import { memo } from "react"

function HomeTarget() {
    return (
        <Row justify='center' style={{background: 'var(--color-background-website)', paddingTop: 50}}>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}
                style={{position: 'relative'}}
            >
                <img src="/images/bg-home.png" alt="bg home" 
                    style={{width: '100%'}}
                />
                <div
                    style={{position: 'absolute', left: '10%', top: '3%', fontSize: 28, fontWeight: '700'}}
                >
                    TẦM NHÌN
                </div>
                <div
                    style={{position: 'absolute', left: '10%', top: '20%', right: '30%', color: '#fff', lineHeight: '21px', fontSize: 15}}
                   
                >
                    Tầm nhìn của ứng dụng gây quỹ cộng đồng là kết nối những người cần giúp đỡ với những người có mong muốn giúp đỡ, tạo ra một sức mạnh lớn cho cộng đồng để thực hiện các hoạt động có ý nghĩa và mang lại lợi ích cho xã hội.
                </div>
                <div
                    style={{position: 'absolute', right: '10%', top: '37%', fontSize: 28, fontWeight: '700'}}
                    
                >
                    SỨ MỆNH
                </div>
                <div
                     style={{position: 'absolute', right: '10%', top: '60%', left: '30%', color: '#fff', lineHeight: '21px', textAlign: 'right', fontSize: 15}}
                >
                    Tạo ra một nền tảng cho các cá nhân hoặc tổ chức để gây quỹ cho các dự án hoặc mục đích cộng đồng thông qua sự đóng góp của các thành viên trong cộng đồng. Ứng dụng này cung cấp cho người dùng một kênh để chia sẻ thông tin về các dự án, thu hút quyên góp từ mọi người và tạo ra sự tham gia tích cực của cộng đồng đối với các hoạt động có ích cho xã hội.
                </div>
            </Col>
        </Row>
    )
}

export default memo(HomeTarget)