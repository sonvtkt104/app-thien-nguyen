import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { memo, useMemo, useRef, useState } from "react"
import { DownIcon } from "../../../../components"


function HomeSlider({

}) {

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
            {
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
            }
        </div>
    )
}

export default memo(HomeSlider)