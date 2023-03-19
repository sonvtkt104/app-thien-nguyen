import { Row } from "antd";
import { memo } from "react"
import ItemTestimonial from "./ItemTestimonial";

function HomeTestimonial() {
    return (
        <div style={{background: 'var(--color-background-website)'}}>
            <div className="h1-app"
                style={{textAlign: 'center',  padding: '50px 0 30px'}}
            >
                ĐÁNH GIÁ DÙNG THỬ NGHIỆM
            </div>
            <Row justify='center'>
                {
                    [1,2,3].map((item, i) => (
                        <ItemTestimonial />
                    ))
                }
            </Row>
        </div>
    )
}

export default memo(HomeTestimonial);