import { Col, Form, Input, Popover, Row } from "antd"
import { memo, useState } from "react"
import { FilterIcon, SearchIcon, Tag } from "../../../../components"
import { useNavigate } from "react-router-dom"

function CharityBanner() {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    return (
        <Row
            style={{ height: 300, background: '#f0f0f0'}}
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
                                    Danh sách các tổ chức từ thiện
                                </div>
                                <div style={{fontSize: 20}}>
                                    Những nơi bạn có thể đóng góp và giúp đỡ những người cần thiết
                                </div>
                            </Col>
                        </Row>
                        <Form
                            name="basic"
                            onFinish={() => {
                                console.log("finish")
                            }}
                        >
                            <Row>
                                <span style={{ width: '60%', position: 'relative' }}>
                                    <Input
                                        className="input-app"
                                        style={{ width: '100%', margin: 'auto', height: 56, background: '#fff', boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)', padding: '28px 60px 28px 55px', borderRadius: '50px' }}
                                        placeholder='Nhập tên tổ chức'
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
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
                                            onClick={() => {
                                                console.log("finish")
                                                let url ='/charity-search?s=' + search
                                                url = url?.trim()?.replaceAll("  ", "-")?.replaceAll(" ", "-")
                                                console.log(url)
                                                navigate(url)
                                            }}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </span>
                                    
                                </span>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} 
                        style={{height:'100%'}}
                    >
                        <img src="/images/charity-banner-list.png" alt="charity banner" 
                            style={{height: '100%'}}
                        />
                    </Col>
                </Row>
              
            </Col>
        </Row>
    )
}

export default memo(CharityBanner)