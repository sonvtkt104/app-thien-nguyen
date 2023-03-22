import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Row } from "antd"
import { memo, useState } from "react"

function HomeNews() {
    const [checked, setChecked] = useState(0)

    return (
        <div style={{background: 'var(--color-background-website)',paddingBottom: 30}}>
            <div>
                <div className="h1-app" style={{textAlign: "center", padding: '50px 0'}}>
                    TIN TỨC - SỰ KIỆN
                </div>
                <input type="radio" name="slider" className="d-none" id="s1" checked={checked == 0 ? true : false} />
                <input type="radio" name="slider" className="d-none" id="s2" checked={checked == 1 ? true : false} />
                <input type="radio" name="slider" className="d-none" id="s3" checked={checked == 2 ? true : false} />
                <input type="radio" name="slider" className="d-none" id="s4" checked={checked == 3 ? true : false} />
                <input type="radio" name="slider" className="d-none" id="s5" checked={checked == 4 ? true : false} />

                <Row className="cards"
                    style={{height: 550, position: 'relative'}}
                >
                    <span
                        style={{position: 'absolute', left: 70, top: '40%', padding: 8, background: '#ffffff', borderRadius: '50%', cursor: 'pointer', boxShadow :' 4px 3px 19px 0 rgba(0,0,0,.14)', color: 'var(--color-blue)', fontWeight: 'bold'}}
                        onClick={() => {
                            if(checked == 0) {
                                setChecked(4)
                            } else {
                                setChecked(checked - 1)
                            }
                        }}
                    >
                        <LeftOutlined style={{fontSize:28}} />
                    </span>
                    <span
                        style={{position: 'absolute', right: 70, top: '40%', padding: 8, background: '#ffffff', borderRadius: '50%', cursor: 'pointer', boxShadow :' 4px 3px 19px 0 rgba(0,0,0,.14)', color: 'var(--color-blue)', fontWeight: 'bold'}}
                        onClick={() => {
                            if(checked == 4) {
                                setChecked(0)
                            } else {
                                setChecked(checked + 1)
                            }
                        }}
                    >
                        <RightOutlined style={{fontSize:28}} />
                    </span>
                    <label style={{width: 500, height: 500, borderRadius: 12}} for="s1" id="slide1"
                        onClick={() => setChecked(0)}
                    >
                        <img src="/images/news.png" alt="news" 
                            style={{width: 500, height: 500, borderRadius: 12}}
                        />
                    </label>
                    <label style={{width: 500, height: 500, borderRadius: 12}} for="s2" id="slide2"
                        onClick={() => setChecked(1)}
                    >
                        <img src="/images/news.png" alt="news" 
                            style={{width: 500, height: 500, borderRadius: 12}}
                        />
                    </label>
                    <label style={{width: 500, height: 500, borderRadius: 12}} for="s3" id="slide3"
                        onClick={() => setChecked(2)}
                    >
                        <img src="/images/news.png" alt="news" 
                            style={{width: 500, height: 500, borderRadius: 12}}
                        />
                    </label>
                    <label style={{width: 500, height: 500, borderRadius: 12}} for="s4" id="slide4"
                        onClick={() => setChecked(3)}
                    >
                        <img src="/images/news.png" alt="news" 
                            style={{width: 500, height: 500, borderRadius: 12}}
                        />
                    </label>
                    <label style={{width: 500, height: 500, borderRadius: 12}} for="s5" id="slide5"
                        onClick={() => setChecked(4)}
                    >
                        <img src="/images/news.png" alt="news" 
                            style={{width: 500, height: 500, borderRadius: 12}}
                        />
                    </label>
                </Row>
                <div style={{textAlign: 'center', color: 'var(--color-gray)', fontSize: 18, marginBottom: 30,fontWeight: '600'}}>
                    Thỏ bảy màu gọi vốn 1,2 tỉ đồng làm phim hoạt hình dài tập
                </div>
            </div>
        </div>
    )
}

export default memo(HomeNews)