import { CloseOutlined } from "@ant-design/icons"
import { Col, Row, Tag } from "antd"
import { memo } from "react"
import ItemCharity from "./ItemCharity"

function CharityList() {
    return (
        <Row justify='center'
            style={{padding :'50px 0'}}
        >
            <Col 
                xs={21} sm={21} md={21} lg={21} xl={21}
            >
                <Row justify='center'
                    className="h1-app"
                    style={{marginBottom :30, textAlign: 'center',fontSize: 24}}
                >
                    TỔ CHỨC TỪ THIỆN NỔI BẬT
                </Row>
                <Row justify='space-between'>
                    {
                        [1,2,3,4,5,6,7,8,9,10].map((item, i) => (
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                style={{padding: '0 10px', marginBottom: 30}}
                            >
                                <ItemCharity />
                            </Col>
                        ))
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default memo(CharityList)