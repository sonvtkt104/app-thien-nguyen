import { Row, Col, Popover } from "antd"
import { useMemo, useState } from "react";
import { DownIcon, FilterIcon } from "../Icon";
import "./index.css"

export function Filter({
    style,
    className,
    defaultValue,
    options,  //{ value: any; label: string; }[]
    onChange,
    icon
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue || options[0]?.value)
    const [valueSelect, setValueSelect] = useState(defaultValue || options[0]?.value)

    const title = useMemo(() => {
        let result = options.filter(item => item.value == value); 
        return result[0]?.label;
    }, [value])

    return (
        <span className={className ? `${className} filter-app-custom` : 'filter-app-custom'}>
            <Popover 
                trigger="click"
                placement="bottom"
                open={open}
                onOpenChange={(i) => {
                    if(!i) {
                        setValueSelect(value)
                    }
                    setOpen(i)
                }}
                content={(
                    <div style={{minWidth: 188}}>
                        {
                            options?.map((option, index) => (
                                <div
                                    className={option?.value == valueSelect ? "filter-app-custom-option active" : "filter-app-custom-option"}
                                    key={index}
                                    style={{
                                        padding: '6px 16px',
                                        marginTop: 4,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setValueSelect(option.value)
                                    }}
                                >
                                    <Row style={{lineHeight: '21px'}}>
                                        <span style={{width: 16, height: 16, border: "2px solid #96a2ba8a", borderRadius: '50%', position: 'relative', padding: 1, margin: '2px 10px 0 0'}}>
                                            {
                                                option?.value == valueSelect ? (
                                                    <span style={{width: 10, height: 10, borderRadius: '50%', background: '#58ca90de', position: 'absolute'}}></span>
                                                ) : ""
                                            }
                                        </span>
                                        {option?.label}
                                    </Row>
                                </div>
                            ))
                        }
                        <Row justify='center' style={{marginTop: 15}}>
                            <span
                                style={{fontSize: 12, lineHeight: '18px', padding: "6px 10px", border: '1px solid #DADFE9', borderRadius: 4, cursor: 'pointer'}}
                                onClick={()=> {
                                    setValue(valueSelect)
                                    onChange(valueSelect)
                                    setOpen(false)
                                }}
                            >
                                Apply
                            </span>
                        </Row>
                    </div>
                )}
            >
                <Row 
                    justify='space-between'
                    style={{
                        lineHeight: '24px', 
                        padding: '6px 20px',
                        border: '1px solid #ECEBED',
                        width: 188,
                        borderRadius: 6,
                        flexWrap: 'nowrap',
                        cursor: 'pointer',
                        ...style
                    }}
                >  
                    <Col
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span style={{marginRight: 10}}>
                            {icon || <FilterIcon />}
                        </span>
                        {title}
                    </Col>
                    <Col>
                        <span style={{marginLeft: 10}}>
                            <DownIcon />
                        </span>
                    </Col>
                </Row>
            </Popover>
        </span>
    )
}