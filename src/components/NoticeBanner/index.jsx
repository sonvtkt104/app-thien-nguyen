import { Row, Col } from "antd";
import { useMemo, useState } from "react";

export function NoticeBanner({
    type, // success | error | warning | info
    success,
    error,
    warning,
    info,
    children,
    title,
    isClose,
    className,
    style,
}) {
    const [open, setOpen] = useState(true);

    if (success) type = "success";
    else if (error) type = "error";
    else if (warning) type = "warning";
    else if (info) type = "info";

    const icon = useMemo(() => {
        return {
            success: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 10.3L11.4 15.1C11 15.5 10.4 15.5 10 15.1L7.8 12.9C7.4 12.5 7.4 11.9 7.8 11.5C8.2 11.1 8.8 11.1 9.2 11.5L10.7 13L14.8 8.9C15.2 8.5 15.8 8.5 16.2 8.9C16.6 9.3 16.6 9.9 16.2 10.3Z"
                        fill="#58CA8C"
                    />
                </svg>
            ),
            error: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 17C11.4 17 11 16.6 11 16C11 15.4 11.4 15 12 15C12.6 15 13 15.4 13 16C13 16.6 12.6 17 12 17ZM13 12C13 12.6 12.6 13 12 13C11.4 13 11 12.6 11 12V8C11 7.4 11.4 7 12 7C12.6 7 13 7.4 13 8V12Z"
                        fill="#FF372A"
                    />
                </svg>
            ),
            warning: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 17C11.4 17 11 16.6 11 16C11 15.4 11.4 15 12 15C12.6 15 13 15.4 13 16C13 16.6 12.6 17 12 17ZM13 12C13 12.6 12.6 13 12 13C11.4 13 11 12.6 11 12V8C11 7.4 11.4 7 12 7C12.6 7 13 7.4 13 8V12Z"
                        fill="#FFB721"
                    />
                </svg>
            ),
            info: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.444 8.55293H15.531C16.8176 8.55293 18.1041 8.56593 19.3896 8.55293C19.7132 8.55131 20.0337 8.61712 20.3304 8.74619C20.6272 8.87526 20.8937 9.06474 21.1131 9.30254C21.3324 9.54034 21.4997 9.82123 21.6043 10.1273C21.7089 10.4333 21.7485 10.7578 21.7206 11.08C21.6684 11.674 21.4252 12.2351 21.0273 12.6794C21.0071 12.6983 20.9935 12.7232 20.9886 12.7504C20.9838 12.7776 20.9879 12.8057 21.0003 12.8304C21.1832 13.3154 21.2476 13.8371 21.1883 14.352C21.129 14.867 20.9476 15.3604 20.6591 15.7913C20.6354 15.8357 20.6283 15.8871 20.6391 15.9362C20.7638 16.4097 20.7743 16.9059 20.67 17.3843C20.5656 17.8626 20.3494 18.3095 20.0389 18.6882C20.0161 18.7126 19.9997 18.7423 19.9913 18.7746C19.9829 18.8069 19.9828 18.8408 19.9909 18.8731C20.1107 19.3398 20.0681 19.8334 19.8698 20.2726C19.7436 20.5251 19.562 20.7458 19.3386 20.9184C18.9267 21.2247 18.4457 21.4248 17.938 21.5012C16.9911 21.651 16.0317 21.7066 15.0739 21.6671C14.3984 21.6669 13.7259 21.5791 13.073 21.4062C12.3341 21.2013 11.6117 20.9406 10.9122 20.6265C10.3113 20.3366 9.68884 20.0936 9.05041 19.8998C8.87757 19.8559 8.7011 19.8278 8.52318 19.8158C8.44763 19.8219 8.37166 19.8112 8.30074 19.7845C8.22982 19.7577 8.16574 19.7156 8.11311 19.6611C8.06047 19.6065 8.02059 19.541 7.99636 19.4693C7.97213 19.3975 7.96414 19.3212 7.97297 19.246C7.97297 17.9132 7.97297 16.5783 7.97297 15.2415C7.97297 13.8533 7.97297 12.4652 7.97297 11.077C7.96803 10.9882 7.98217 10.8993 8.01443 10.8164C8.0467 10.7334 8.09636 10.6583 8.16006 10.5962C8.96432 9.74989 9.68307 8.82642 10.3059 7.83917C10.7325 7.22465 11.2004 6.63984 11.7065 6.08881C11.8758 5.88936 12.0147 5.66604 12.1187 5.42605C12.3621 4.81353 12.5519 4.18106 12.6859 3.53575C12.7787 3.10144 12.9333 2.68267 13.1451 2.29222C13.2448 2.13592 13.359 1.98931 13.4862 1.85436C13.5378 1.8004 13.6 1.75758 13.6688 1.72852C13.7376 1.69947 13.8117 1.68479 13.8864 1.68542C14.3858 1.66019 14.8834 1.76165 15.333 1.98032C15.6873 2.16054 15.9896 2.42823 16.2113 2.75802C16.5073 3.22427 16.6795 3.75824 16.7115 4.30946C16.7978 4.94807 16.7263 5.59809 16.5034 6.20278C16.3384 6.62562 16.1133 7.02446 15.9222 7.43731C15.7682 7.77019 15.6221 8.10909 15.475 8.44497C15.4622 8.48019 15.4518 8.51626 15.444 8.55293Z"
                        fill="#44B3CF"
                    />
                    <path
                        d="M6.73244 16.0531V20.6965C6.74036 20.8235 6.72181 20.9507 6.67798 21.0702C6.63414 21.1897 6.56596 21.2987 6.47776 21.3905C6.38956 21.4823 6.28326 21.5548 6.16557 21.6035C6.04789 21.6521 5.92138 21.6758 5.79406 21.6731C4.75497 21.6844 3.71621 21.6844 2.67779 21.6731C2.55041 21.6761 2.42377 21.6529 2.30579 21.6048C2.1878 21.5567 2.08102 21.4848 1.9921 21.3936C1.90318 21.3025 1.83405 21.1939 1.78902 21.0748C1.74399 20.9557 1.72404 20.8286 1.73041 20.7015C1.73041 17.6026 1.73041 14.5037 1.73041 11.4048C1.72457 11.275 1.74586 11.1455 1.79293 11.0245C1.84 10.9034 1.9118 10.7934 2.00377 10.7016C2.09573 10.6098 2.20584 10.5382 2.32706 10.4913C2.44827 10.4444 2.57795 10.4232 2.7078 10.4292H5.77905C5.90595 10.425 6.03235 10.4469 6.15038 10.4937C6.26841 10.5405 6.37554 10.611 6.46508 10.7009C6.55463 10.7908 6.62467 10.8983 6.67084 11.0165C6.71701 11.1346 6.73832 11.2611 6.73344 11.3878L6.73244 16.0531ZM3.30304 19.178C3.3051 19.4216 3.40241 19.6549 3.57418 19.8278C3.74596 20.0008 3.97859 20.0997 4.22242 20.1036C4.34617 20.104 4.4688 20.0801 4.58328 20.0331C4.69777 19.9862 4.80188 19.9171 4.88966 19.8299C4.97745 19.7428 5.0472 19.6392 5.09492 19.5251C5.14264 19.411 5.16741 19.2886 5.1678 19.165C5.16422 18.9214 5.06615 18.6888 4.89427 18.5162C4.72239 18.3435 4.49012 18.2442 4.24643 18.2393C4.1225 18.2381 3.99957 18.2615 3.88478 18.3082C3.76999 18.3549 3.66563 18.4239 3.57776 18.5113C3.48989 18.5986 3.42027 18.7026 3.37294 18.817C3.32561 18.9315 3.30151 19.0541 3.30204 19.178H3.30304Z"
                        fill="#44B3CF"
                    />
                </svg>
            ),
        };
    }, []);

    const colorText = useMemo(() => {
        return {
            success: "#58CA8C",
            error: "#FF372A",
            warning: "#FFB721",
            info: "#44B3CF",
        };
    }, []);

    const backgroundColor = useMemo(() => {
        return {
            success: "rgba(88, 202, 140, 0.08)",
            error: "rgba(255, 55, 42, 0.08)",
            warning: "rgba(255, 183, 33, 0.08)",
            info: "rgba(68, 179, 207, 0.08)",
        };
    }, []);

    return (
        <Row
            justify="space-between"
            className={className}
            style={{
                padding: "12px 20px",
                borderRadius: 6,
                background: backgroundColor[type],
                width: "100%",
                flexWrap: "nowrap",
                display: open ? "flex" : "none",
                ...style,
            }}
        >
            <Col>
                <Row
                    style={{
                        flexWrap: "nowrap",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <span>{icon[type]}</span>
                    <span
                        style={{
                            lineHeight: "24px",
                            marginLeft: 14,
                            color: colorText[type],
                        }}
                    >
                        {title || children}
                    </span>
                </Row>
            </Col>
            <Col>
                {isClose ? (
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpen(false)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.1751 9.99991L16.4251 4.75824C16.582 4.60132 16.6702 4.3885 16.6702 4.16658C16.6702 3.94466 16.582 3.73183 16.4251 3.57491C16.2682 3.41799 16.0554 3.32983 15.8334 3.32983C15.6115 3.32983 15.3987 3.41799 15.2418 3.57491L10.0001 8.82491L4.75845 3.57491C4.60153 3.41799 4.3887 3.32983 4.16678 3.32983C3.94486 3.32983 3.73203 3.41799 3.57511 3.57491C3.41819 3.73183 3.33004 3.94466 3.33004 4.16658C3.33004 4.3885 3.41819 4.60132 3.57511 4.75824L8.82511 9.99991L3.57511 15.2416C3.497 15.319 3.43501 15.4112 3.3927 15.5128C3.3504 15.6143 3.32861 15.7232 3.32861 15.8332C3.32861 15.9433 3.3504 16.0522 3.3927 16.1537C3.43501 16.2553 3.497 16.3474 3.57511 16.4249C3.65258 16.503 3.74475 16.565 3.8463 16.6073C3.94785 16.6496 4.05677 16.6714 4.16678 16.6714C4.27679 16.6714 4.38571 16.6496 4.48726 16.6073C4.58881 16.565 4.68098 16.503 4.75845 16.4249L10.0001 11.1749L15.2418 16.4249C15.3192 16.503 15.4114 16.565 15.513 16.6073C15.6145 16.6496 15.7234 16.6714 15.8334 16.6714C15.9435 16.6714 16.0524 16.6496 16.1539 16.6073C16.2555 16.565 16.3476 16.503 16.4251 16.4249C16.5032 16.3474 16.5652 16.2553 16.6075 16.1537C16.6498 16.0522 16.6716 15.9433 16.6716 15.8332C16.6716 15.7232 16.6498 15.6143 16.6075 15.5128C16.5652 15.4112 16.5032 15.319 16.4251 15.2416L11.1751 9.99991Z"
                                fill="#96A2BA"
                            />
                        </svg>
                    </span>
                ) : (
                    ""
                )}
            </Col>
        </Row>
    );
}
