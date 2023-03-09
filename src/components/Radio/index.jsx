import { Row, Col } from "antd"
import { useState } from "react"
import "./index.css"

export function Radio({
    options,   // {value: any, label: string, detail? : jsx}[]
    mode='vertical',   // vertical | horizontal 
    value,
    onChange,
}) {
    const [valueCurrent, setValueCurrent] = useState(value || options[0]?.value)


    return (
        <div style={{display: 'flex', flexDirection: mode === 'vertical' ? 'column' : 'row'}}>
            {
                options?.map((option, i) => (
                    <div key={i}>
                        <Row 
                            className="radio-app-item"
                            style={{lineHeight: '21px', marginBottom: 6, paddingRight: 24}}
                        >
                            <Col
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    setValueCurrent(option?.value)
                                    onChange(option?.value)
                                }}
                            >
                                <Row>
                                    <span 
                                        className="radio-app-item-circle"
                                        style={{width: 16, height: 16, border: "2px solid #96a2ba8a", borderRadius: '50%', position: 'relative', padding: 1, margin: '3px 10px 0 0', transition: '0.2s linear'}}
                                    >
                                        {
                                            option.value == valueCurrent ? (
                                                <span style={{width: 10, height: 10, borderRadius: '50%', background: '#58ca90de', position: 'absolute'}}></span>
                                            ) : ""
                                        }
                                    </span>
                                    {option?.label}
                                </Row>
                            </Col>
                        </Row>
                        {
                            (option.value == valueCurrent && option.detail &&  mode == 'vertical') ? (
                                <div>
                                    {option.detail}
                                </div>
                            ) : ""
                        }
                    </div>
                ))
            }
        </div>
    )
}
