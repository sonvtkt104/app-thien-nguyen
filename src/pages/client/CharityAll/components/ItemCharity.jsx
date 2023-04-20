import { Row } from "antd"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

function ItemCharity({

}) {

    const navigate = useNavigate()
    return (
        <div
            style={{position: 'relative',}}
        >
            <div
                className="box-shadow-app"
                style={{ 
                    background:"#ffffff",
                    boxShadow: '-1px 1px 4px rgba(0,0,0,.051)',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    navigate("/profile-charity")
                }}
            >
                <div
                    style={{height: 150, position: "relative", marginBottom: 40}}
                >
                    <img src="https://static.topcv.vn/company_covers/vo6nTAkXLiLrOizCgyN2.jpg" alt="banner charity" 
                        style={{ height: '100%', width: '100%', objectFit: 'cover', verticalAlign: 'middle' }}
                    />
                    <span style={{position: 'absolute', zIndex: 1, background: '#ffffff', borderRadius:"50%", height: 50, width: 50, left: 30, bottom: '-25px', border: '1px solid var(--color-border)'}}>
                        <img src="/images/logo.png" alt="logo" 
                            style={{height:50, width: 50, borderRadius: '50px', objectFit: 'cover'}}
                        />
                    </span>
                </div>
                <div
                    style={{
                        padding: '0 20px 30px'
                    }}
                >
                    <div
                        style={{fontSize: 16, fontWeight: '700',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        TỔ CHỨC ÁO ẤM TRAO EM
                    </div>
                    <div
                        style={{marginTop: 15, lineHeight: '21px',
                            WebkitLineClamp: 6,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        Chúng tôi hoạt động với mục đích giúp đỡ những trẻ em khó khăn và gia đình nghèo trong cộng đồng. Chúng tôi cố gắng cung cấp cho các em cơ hội học tập và phát triển bản thân để họ có thể có một tương lai tốt đẹp hơn. Chân thành cảm ơn sự quan tâm và hỗ trợ của các bạn!
                    </div>
                    <Row
                        style={{marginTop: 10}}
                    >
                        <span
                            className="link-app"
                            style={{
                                color:'var(--color-blue)',
                                fontSize: 16
                            }}
                        >
                            Xem thêm
                        </span>
                    </Row>
                </div>
            </div>
            <button
                className="btn-primary charity-follow"
            >
                Theo dõi
            </button>
        </div>
    )
}

export default memo(ItemCharity)