import "./index.css"
import { Segmented } from 'antd';

export function SegmentedApp({
    options=['Home', 'Product', 'Collection', 'Blog', 'Blog post'],
    className,
    style,
    value,
    onChange,
}) {
    return (
        <span className="segmented-app">
            <Segmented 
                className={className}
                style={style}
                options={options} 
                value={value}
                onChange={(value) => onChange(value)}
            />
        </span>
    )
}