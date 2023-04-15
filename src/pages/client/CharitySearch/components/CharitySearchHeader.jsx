import { Col, Input, Popover, Row } from "antd"
import { memo, useState } from "react"
import { FilterIcon, SearchIcon, Tag } from "../../../../components"

function CharitySearchHeader() {

    return (
        <Row
            style={{ height: 300, background: '#fff'}}
            justify={'center'}
        >
            <Col xs={21} sm={21} md={21} lg={21} xl={21}>
                <Row  
                    style={{height: '300px'}}
                >
                    <Col xs={16} sm={16} md={16} lg={16} xl={16}
                        className="flex-col-center"
                    >
                        <Row className="h1-app" 
                            style={{ marginBottom: 50 }}
                        >
                            <Col>
                                <div style={{fontSize: 32, marginBottom: 10}}>
                                    Tìm kiếm tổ chức từ thiện
                                </div>
                                <div style={{fontSize: 20}}>
                                    Những nơi bạn có thể đóng góp và giúp đỡ những người cần thiết
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <span style={{ width: '60%', position: 'relative' }}>
                                <Input
                                    className="input-app"
                                    style={{ width: '100%', margin: 'auto', height: 56, background: '#fff', boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)', padding: '28px 60px 28px 55px', borderRadius: '50px' }}
                                    placeholder='Nhập tên tổ chức'
                                />
                                <SearchIcon
                                    fontSize={26}
                                    style={{ position: 'absolute', left: 20, top: 15 }}
                                />
                                <span
                                    style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
                                    onClick={() => {

                                    }}
                                >
                                    <button
                                        className="btn-primary"
                                        style={{borderRadius: 50}}
                                    >
                                        Tìm kiếm
                                    </button>
                                </span>
                                
                            </span>
                        </Row>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} 
                        style={{height:'100%'}}
                    >
                        <img src="/images/charity-search.png" alt="charity search" 
                            style={{height: '100%'}}
                        />
                    </Col>
                </Row>
              
            </Col>
        </Row>
    )
}

export default memo(CharitySearchHeader)