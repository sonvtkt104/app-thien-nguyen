import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Row } from "antd"
import { memo, useState } from "react"

function HomeNews() {
    const [checked, setChecked] = useState(0)

    const data = [
        {
            image: 'https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/dataimages/201907/original/images5371356_IMG_5516.jpg',
            des: 'Giáo hội Phật giáo Việt Nam tỉnh: Nhiều hoạt động từ thiện',
            link: 'https://baokhanhhoa.vn/xa-hoi/201907/giao-hoi-phat-giao-viet-nam-tinh-nhieu-hoat-dong-tu-thien-8123639/'
        },
        {
            image: 'https://impactthrift.org/wp-content/uploads/2019/11/quyen-gop-tu-thien.jpg',
            des: 'Các hình thức làm từ thiện thiết thực và phổ biến ở Việt Nam',
            link: "https://impactthrift.org/cac-hinh-thuc-lam-tu-thien-thiet-thuc-va-pho-bien-o-viet-nam/"
        },
        {
            image: "https://vtv1.mediacdn.vn/thumb_w/650/2017/tu-thien-1508673633769.png",
            des: 'Người Việt làm từ thiện dẫn đầu châu Á - Thái Bình Dương',
            link: 'https://vtv.vn/trong-nuoc/nguoi-viet-lam-tu-thien-dan-dau-chau-a-thai-binh-duong-20171022190112232.htm'
        },
        {
            image: "https://tapchicongthuong.vn/images/21/7/1/tu_thien_1.jpg",
            des: 'Quy định pháp luật liên quan đến hoạt động từ thiện xã hội của các tổ chức tôn giáo ở Việt Nam hiện nay',
            link: 'https://tapchicongthuong.vn/bai-viet/quy-dinh-phap-luat-lien-quan-den-hoat-dong-tu-thien-xa-hoi-cua-cac-to-chuc-ton-giao-o-viet-nam-hien-nay-74975.htm'
        },
        {
            image: 'https://thanuyen.laichau.gov.vn/phamu/uploads/news/2021_07/img-5481-2_1625234493380.jpg',
            des: 'Trao quà từ thiện cho các gia đình ở xã Pha Mu',
            link: 'https://thanuyen.laichau.gov.vn/phamu/tin-trong-huyen/trao-qua-tu-thien-cho-cac-gia-dinh-o-xa-pha-mu-68.html'
        }
    ]

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
                    {
                        data.map((item, i) => (
                            <label key={i} style={{width: 500, height: 500, borderRadius: 12,}} for={`s${i+1}`} id={`slide${i+1}`}
                                onClick={() => setChecked(i)}
                            >
                                <img src={item.image} alt="news" 
                                    style={{width: 500, height: 500, borderRadius: 12, objectFit: 'cover'}}
                                />
                                <span
                                    style={{position: 'absolute', inset:0, background :'#5c5c5c', opacity: 0.5, borderRadius: 12,
                                        display: checked == i ? 'none' : 'block'
                                    }}
                                >
                                </span>
                            </label>
                        ))
                    }
                   
                </Row>
                <div style={{textAlign: 'center', color: 'var(--color-gray)', fontSize: 18, marginBottom: 30,fontWeight: '600'}}>
                    {data[checked].des}
                </div>
            </div>
        </div>
    )
}

export default memo(HomeNews)