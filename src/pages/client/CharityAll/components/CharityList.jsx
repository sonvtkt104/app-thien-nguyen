import { CloseOutlined } from "@ant-design/icons"
import { Col, Row, Tag } from "antd"
import { memo } from "react"
import ItemCharity from "./ItemCharity"

function CharityList({
    listCharities,
    setListCharities
}) {

    console.log("listCharities", listCharities)

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
                        (listCharities && listCharities?.length > 0) ? listCharities?.map((item, i) => (
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} key={i}
                                style={{padding: '0 10px', marginBottom: 30}}
                            >
                                <ItemCharity data={item} listCharities={listCharities} setListCharities={setListCharities}/>
                            </Col>
                        )) : "Không tìm thấy tổ chức từ thiện nào"
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default memo(CharityList)