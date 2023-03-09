import "./index.css";

export function Button({
    onClick,
    children,
    title,
    color,
    padding,
    background,
    borderRadius,
    minWidth,
    border,
    isDisabled,
    fontWeight,
    className,
    style,
}) {
    return (
        <button
            className={className ? `${className} btn-hover` : "btn-hover"}
            style={{
                padding: padding || "10px 0px",
                lineHeight: "20px",
                fontWeight: fontWeight || "600",
                textAlign: "center",
                margin: "0 auto",
                minWidth: minWidth || 190,
                whiteSpace: "nowrap",
                background: background || "#ffffff",
                color: color || "#58CA8C",
                borderRadius: borderRadius || 12,
                border: border || "none",
                ...style,
            }}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children || title}
        </button>
    );
}
