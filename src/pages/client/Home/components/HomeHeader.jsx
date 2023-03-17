import { Button, Col, Row } from "antd"
import { memo } from "react"
import {  SearchIcon } from '../../../../components'


function HomeHeader({

}) {
    return (
        <Row
            justify='space-between'
            style={{
                height: 90,
            }}
        >
            <Col xs={18} sm={18} md={18} lg={18} xl={18}
                className='flex-col-center'
            >
                <Row justify='center'>
                    <Row style={{fontSize: 18, fontWeight: 600, lineHeight: '50px', cursor: 'pointer'}}>
                        <img src="/images/logo-app.png" alt="logo app"
                            style={{width: 50, marginRight: 4}}
                        />
                        Thiện Nguyện
                    </Row>
                    <Col
                        className="home-item-header flex-col-center"
                    >
                        <span>
                            Trang chủ
                        </span>
                    </Col>
                    <Col
                        className="home-item-header flex-col-center"
                    >
                        <span>
                            Toàn bộ các dự án
                        </span>
                    </Col>
                    <Col
                        className="home-item-header flex-col-center"
                    >
                        <span>
                            Liên hệ
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}
                className='flex-col-center'
            >
                <Row>
                    <Col className="flex-col-center">
                        <span style={{cursor: 'pointer'}}>
                            <SearchIcon fontSize={26} />
                        </span>
                    </Col>
                    <Col
                        className="flex-col-center"
                    >
                        <span style={{fontWeight: '600', margin: '0 30px', cursor: 'pointer'}}>
                            Đăng nhập
                        </span>
                    </Col>
                    <Button type='primary'
                        className="btn-app app-hover"
                        style={{
                            fontWeight: '600',
                        }}
                    >
                        Đăng ký
                    </Button>
                </Row>
            </Col>
        </Row>
    )
}

export default memo(HomeHeader)