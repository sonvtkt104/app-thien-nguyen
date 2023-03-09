export function Tag({
    title='Tag',
    background='rgba(88, 202, 140, 0.08)',
    color='#58CA8C',
    style,
    className
}) {
    return (
        <span
            className={className}
            style={{
                padding: '2px 10px', 
                borderRadius: 4,
                fontSize: 12, 
                lineHeight: '18px',
                color: color,
                background: background,
                ...style,
            }}
        >
            {title}
        </span>
    )
}