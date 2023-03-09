import { Row, Col, Popover } from "antd"
import { useMemo, useState } from "react";
import { DownIcon, FilterIcon } from "../Icon";
import { Checkbox } from '../Checkbox'
import { CheckboxMultiple } from "../CheckboxMultiple";
// import "./index.css"

export function FilterMultiple({
    style,
    className,
    options,  //{ value: any; label: string; }[]
    value,
    onApply,
    onReset,
    icon
}) {
    const [open, setOpen] = useState(false)
    const [valueSelects, setValueSelects] = useState(value || [])
    const [valueApply, setValueApply] = useState(value || [])

    const title = useMemo(() => {
        console.log("useMemo valueApply: ", valueApply)
        if(valueApply.length == 0) 
            return 'All'
        else if(valueApply.length > 1) 
            return 'Mixed'
        else {
            let arr = options.filter(option => option.value == valueApply[0])
            return arr[0]?.label
        }
    }, [valueApply])


    console.log("valueSelect" , valueSelects)
    console.log("valueApply", valueApply)

    return (
        <span className={className ? `${className} filter-multiple-app-custom` : 'filter-multiple-app-custom'}>
            <Popover 
                trigger="click"
                placement="bottom"
                open={open}
                onOpenChange={(i) => {
                    if(!i) {
                        setValueSelects(valueApply)
                    }
                    setOpen(i)
                }}
                content={open ? (
                    <div style={{minWidth: 270, paddingTop: 7}}>
                        <CheckboxMultiple 
                            options={options}
                            value={valueSelects}
                            onChange={(value) => {
                                setValueSelects(value)
                            }}
                        />
                        <Row justify='space-between' style={{paddingTop: 8, margin: '0 16px', borderTop: '1px solid #DADFE9'}}>
                            <span style={{lineHeight: '32px', cursor: 'pointer', color: '#C9C9C9'}}
                                onClick={() => {
                                    setValueSelects([])
                                    setValueApply([])
                                    onReset()
                                    setOpen(false)
                                }}
                            >
                                Reset
                            </span>
                            <span
                                style={{fontSize: 12, lineHeight: '18px', padding: "6px 10px", border: '1px solid #DADFE9', borderRadius: 4, cursor: 'pointer'}}
                                onClick={()=> {
                                    setValueApply(valueSelects)
                                    onApply(valueSelects)
                                    setOpen(false)
                                }}
                            >
                                Apply
                            </span>
                        </Row>
                    </div>
                ) : ""}
            >
                <Row 
                    justify='space-between'
                    style={{
                        lineHeight: '24px', 
                        padding: '6px 20px',
                        border: '1px solid #ECEBED',
                        width: 270,
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