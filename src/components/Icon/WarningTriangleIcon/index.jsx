export function WarningTriangleIcon({
    style,
    color="#FFB721",
    fontSize=16,
}) {
    return (
        <svg style={style} width={`${fontSize}`} height={`${fontSize}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4783_1903)">
                <path d="M15.8219 13.0312L9.15625 1.65625C8.64594 0.78125 7.35813 0.78125 6.84438 1.65625L0.181876 13.0312C-0.330937 13.9031 0.307782 15 1.33563 15H14.6669C15.6906 15 16.3313 13.9062 15.8219 13.0312ZM7.25 5.25C7.25 4.83594 7.58594 4.5 8 4.5C8.41406 4.5 8.75 4.8375 8.75 5.25V9.25C8.75 9.66406 8.41406 10 8.02813 10C7.64219 10 7.25 9.66562 7.25 9.25V5.25ZM8 13C7.4575 13 7.0175 12.56 7.0175 12.0175C7.0175 11.475 7.45719 11.035 8 11.035C8.54281 11.035 8.9825 11.475 8.9825 12.0175C8.98125 12.5594 8.54375 13 8 13Z" fill={color} />
            </g>
            <defs>
                <clipPath id="clip0_4783_1903">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}