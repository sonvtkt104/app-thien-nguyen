import { Card } from "../Card";
import { Collapse, Row } from 'antd';
import { DownIcon } from "../Icon";
import "./index.css"

const { Panel } = Collapse;

export function CollapseApp({
    title='Frequently asked questions',
    data  // {key: any, question: any, answer: any} []
}) {
    return (
        <Card
            title={(<span style={{fontWeight: "500"}}>{title}</span>)}
        >
            <div>
                <Collapse className="collapse-app">
                    {
                        data.map((item, i ) => (
                            <Panel 
                                header={(
                                    <Row justify='space-between' className='collapse-app-header'>
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
        </Card>
    )
}