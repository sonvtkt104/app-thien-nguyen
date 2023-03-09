import { Checkbox } from "../Checkbox"
import { Row } from "antd"
import { useState } from "react"

export function CheckboxMultiple({
    options,  // {value: any, label: string}[]
    value,   // [values] 
    onChange,
    mode='vertical',   // vertical | horizontal 
}) {

    const [optionSelects, setOptionSelects] = useState(value || [])

    return (
        <div
            style={{ 
                display: 'flex',
                flexDirection: mode == 'vertical' ? 'column' : 'row'
            }}
        >
            {
                options?.map((option, index) => (
                    <Row 
                        key={index}
                        style={{lineHeight: '21px',padding: '8px 16px'}}
                    >
                        <Checkbox 
                            title={option?.label}
                            checked={optionSelects.includes(option.value)}
                            onChange={(checked) => {
                                let arr;
                                if(checked) {
                                    arr = [...optionSelects, option.value]
                                } else {
                                    arr = optionSelects.filter(value => option.value != value);
                                }
                                setOptionSelects(arr)
                                onChange(arr)
                            }}
                        />
                    </Row>
                ))
            }
        </div>
    )
}
