export function Card ({
    style, 
    children, 
    title, 
    className
}) {
    return (
        <div 
            className={className ? `${className} "card-app"` : "card-app"}
            style={{
                background: '#FFFFFF',
                boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)',
                borderRadius: 20,
                ...style
            }}
        >
            {
                title ? (
                    <div 
                        className="card-app-title"
                        style={{
                            padding: "15px 20px 15px 22px", 
                            borderBottom: '1px solid #DADFE9',
                            fontSize: 20,
                            fontWeight:'600'
                        }}
                    >
                        {title}
                    </div>
                ) : ''
            }
            <div>
                {children}
            </div>
        </div>
    )
}