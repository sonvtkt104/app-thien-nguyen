import { Row } from "antd"

export function Header({
    style,
    children,
    className,
    title,
}) {
    return (
        <Row
            className={className}
            style={{
                fontSize: 20,
                fontWeight: "700",
                lineHeight: '30px',
                ...style
            }}
        >   
            { title || children }
        </Row>
    )
}
