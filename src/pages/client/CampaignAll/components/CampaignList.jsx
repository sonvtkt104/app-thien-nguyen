import { CloseOutlined } from "@ant-design/icons"
import { Col, Row, Tag } from "antd"
import { memo } from "react"
import { ItemCampaign } from "../../../../components"

function CampaignList() {
    return (
        <Row justify='center'
            style={{padding :'50px 0'}}
        >
            <Col 
                xs={16} sm={16} md={16} lg={16} xl={16}
            >
                <Row justify='space-between'
                    style={{marginBottom :30}}
                >
                    <Col>
                        <Row>
                            <span style={{fontSize: 18, lineHeight: '36px', fontWeight: '600', marginRight: 30}}>
                                10 Dự án
                            </span>
                            <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                <Row>
                                    "Lũ lụt"
                                    <span
                                        style={{marginLeft: 7,cursor: 'pointer'}}
                                    >
                                        <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                    </span>
                                </Row>
                            </span>
                            <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                <Row>
                                    Hà Nội
                                    <span
                                        style={{marginLeft: 7,cursor: 'pointer'}}
                                    >
                                        <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                    </span>
                                </Row>
                            </span>
                            <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                <Row>
                                    Trẻ em vùng cao
                                    <span
                                        style={{marginLeft: 7,cursor: 'pointer'}}
                                    >
                                        <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                    </span>
                                </Row>
                            </span>
                        </Row>
                    </Col>
                    <Col
                        style={{fontSize: 16, color: 'var(--color-gray)', lineHeight :'36px'}}
                    >
                        Trang 1/1
                    </Col>
                </Row>
                <Row justify='space-between'>
                    {
                        [1,2,3,4,5,6,7,8,9,10].map((item, i) => (
                            <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                <ItemCampaign /> 
                            </Col>
                        ))
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default memo(CampaignList)