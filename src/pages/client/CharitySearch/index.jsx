import { Col, Row } from "antd";
import { FooterClient, HeaderClient } from "../../../components";
import CharitySearchHeader from "./components/CharitySearchHeader";


import './css/index.css'
import { useState } from "react";

export default function CharitySearch() {
    const [totalSearch, setTotalSearch] = useState(12)

    return (
        <div className="charity-search-app"
            style={{minHeight: '100vh', background: 'var(--color-background-header)'}}
        >
            <HeaderClient />
            <CharitySearchHeader />
            <div 
                style={{padding:'16px 0 40px'}}
            >
                <Row
                    justify='center'
                >
                    <Col xs={21} sm={21} md={21} lg={21} xl={21}>
                        <Row>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}
                                style={{paddingRight: 15}}
                            >
                                <div
                                    style={{
                                        borderRadius: 8,
                                        padding: 24,
                                        boxShadow: '-1px 1px 6px rgba(0,0,0,.05)',
                                        background: '#fff'
                                    }}
                                >
                                    <div style={{marginBottom: 24}}>
                                        {
                                            totalSearch > 0 
                                            ? (
                                                <>Tìm thấy <span style={{fontWeight: 600, color: 'var(--color-blue)', fontSize: 16}}>{totalSearch}</span> tổ chức từ thiện</>
                                            )
                                            : "Không tìm thấy tổ chức từ thiện nào phù hợp với yêu cầu của bạn. Xem thêm các tổ chức từ thiện nổi bật khác."
                                        }
                                    </div>
                                    {
                                        [1,2,3,4,5,6,7,8,9].map((item, i) => (
                                            <Row
                                                className="charity-search-item"
                                                key={i}
                                                style={{padding: 16, marginBottom: 20, borderRadius: 5, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', flexWrap: 'nowrap'}}
                                            >
                                                <img 
                                                    src="https://cdn.topcv.vn/60/company_logos/cong-ty-co-phan-smartosc-61d50e76c4aec.jpg" 
                                                    alt="charity-logo" 
                                                    style={{
                                                        width: 80, height: 80, 
                                                        borderRadius: 4,
                                                        background: "#FFFF",
                                                        objectFit: "contain",
                                                        filter: 'drop-shadow(-1px 1px 6px rgba(0,0,0,.05))',
                                                        border: '1px solid #f7f7f7',
                                                        marginRight: 16
                                                    }}
                                                />
                                                <Col
                                                    style={{padding: '7px 0'}}
                                                >
                                                    <div style={{fontWeight: '600', fontSize: 16}}>
                                                        Tổ chức Áo ấm trao em 
                                                        <span style={{margin: '0 10px', position:'relative', bottom: 4}}>.</span>
                                                        <span style={{color: "var(--color-blue)", cursor: 'pointer'}}
                                                            onClick={() => {

                                                            }}
                                                        > 
                                                            Theo dõi 
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            lineHeight: '20px',
                                                            WebkitLineClamp: 2,
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical'
                                                        }}
                                                    >
                                                        Chúng tôi hoạt động với mục đích giúp đỡ những trẻ em khó khăn và gia đình nghèo trong cộng đồng. Chúng tôi cố gắng cung cấp cho các em cơ hội học tập và phát triển bản thân để họ có thể có một tương lai tốt đẹp hơn. Chân thành cảm ơn sự quan tâm và hỗ trợ của các bạn!
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}
                                style={{paddingLeft: 15}}
                            >
                                <div
                                    style={{
                                        borderRadius: 8,
                                        padding: 24,
                                        boxShadow: '-1px 1px 6px rgba(0,0,0,.05)',
                                        background: '#fff'
                                    }}
                                >
                                    <div style={{fontSize: 16, fontWeight: '600', marginBottom: 20, textAlign: 'center'}}>Tổ chức từ thiện nổi bật</div>
                                    <Row
                                        justify='center'
                                    >
                                        {
                                            [1,2,3,4,5,6].map((item, i) => (
                                                <div
                                                    style={{padding: 15, background: "#FFFF", borderRadius: '50%',
                                                        filter: 'drop-shadow(-1px 1px 6px rgba(0,0,0,.05))',
                                                        border: '1px solid #f7f7f7',
                                                        margin: '0 10px 16px'
                                                    }}
                                                >
                                                    <img 
                                                        src="https://cdn.topcv.vn/60/company_logos/cong-ty-co-phan-smartosc-61d50e76c4aec.jpg" 
                                                        alt="charity-logo" 
                                                        style={{
                                                            width: 60, height: 60, 
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Row>   
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <FooterClient />
        </div>
    )
}

