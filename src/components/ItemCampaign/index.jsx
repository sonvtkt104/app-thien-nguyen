import { Col, Progress, Row } from "antd";
import { useCallback } from "react";
import { Tag } from "../Tag";

export function ItemCampaign({
    style,
    className,
    image = 'https://crowdfunding.comicola.com/wp-content/uploads/2022/11/banner3.png',
    name = 'Dự án hoạt hình con thỏ',
    type = 'Hoạt hình',
    target_amount = 1200000000,
    amount_receive = 1697116725,
    charity_img = 'https://secure.gravatar.com/avatar/4aa5c6c6edd6bd67ab5404e369b1c19c?s=80&d=mm&r=g',
    charity_name = 'Xuân Sơn',
    target_object = 'Tổ chức',
    area = 'Hà Nội',
    status = 'active'
}) {

    const FormatCurrency = useCallback((number) => {
        const currencyString = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Thêm ký tự VND vào cuối chuỗi
        return currencyString + " ₫";
    }, [])

    return (
        <Row
            style={{
                position: 'relative',
                border: '1px solid var(--color-border)',
                marginBottom: '50px',
                boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)',
                borderRadius: 6,
                ...style,
            }}
            className={className}
        >
            <Col xs={8} sm={8} md={8} lg={8} xl={8}
                style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}
            >
            </Col>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}
                style={{ padding: 20 }}
            >
                <div className="text-hover"
                    style={{ fontSize: 18, fontWeight: '600' }}
                >{name}</div>
                <Row style={{margin: '10px 0'}}>
                    <span><Tag title={type} color='var(--color-blue)' background="#e4faff" /></span>
                    <span
                        style={{margin: '0 7px'}}
                    ><Tag title={target_object} color='var(--color-red)' background="#ff3c001a"/></span>
                    <span><Tag title={area} /></span>
                </Row>
                <Row>
                    <span>Mục tiêu: </span>
                    <span style={{fontWeight: '600', marginLeft: 5}}>{FormatCurrency(target_amount)}</span>
                </Row>
                <Progress strokeColor={'#6DCCE3'} percent={parseInt(amount_receive * 100 / target_amount)} showInfo={false} 
                    style={{marginBottom: 20}}
                />
                <Row justify='space-between'
                    style={{paddingTop: 10, borderTop: '1px solid var(--color-border)'}}
                >
                    <Col>
                        <Row>
                            <Col>
                                <img src={charity_img} alt="charity_img" 
                                    style={{width: 40, height: 40, borderRadius: '50%', marginRight: 10}}
                                />
                            </Col>
                            <Col className="flex-col-center">
                                {charity_name}
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <div style={{fontWeight: '600'}}>{`${parseInt(amount_receive * 100 / target_amount)}%`}</div>
                        <div style={{color: 'var(--color-gray)'}}>Thành công</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
