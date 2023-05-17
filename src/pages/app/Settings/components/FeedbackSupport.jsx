import { useState } from "react";
import { Card } from "../../../../components"
import { message, Row, Upload, Form, Image, Input, Button } from 'antd';

function FeedbackSupport() {
    const [feedback, setFeedback] = useState("")
    // console.log(feedback)
    const onSubmit = () => {
        console.log(feedback)
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
                        
                    >
                        Gửi
                    </Button>
                </div>
            </div>
        </Card>
    )

}

export default FeedbackSupport