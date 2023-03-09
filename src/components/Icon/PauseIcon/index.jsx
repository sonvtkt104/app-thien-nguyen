export function PauseIcon({
    style,
    color="#44B3CF",
    fontSize=18
}) {
    return (
        <svg style={style} width={`${fontSize}`} height={`${fontSize}`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.28125 1.25202C5.81875 0.927073 5.2375 0.91636 4.76562 1.21988C4.29375 1.5234 4 2.09472 4 2.71604V15.2852C4 15.9066 4.29375 16.4779 4.76562 16.7814C5.2375 17.0849 5.81875 17.0706 6.28125 16.7493L15.2812 10.4647C15.7281 10.154 16 9.60054 16 9.00065C16 8.40075 15.7281 7.85085 15.2812 7.53662L6.28125 1.25202Z" fill={color}/>
        </svg>
    )
}