import { HeartOutlined } from "@ant-design/icons"
import { Button, Col, Progress, Row } from "antd"
import { memo, useMemo, useRef, useState } from "react"
import { DownIcon } from "../../../../components"


function ItemCampaign({
    key= 1,
    image= 'https://crowdfunding.comicola.com/wp-content/uploads/2017/10/22688446_514860328866877_2961839570336965602_n-660x400.jpg',
    type= 'Nổi bật sách',
    name= 'Gây quỹ để xuất bản Cuốn sách “Họa Sắc Việt”',
    donation= '185,012,500',
    timeRemaining= 0,
    supporter= 135,
    process= 135
}) {

    return (
        <Col xs={7} sm={7} md={7} lg={7} xl={7}
            style={{padding: '0 10px', }}
            >   
            <div
                className='box-shadow-app'
                style={{
                    borderRadius: 4,
                    background: '#ffffff',
                    border: 'solid 1px #ebebf1', transition :'all 0.3s',
                    boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)'
                }}
            >
                <div>
                    <img src={image} alt="" 
                        style={{width: '100%', borderRadius: '4px 4px 0 0'}}
                    />
                </div>
                <div
                    style={{padding: '30px 20px 10px'}}
                >
                    <Row justify='space-between'>
                        <span
                            style={{color:"var(--color-blue)"}}
                        >{type}</span>
                        <span>
                            <HeartOutlined  style={{color: 'var(--color-red)'}}/>
                        </span>
                    </Row>
                    <Row
                        style={{fontSize: 20, lineHeight:'1.57'}}
                    >{name}</Row>
                </div>
                <div
                    style={{
                        padding: '14px 20px 30px',
                        borderBottom: '1px solid var(--color-border)'
                    }}
                >
                    <div>{`${donation} ₫ đã được ủng hộ`}</div>
                    <div>
                        <Progress strokeColor={'#6DCCE3'} percent={process} showInfo={false} />
                    </div>
                </div>
                <Row style={{padding: '20px 5px', justifyContent: 'space-evenly'}}>
                    <Col style={{textAlign: 'center'}}>
                        <div style={{fontSize: 18, fontWeight: '600', marginBottom: '10px'}}>{timeRemaining}</div>
                        <div style={{color: 'var(--color-blue)', fontWeight: '500'}}>Ngày còn lại</div>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <div style={{fontSize: 18, fontWeight: '600', marginBottom: '10px'}}>{supporter}</div>
                        <div style={{color: 'var(--color-blue)', fontWeight: '500'}}>Người ủng hộ</div>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <div style={{fontSize: 18, fontWeight: '600', marginBottom: '10px'}}>{`${process}%`}</div>
                        <div style={{color: 'var(--color-blue)', fontWeight: '500'}}>Thành công</div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default memo(ItemCampaign)