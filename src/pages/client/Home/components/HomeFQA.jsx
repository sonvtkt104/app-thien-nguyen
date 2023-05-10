import { Col, Collapse, Row } from "antd"
import { memo, useMemo } from "react"
import {  DownIcon } from "../../../../components"

const {Panel} = Collapse

function HomeFQA({

}) {

    const data = useMemo(() => {
        return [
            {
                key: 1,
                question: "Làm thế nào để tạo một cuộc vận động kêu gọi vốn trên ứng dụng?",
                answer: "Để tạo một cuộc vận động, bạn chỉ cần đăng ký một tổ chức từ thiện trên ứng dụng và điền thông tin cần thiết như mục tiêu tài chính, thời hạn và mô tả chi tiết về cuộc vận động của bạn."
            },
            {
                key: 2,
                question: "Làm thế nào để thu hút sự quan tâm và ủng hộ từ cộng đồng?",
                answer: "Để thu hút sự quan tâm và ủng hộ từ cộng đồng, hãy chia sẻ câu chuyện chân thực và cảm động về cuộc vận động của bạn, giải thích rõ ràng mục tiêu và tầm quan trọng của nó. Sử dụng hình ảnh, video và mô tả sáng tạo để tạo sự kết nối mạnh mẽ với người ủng hộ tiềm năng."
            },
            {
                key: 3,
                question: "Làm thế nào lan tỏa cuộc vận động đến nhiều người hơn?",
                answer: "Sử dụng các kênh mạng xã hội, email, blog hoặc truyền thông để lan tỏa thông điệp về cuộc vận động của bạn. Tạo liên kết và tương tác với các nhóm và cộng đồng có chung sở thích hoặc quan tâm với lĩnh vực của bạn. Hãy đảm bảo rằng thông điệp của bạn được truyền tải một cách rõ ràng và thú vị để thu hút sự quan tâm của nhiều người."
            },
            {
                key: 4,
                question: "Cuộc vận động nào phù hợp để sử dụng ứng dụng kêu gọi vốn cộng đồng?",
                answer: " Ứng dụng kêu gọi vốn cộng đồng thích hợp cho nhiều loại cuộc vận động, bao gồm nghệ thuật, công nghệ, giáo dục, từ thiện và sáng tạo"
            },
            {
                key: 5,
                question: "Làm thế nào để đóng góp vào một chiến dịch kêu gọi vốn cộng đồng?",
                answer: 'Người ủng hộ có thể đóng góp vào chiến dịch kêu gọi vốn cộng đồng bằng cách chọn một mức đóng góp tài chính phù hợp với khả năng của họ. Họ cũng có thể chia sẻ chiến dịch với mạng lưới xã hội của mình, mời bạn bè và người thân tham gia. Ngoài ra, người ủng hộ cũng có thể cung cấp phản hồi và ý kiến, gửi lời động viên và lan toả thông điệp về chiến dịch đến mọi người xung quanh. Mỗi đóng góp đều mang ý nghĩa và quan trọng trong việc xây dựng sự thành công của cuộc vận động.'
            },
            
        ]
    }  ,[])

    return (
        <Row justify='center'
            style={{margin: '50px 0'}}
        >
            <Col xs={10} sm={10} md={10} lg={10} xl={10}
                style={{paddingRight: 10}}
            >
                <img src="/images/FAQs.png" alt="fqa" 
                    style={{width: '80%', display: 'block', margin: 'auto'}}
                />
            </Col>
            <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                <div className="h1-app"
                    style={{marginBottom: 30}}
                >
                    NHỮNG CÂU HỎI THƯỜNG GẶP
                </div>
                <div>
                    <Collapse className="collapse-app">
                        {
                            data.map((item, i ) => (
                                <Panel 
                                    header={(
                                        <Row justify='space-between' className='collapse-app-header'
                                            style={{fontSize: 16, fontWeight: '600'}}
                                        >
                                            {item.question}
                                            <DownIcon 
                                                style={{transform: 'rotate(-90deg)', transition: 'all 0.2s ease'}}
                                            />
                                        </Row>
                                    )}
                                    key={item.key} 
                                    showArrow={false}
                                >
                                    <div>{item.answer}</div>
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            </Col>
        </Row>
    )
}

export default memo(HomeFQA)