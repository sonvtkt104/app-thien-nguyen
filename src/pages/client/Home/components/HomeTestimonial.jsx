import { Row } from "antd";
import { memo } from "react"
import ItemTestimonial from "./ItemTestimonial";

function HomeTestimonial() {

    const data = [
        {
            content: "Tôi đã tìm thấy nhiều cuộc vận độg thú vị và ý nghĩa để đóng góp, và cảm giác rất hạnh phúc khi biết mình đã giúp ích cho những người khác. Tôi cảm thấy rất hài lòng khi sử dụng ứng dụng này và thấy đóng góp của mình có ý nghĩa.",
            image: 'https://yt3.ggpht.com/xcVhfJYeYxdOGozuJk_h2NNDCYCFRXkIA_wG-ep7PZ_C4ni78cJrGGPbZ-z6vsCv5TXPnG_ebg=s88-c-k-c0x00ffffff-no-rj',
            name: 'Xuân Sơn',
            date: 'Mar 19, 2023'
        },
        {
            content: "Tôi rất vui khi được tham gia vào hoạt động từ thiện và góp phần giúp đỡ cộng đồng. Tôi hy vọng mọi người cũng có cơ hội tham gia và tạo ra sự khác biệt tích cực trong xã hội. Tôi rất vui khi được tham gia vào hoạt động từ thiện và góp phần giúp đỡ cộng đồng.",
            image: 'https://yt3.ggpht.com/E3JBNV2aemjkHRKMYcDseHW7HxDsjGuOCFMxasJYxz_ZbEAARF3x22IncTkdSpWfBJXbq2mU=s88-c-k-c0x00ffffff-no-rj',
            name:'Trịnh Hoàng',
            date: 'Mar 12, 2023'
        },
        {
            content: "Ứng dụng này giúp tôi kết nối với những người có cùng tầm nhìn và đam mê, và tôi đã học hỏi được nhiều từ những câu chuyện và dự án của họ. Tôi cảm thấy rất hài lòng khi sử dụng ứng dụng này và thấy đóng góp của mình có ý nghĩa.",
            image: "https://yt3.ggpht.com/5uyVT6EfUdjJMp0srfLOl_1b7r1jOdkV8YZ9qhfpmq-2lUmnaNdungTOeS7TW4mP5aoi_RMoEw=s88-c-k-c0x00ffffff-no-rj",
            name: 'Văn Kiên',
            date: 'Mar 01, 2023'
        }
    ]

    return (
        <div style={{background: 'var(--color-background-website)'}}>
            <div className="h1-app"
                style={{textAlign: 'center',  padding: '50px 0 30px'}}
            >
                ĐÁNH GIÁ DÙNG THỬ NGHIỆM
            </div>
            <Row justify='center'>
                {
                    data.map((item, i) => (
                        <ItemTestimonial 
                            key={i}
                            content={item?.content}
                            date={item.date}
                            name={item.name}
                            image={item.image}
                        />
                    ))
                }
            </Row>
        </div>
    )
}

export default memo(HomeTestimonial);