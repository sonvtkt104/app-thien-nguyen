import { Button, Col, Row } from "antd"
import { memo, useMemo, useRef, useState } from "react"
import { DownIcon } from "../../../../components"
import ItemCampaign from "./ItemCampaign"
import { useNavigate } from "react-router-dom"


function HomeCampaign({

}) {
    const navigate = useNavigate()

    const campaigns = useMemo(() => {
        return [
            {
                key: 1,
                image: 'https://crowdfunding.comicola.com/wp-content/uploads/2017/10/22688446_514860328866877_2961839570336965602_n-660x400.jpg',
                type: 'Nổi bật sách',
                name: 'Gây quỹ để xuất bản Cuốn sách “Họa Sắc Việt”',
                donation: '185,012,500',
                timeRemaining: 0,
                supporter: 135,
                process: 135
            },
            {
                key: 2,
                image: 'https://crowdfunding.comicola.com/wp-content/uploads/2018/04/dntd_mockup_4-660x400.jpg',
                type: 'Nổi bật sách',
                name: 'Gây quỹ cộng đồng cho cuốn sách “Dệt Nên Triều Đại”',
                donation: '212,650,000',
                timeRemaining: 0,
                supporter: 231,
                process: 121
            },
            {
                key: 3,
                image: 'https://crowdfunding.comicola.com/wp-content/uploads/2017/12/dozenwarthumb-660x400.jpg',
                type: 'Boardgame Nổi bật',
                name: 'Crowdfunding cho bộ board game “Dozen War – Thập Nhị Chiến”',
                donation: '209,200,000',
                timeRemaining: 0,
                supporter: 123,
                process: 109
            }
        ]
    }, [])


    return (
        <div>
            <div
                style={{fontSize: 32, fontWeight: '600', textAlign: 'center', margin: "50px 0 30px", color: 'var(--color-blue)'}}
            >CÁC DỰ ÁN NỔI BẬT</div>
            <Row justify='center'>
                {
                    campaigns.map((item, i) => (
                        <ItemCampaign 
                            key={i}
                            image={item.image}
                            type={item.type}
                            name={item.name}
                            donation={item.donation}
                            timeRemaining={item.timeRemaining}
                            process={item.process}
                        />
                    ))
                }
            </Row>
            <Row style={{padding: '30px 0'}} justify='center'>
                <Button className="btn"
                    onClick={() => {
                        navigate('/campaign-all')
                    }}
                >
                    XEM TOÀN BỘ DỰ ÁN
                </Button>
            </Row>
            
        </div>
    )
}

export default memo(HomeCampaign)