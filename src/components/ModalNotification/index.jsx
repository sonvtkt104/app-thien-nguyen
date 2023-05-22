import { CloseOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";

export default function ModalNotification({
    data,
    open,
    setOpen
}) {

    /**
     * obj.image = 'https://cdn-icons-png.flaticon.com/512/1253/1253685.png'
        obj.newNotice = true
        obj.title = 'Thông báo phản hồi từ hệ thống'
        obj.message = item?.message
        obj.reply = item?.reply
        obj.date = item?.timeReply
        obj.type = 'admin'
     */

    return (
        <Modal
            open={open}
            title={data?.title}
            footer={null}
            width={800}
            onCancel={() => {
                setOpen(false);
            }}
            zIndex={99}
        >
            <div>
                {
                    data?.type == 'admin' ? (
                        <Row style={{marginTop: 30}}>
                            <Col span={12} style={{ textAlign: 'center', paddingRight: 10}}>
                                <div style={{ textAlign: 'center', fontWeight: '600', marginBottom: 10}}>
                                    Phản hồi của bạn
                                </div>
                                <div>
                                    {data?.message}
                                </div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'center', paddingLeft: 10}}>
                                <div style={{ textAlign: 'center', fontWeight: '600', marginBottom: 10}}>
                                    Trả lời của hệ thống
                                </div>
                                <div>
                                    {data?.reply}
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row style={{marginTop: 30}}>
                            {
                                data?.message
                            }
                        </Row>
                    )
                }
            </div>
        </Modal>
    )
}