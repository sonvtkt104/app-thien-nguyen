import { Input } from "antd"

const { TextArea } = Input;

export function TextAreaApp ({
    showCount,
    style,
    className,
    onChange,
    value,
    placeholder
}) {

    return (
        <TextArea 
            className={className ?  `${className} textarea-app` : 'textarea-app' }
            showCount={showCount ? true : false}
            style={{
                borderRadius: 4,
                minHeight: 40,
                ...style
            }}
            autoSize
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }} 
        />
    )
}