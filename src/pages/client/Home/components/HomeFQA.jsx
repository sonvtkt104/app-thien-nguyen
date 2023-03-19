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
                question: 'Đây là câu hỏi của khách hàng?',
                answer: 'Test'
            },
            {
                key: 2,
                question: 'Đây là câu hỏi của khách hàng?',
                answer: 'Test'
            },
            {
                key: 3,
                question: 'Đây là câu hỏi của khách hàng?',
                answer: 'Test'
            },
            {
                key: 4,
                question: 'Đây là câu hỏi của khách hàng?',
                answer: 'Test'
            },
            {
                key: 5,
                question: 'Đây là câu hỏi của khách hàng?',
                answer: 'Test'
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