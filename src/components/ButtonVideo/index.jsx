import { PauseIcon } from "../Icon";

export function ButtonVideo({
    title='How to use Bulk Meta Tags',
    style,
    className,
    children
}) {
    return (
        <button 
            className={className ? `${className} btn-hover` : "btn-hover"}
            style={{ 
                border: 'none',
                background: '#ffffff',
                boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)',
                borderRadius: 12,
                padding: '8px 20px',
                color: '#44B3CF',
                ...style
            }}
        >
            <PauseIcon />
            <span style={{marginLeft: 10}}>{title || children}</span>
        </button>
    )
}