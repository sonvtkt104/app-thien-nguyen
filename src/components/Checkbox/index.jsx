
import "./index.css"
import { Row, Col } from "antd"
import { useState } from "react"

export function Checkbox({
    checked=false,
    onChange,
    title,
    className,
    style
}) {

    const [checkedValue, setCheckedValue] = useState(checked)

    return (
        <span
            className={className ? `${className} checkbox-app-custom` : "checkbox-app-custom"}
            style={style}
        >
            <Row>
                <Col style={{cursor: 'pointer'}}
                    onClick={() => {
                        setCheckedValue(!checkedValue)
                        onChange(!checkedValue)
                    }}
                >
                    <Row
                        style={{lineHeight: '20px'}}
                    >
                        <span 
                            className='checkbox-app-custom-icon'
                        >
                            {
                                checkedValue ? (
                                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.4349 1.25066C9.60039 1.08516 9.82485 0.992188 10.0589 0.992188C10.2929 0.992187 10.5174 1.08516 10.6829 1.25066C10.8484 1.41615 10.9414 1.64061 10.9414 1.87466C10.9414 2.1087 10.8484 2.33316 10.6829 2.49866L5.3879 7.79266C5.22251 7.95796 4.99824 8.05082 4.7644 8.05082C4.53056 8.05082 4.30629 7.95796 4.1409 7.79266L1.1989 4.85166C1.0334 4.68616 0.94043 4.4617 0.94043 4.22766C0.94043 3.99361 1.0334 3.76915 1.1989 3.60366C1.36439 3.43816 1.58885 3.34519 1.8229 3.34519C2.05694 3.34519 2.2814 3.43816 2.4469 3.60366L4.7649 5.92166L9.4349 1.25066Z" fill="#77C791"/>
                                    </svg>
                                ) : ''
                            }
                        </span>
                        {title}
                    </Row>
                </Col>
            </Row>
        </span>
    )
}