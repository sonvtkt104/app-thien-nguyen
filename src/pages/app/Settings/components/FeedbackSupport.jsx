import { useState } from "react";
import { Card } from "../../../../components"
import { message, Row, Upload, Form, Image, Input, Button, notification } from 'antd';
import { userPushFeedBack } from "../../../../api/feedbacks";

function FeedbackSupport() {
    const [feedback, setFeedback] = useState("")
    // console.log(feedback)
    const onSubmit = () => {
        console.log(feedback)
        userPushFeedBack(feedback).then(res => {
            if(res.data) {
                console.log(res)
                notification.success({
                    message: "Gửi phản hồi thành công",
                    description:
                        "Cảm ơn bạn đã gửi phản hồi cho chúng tôi. Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.",
                    placement: 'bottomRight'
                })
                setFeedback("")
            }
        })
    }
    return (
        <Card
            title="Trợ giúp"
        >
            <div
                style={{ padding: '20px 30px' }}
            >
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: '500',
                        margin: '0px 0 10px'
                    }}
                >
                    Gửi phản hồi của bạn
                </div>
                <Row>
                    <Input.TextArea 
                        className="input-app"
                        placeholder="Nhập..." rows={6}
                        value={feedback}
                        onChange={(e) => {
                            setFeedback(e.target.value)
                        }}
                    />
                </Row>
                <div style={{ textAlign: "right", marginTop:20 }}>
                    <Button
                        type="primary"
                        // htmlType="submit"
                        onClick={onSubmit}
                        className="btn-primary"
                        
                    >
                        Gửi
                    </Button>
                </div>
            </div>
        </Card>
    )

}

export default FeedbackSupport