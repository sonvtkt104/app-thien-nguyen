import { Button, Checkbox, Form, Input, Table, Select,Col, Row, Modal} from 'antd';
import { useState } from 'react'
import { updatePassWord } from '../../../client/MyAccount/MyAccountService';
import { getUserInfomationFromCookies, getInfoOfUserFromCookies } from '../../../Authentication/HandleUserInfomation';
import { toast } from "react-toastify";
import { forgetPassword, resetCode, resetPassword } from '../SettingsService';

export default function ItemPassword({
    style,
    className,
    content    // {key: any, icon: any, name: string, ga: string, message: string, link: string}
}) {
    const [formPassWord] = Form.useForm();

    const [openDialogChangePassword, setOpenDialogChangePassword] = useState(false)
    const [openDialogForgotpassword, setOpenDialogForgotpassword] = useState(false)

    const onFinishPassword = (values) => {
        console.log('Success:', values);
        console.log(values.newPassword === values.confirmNewPassword)
        if (values.newPassword === values.confirmNewPassword) {
            updatePassWord(getInfoOfUserFromCookies().id, values).then(res => {
                console.log(res)
                // reloadRef.current = Math.random().toString(36).slice(-5)
                if (res.status === 200) {
                    formPassWord.resetFields()
                    toast.success("Đổi mật khẩu thành công.")
                    setOpenDialogChangePassword(false)
                } else {
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                }
            })
                .catch(error => {
                    console.log(error)
                    if (error?.response?.status === 400) {
                        error?.response?.data?.message ? toast.warning("Mật khẩu mới không được trùng với mật khẩu cũ") :
                            toast.error("Mật khẩu hiện tại chưa chính xác!")
                    } else {
                        // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    }

                })
        }
    };

    const onFinishFailedPassword = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
 
    const onFinishForgotpassword = (values) => {
        console.log('Success:', values);
        console.log(values.newPassword === values.confirmNewPassword)
        if (values.newPassword === values.confirmNewPassword) {
            const dataResetCode = {
                id: getInfoOfUserFromCookies().id.toString(),
                code: values.code
            }
            resetCode(dataResetCode).then(res => {
                if (res?.status === 200) {
                    const dataResetPassword = {
                        id: getInfoOfUserFromCookies().id.toString(),
                        password: values.newPassword,
                        confirmPassword: values.confirmNewPassword,
                    }
                    console.log(dataResetPassword);
                    resetPassword(dataResetPassword).then(res => {
                        if (res?.status === 200) {

                            toast.success("Đổi mật khẩu thành công.")
                        } else {
                            toast.error("Hệ thống lỗi, xin thử lại sau!")
                        }
                    })
                } else {
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                }
            })
                // .catch(error => {
                //     console.log(error)
                //     if (error?.response?.status === 400) {
                //         error?.response?.data?.message ? toast.warning("Mật khẩu mới không được trùng với mật khẩu cũ") :
                //             toast.error("Mật khẩu hiện tại chưa chính xác!")
                //     } else {
                //         // toast.error("Hệ thống lỗi, xin thử lại sau!")
                //     }

                // })
        }
    };

    const onFinishFailedForgotpassword = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // console.log(getInfoOfUserFromCookies());
    const confirmForgotpassword =() => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn quên mật khẩu?`,
            okText: "Có",
            cancelText: "Quay lại",
            okType: "danger",
            onOk: () => {
                forgetPassword(getInfoOfUserFromCookies().userName).then(res => console.log(res))
                setOpenDialogForgotpassword(true)
            }
        });
    
    }




    return (
       <>
         <Col
            className={className ? `${className} item-quick-support-home` : 'item-quick-support-home'}
            style={{
                background: '#ffffff',
                boxShadow: '0px 0px 40px rgba(56, 56, 58, 0.06)',
                borderRadius: 8,
                padding: '8px 20px',
                cursor: 'pointer',
                marginTop: 17,
                flexBasis: '48%',
                transition: 'all 0.2s',
                ...style
            }}
            onClick={() => {
                //    console.log("haikhuat")
                if (content.name === "Thay đổi mật khẩu") {
                    console.log("Thay đổi mật khẩu")
                    setOpenDialogChangePassword(true)

                } else {
                    console.log("Quên mật khẩu")
                    confirmForgotpassword()


                }
            }}
        >
            <Row>
                <span>{content.icon}</span>
                <span className="flex-col-center" style={{ marginLeft: 16 }}>{content.name}</span>
                {
                    content.recommend ? (
                        <span
                            className='flex-col'
                            style={{ marginLeft: 8 }}
                        >
                            <Row
                                style={{
                                    padding: '2px 10px 2px 6px',
                                    background: 'rgba(255, 183, 33, 0.15)',
                                    borderRadius: 4,
                                    color: '#FFB721',
                                }}
                            >
                                <span style={{ marginRight: 4, marginTop: '-2px' }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.01637 14.0051C3.03862 13.871 3.06798 13.6859 3.0998 13.5015C3.22586 12.7655 3.35276 12.0296 3.48046 11.2938C3.48485 11.2747 3.48364 11.2547 3.47696 11.2363C3.47027 11.2179 3.45837 11.2018 3.44275 11.19C2.8071 10.5706 2.17188 9.95077 1.53706 9.33054C1.4405 9.24662 1.37375 9.13367 1.34679 9.00861C1.31983 8.88355 1.33411 8.75312 1.38752 8.63687C1.42562 8.54338 1.48802 8.46176 1.56825 8.40048C1.64849 8.3392 1.74365 8.30048 1.84388 8.28834C2.7061 8.16021 3.56853 8.03415 4.43116 7.91014C4.47504 7.90802 4.51739 7.8934 4.55324 7.868C4.5891 7.8426 4.61694 7.80748 4.6335 7.76678C5.01013 6.99247 5.39264 6.22187 5.7736 5.44941C5.81375 5.35574 5.87675 5.27365 5.95686 5.21065C6.03696 5.14765 6.13161 5.10577 6.2321 5.08883C6.35126 5.06489 6.47496 5.07957 6.5852 5.13075C6.69544 5.18192 6.78648 5.26693 6.84509 5.3734C7.01163 5.6864 7.16425 6.00681 7.32151 6.32506C7.56869 6.82644 7.81587 7.32823 8.06304 7.83043C8.07105 7.84982 8.08436 7.86655 8.10147 7.87869C8.11858 7.89082 8.13879 7.89788 8.15974 7.89902C9.04235 8.02694 9.92475 8.1563 10.8069 8.2871C10.9193 8.29809 11.0259 8.3421 11.1132 8.41359C11.2006 8.48507 11.2649 8.58083 11.2979 8.68878C11.339 8.79254 11.348 8.90622 11.324 9.01519C11.2999 9.12416 11.2438 9.22343 11.1629 9.30025C10.8462 9.61479 10.5252 9.9247 10.2051 10.2368C9.88036 10.5541 9.55626 10.8717 9.22969 11.1872C9.21178 11.2024 9.19846 11.2224 9.19126 11.2447C9.18405 11.2671 9.18322 11.2911 9.18888 11.3139C9.28816 11.8849 9.38673 12.4561 9.48457 13.0275C9.54018 13.3519 9.60104 13.6764 9.64584 14.0017C9.66168 14.1057 9.64742 14.212 9.60477 14.308C9.56212 14.4041 9.49288 14.486 9.40518 14.544C9.32242 14.611 9.22197 14.6525 9.11605 14.6635C9.01013 14.6745 8.90329 14.6544 8.80856 14.6058C8.31792 14.3586 7.83348 14.0975 7.34686 13.842C7.0243 13.6727 6.70112 13.504 6.3798 13.3322C6.36391 13.323 6.34568 13.3185 6.32734 13.3193C6.30899 13.3202 6.29128 13.3262 6.27627 13.3368C5.49521 13.75 4.71396 14.1629 3.93248 14.5755C3.84762 14.6273 3.75122 14.6572 3.65195 14.6626C3.55269 14.668 3.45363 14.6487 3.36366 14.6064C3.25007 14.5552 3.15544 14.4696 3.09313 14.3617C3.03081 14.2538 3.00395 14.1291 3.01637 14.0051V14.0051Z" fill="#FFB721" />
                                        <path opacity="0.54" d="M10.0787 1.33386C10.1167 1.33137 10.1544 1.34181 10.1857 1.36346C10.217 1.38512 10.24 1.41672 10.2511 1.45314C10.3336 1.64872 10.4133 1.84553 10.4952 2.04019C10.5842 2.25277 10.6716 2.46567 10.7665 2.67547C10.7909 2.71203 10.8268 2.73943 10.8684 2.75334C11.255 2.91648 11.643 3.07651 12.0302 3.23842C12.0543 3.24451 12.0769 3.25572 12.0964 3.27127C12.1159 3.28682 12.1318 3.30635 12.1431 3.32857C12.1544 3.35078 12.1608 3.37518 12.1619 3.40008C12.163 3.42498 12.1587 3.44983 12.1494 3.47295C12.1204 3.52774 12.0738 3.57125 12.0172 3.59655C11.6341 3.76154 11.2478 3.92035 10.8623 4.07916C10.8355 4.08873 10.8112 4.10404 10.7911 4.12401C10.7709 4.14397 10.7553 4.16811 10.7455 4.19473C10.5867 4.58312 10.422 4.96903 10.2622 5.35681C10.2513 5.39769 10.2273 5.43385 10.1938 5.4597C10.1603 5.48555 10.1192 5.49967 10.0769 5.49987C10.0348 5.49866 9.99419 5.4839 9.96113 5.45779C9.92807 5.43169 9.9043 5.39564 9.89335 5.35496C9.733 4.9644 9.56865 4.57539 9.40984 4.18453C9.4006 4.16027 9.38611 4.13837 9.36741 4.12037C9.34872 4.10237 9.32626 4.08872 9.30167 4.08041C8.91114 3.92005 8.52124 3.75752 8.13133 3.59593C8.09452 3.58556 8.06176 3.56421 8.03741 3.53473C8.01307 3.50525 7.99828 3.46903 7.99506 3.43093C7.99069 3.38756 8.00199 3.34404 8.02685 3.30824C8.05172 3.27243 8.08856 3.24669 8.13072 3.23565C8.5228 3.07251 8.91455 2.90905 9.30756 2.74838C9.33099 2.74011 9.3523 2.72677 9.36998 2.7093C9.38765 2.69183 9.40129 2.67068 9.40984 2.64735C9.5705 2.25402 9.73422 1.86191 9.89705 1.46981C9.90751 1.42995 9.93119 1.39481 9.96418 1.37012C9.99717 1.34543 10.0375 1.33265 10.0787 1.33386V1.33386Z" fill="#FFB721" />
                                        <path opacity="0.54" d="M11.3256 7.13903C11.3212 7.07569 11.3809 7.0383 11.4532 7.00833C11.7566 6.88474 12.059 6.75558 12.3637 6.63353C12.3869 6.62501 12.408 6.61145 12.4253 6.59382C12.4427 6.57619 12.4559 6.55493 12.4641 6.53157C12.5902 6.22537 12.7196 5.92072 12.8441 5.6139C12.8523 5.58057 12.8713 5.55085 12.898 5.52931C12.9247 5.50777 12.9578 5.49559 12.9921 5.49463C13.0266 5.49545 13.0599 5.50743 13.087 5.52876C13.1142 5.55009 13.1336 5.57964 13.1426 5.61297C13.2705 5.91855 13.4 6.22352 13.5254 6.53003C13.5337 6.55339 13.5471 6.57463 13.5646 6.59225C13.582 6.60987 13.6031 6.62343 13.6264 6.63199C13.9305 6.75558 14.2332 6.88505 14.5363 7.01204C14.5483 7.01614 14.56 7.0211 14.5712 7.02687C14.5993 7.03905 14.6232 7.05905 14.6401 7.08448C14.657 7.10991 14.6663 7.13969 14.6667 7.17023C14.6663 7.19964 14.6567 7.22819 14.6393 7.25186C14.6218 7.27553 14.5974 7.29312 14.5694 7.30217C14.3599 7.39033 14.1503 7.47829 13.9406 7.56604C13.8334 7.61084 13.7244 7.6507 13.619 7.70076C13.5798 7.71984 13.548 7.75149 13.5288 7.79067C13.3981 8.09749 13.2727 8.40617 13.1457 8.71422C13.099 8.82731 13.0066 8.86871 12.9198 8.81031C12.8922 8.78934 12.8709 8.76125 12.858 8.72905C12.7252 8.42007 12.5939 8.11109 12.4641 7.80211C12.456 7.7787 12.4429 7.75733 12.4258 7.7395C12.4086 7.72167 12.3877 7.70782 12.3646 7.69891C12.0513 7.57037 11.7405 7.43503 11.4281 7.30341C11.3946 7.29222 11.366 7.26969 11.3473 7.23968C11.3285 7.20968 11.3209 7.17408 11.3256 7.13903V7.13903Z" fill="#FFB721" />
                                    </svg>
                                </span>
                                <span style={{ fontSize: 12 }}>Recommend</span>
                            </Row>
                        </span>
                    ) : ""
                }
            </Row>
        </Col>

        {
            openDialogChangePassword && (
                <Modal
                    title={<span className="h2-app">Thay đổi mật khẩu</span>}
                    cancelText="Quay lại"
                    okText="Tạo"
                    centered
                    width={650}
                    open={openDialogChangePassword}
                    maskClosable={false}
                    footer={null}
                    // onOk={() => {

                    //     // onClose() 
                    // }}
                    onCancel={() => { setOpenDialogChangePassword(false) }}
                    className="dpd-modal"
                >
                    <Form
                        form={formPassWord}
                        layout={"vertical"}
                        name="basic"
                        style={{
                            width: "100%",
                            // padding: "10px 0 10px 20px",
                            flexWrap: "wrap"
                        }}
                        initialValues={{
                            // remember: true,
                        }}
                        onFinish={onFinishPassword}
                        onFinishFailed={onFinishFailedPassword}
                        autoComplete="off"
                    >

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Mật khẩu hiện tại"
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mật khẩu hiện tại!',
                                },
                            ]}
                        >
                            <Input.Password className="input-app" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Mật khẩu mới"
                            hasFeedback
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mật khẩu mới!',
                                },
                            ]}
                        >
                            <Input.Password className="input-app" />
                        </Form.Item>



                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Xác nhận mật khẩu mới"
                            hasFeedback
                            name="confirmNewPassword"

                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Xác nhận mật khẩu mới!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Mật khẩu xác nhận không xhính xác")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="input-app" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 0,
                                offset: 0,
                            }}
                            
                        >
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    style={{ marginRight: 10 }}
                                    onClick={() => {
                                        setOpenDialogChangePassword(false)
                                    }}
                                    className="btn"
                                >
                                    Quay lại
                                </Button>
                                <Button type="primary" htmlType="submit" className="btn-primary">
                                    Lưu
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                
            )

        }

        {
            openDialogForgotpassword && (
                <Modal
                    title={"Quên mật khẩu"}
                    cancelText="Quay lại"
                    okText="Tạo"
                    centered
                    width={650}
                    open={openDialogForgotpassword}
                    maskClosable={false}
                    footer={null}
                    // onOk={() => {

                    //     // onClose() 
                    // }}
                    onCancel={() => { setOpenDialogForgotpassword(false) }}
                    className="dpd-modal"
                >
                    <Form
                        form={formPassWord}
                        layout={"vertical"}
                        name="basic"
                        style={{
                            width: "100%",
                            padding: "10px 0 10px 20px",
                            flexWrap: "wrap"
                        }}
                        initialValues={{
                            // remember: true,
                        }}
                        onFinish={onFinishForgotpassword}
                        onFinishFailed={onFinishFailedForgotpassword}
                        autoComplete="off"
                    >

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Mật khẩu mới"
                            hasFeedback
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mật khẩu mới!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Xác nhận mật khẩu mới"
                            hasFeedback
                            name="confirmNewPassword"

                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Xác nhận mật khẩu mới!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Mật khẩu xác nhận không xhính xác")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Nhập code"
                            hasFeedback
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập code!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 0,
                                offset: 0,
                            }}
                            
                        >
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    style={{ marginRight: 10 }}
                                    onClick={() => {
                                        setOpenDialogChangePassword(false)
                                    }}
                                >
                                    Quay lại
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Lưu thay đổi mật khẩu
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                
            )

        }
       </>
    )
}