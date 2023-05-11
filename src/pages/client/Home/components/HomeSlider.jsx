import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { memo, useMemo, useRef, useState } from "react"
import { DownIcon } from "../../../../components"
import { useNavigate } from "react-router-dom"


function HomeSlider({

}) {

    const navigate = useNavigate()

    const [slide, setSlide] = useState(0)
    const carouselRef = useRef()


    const slides = useMemo(() => {
        return [
            '/images/banner-2.png',
            '/images/banner-1.png',
        ]
    }, [])
    

    return (
        <div style={{position: 'relative'}}>
            <Row justify='center'
                style={{ background: 'var(--color-background-header)', height: '300px' }}
            >
                <Col xs={21} sm={21} md={21} lg={21} xl={21}>
                    <Row
                        style={{height: '300px'}}
                    >
                        <Col xs={16} sm={16} md={16} lg={16} xl={16}
                            className="flex-col-center"
                            style={{paddingLeft: 10}}
                        >
                            <div className="h1-app">Kết nối và biến ước mơ thành hiện thực</div>
                            <div
                                style={{lineHeight: '24px', margin: '10px 0 20px', fontSize: 16}}
                            >
                                Một nền tảng quản lý các cuộc vận động, kết nối gắn kết cộng đồng và mang lại sự giúp đỡ cho những người gặp khó khăn
                            </div>
                            <div>
                                <button
                                    className="btn-primary"
                                    style={{
                                        fontSize: 18,
                                        minWidth: 230,
                                        minHeight: 45
                                    }}
                                    onClick={() => {
                                        navigate("/sign-up")
                                    }}
                                >
                                    Đăng ký miễn phí
                                </button>
                                <div 
                                style={{marginTop: 20}}
                                >
                                    <span
                                        style={{
                                            fontSize: 18,
                                            paddingBottom: 10,
                                            borderBottom: '1px solid #bbced2',
                                            cursor: 'pointer',
                                            color: 'var(--color-blue)',
                                        }}
                                        className="app-hover"
                                        onClick={() => {
                                            navigate("/campaign-all")
                                        }}
                                    >
                                        Quyên góp ngay {">"}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} 
                            style={{height:'100%'}}
                        >
                            <img src="/images/banner-home.png" alt="charity banner" 
                                style={{height: '100%'}}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* {
                slide == 0 ? "" : (
                    <span
                        style={{ position: 'absolute', left: 20, top: 'calc(50% - 16px)', cursor: 'pointer', zIndex: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                        onClick={() => {
                
                            setSlide(pre => pre - 1)

                            const itemPartner = document.querySelectorAll(".item-banner-app")
                            const widthItem = itemPartner[0]?.offsetWidth;

                            let a = carouselRef.current.scrollLeft;
                            carouselRef.current.scrollTo({
                                top: 0,
                                left: a - widthItem,
                                behavior: 'smooth'
                            });
                        }}
                    >
                        <LeftCircleOutlined style={{fontSize: 30}} />
                    </span>
                )
            }
            <Row
                ref={carouselRef}
                style={{
                    flexWrap: 'nowrap',
                    overflow: 'hidden',
                    transition: 'all 0.35s',
                    position: 'relative'
                }}

            >
                {
                    slides.map((item, i) => (
                        <Col
                            xs={24} sm={24} md={24} lg={24} xl={24}
                            key={i}
                            className='item-banner-app'
                        >
                            <img src={item} alt="banner"
                                style={{ width: '100%', height: 750 }}
                            />
                        </Col>
                    ))
                }
            </Row>
            {
                slide == slides.length - 1 ? "" : (
                    <span
                        style={{position: 'absolute', right: 20, top: 'calc(50% - 16px)' ,cursor: 'pointer', zIndex: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}
                        onClick={() => {
                        
                            setSlide(pre => pre + 1)

                            const itemPartner = document.querySelectorAll(".item-banner-app")
                            const widthItem = itemPartner[0]?.offsetWidth;

                            let a = carouselRef.current.scrollLeft;
                            carouselRef.current.scrollTo({
                                top: 0,
                                left: a + widthItem,
                                behavior: 'smooth'
                            });
                        }}
                    >
                        <RightCircleOutlined style={{fontSize: 30}} />
                    </span>
                )
            } */}
        </div>
    )
}

export default memo(HomeSlider)