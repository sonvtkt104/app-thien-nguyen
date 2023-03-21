import { CheckCircleTwoTone, HeartOutlined, HeartTwoTone, SmileTwoTone, StarOutlined } from "@ant-design/icons";
import { Button, Progress, Row, Space } from "antd";
import { useState } from "react";
import { SegmentedApp} from "../../../components";
import HomeHeader from "../Home/components/HomeHeader";
import './DetailCampaign.css';

function DetailCampaign() {

    const arrOptions = [
        {label: 'Giới thiệu', value: 1},
        {label: 'Hoạt động', value: 2},
        {label: 'Sao kê', value: 3}
    ]
    const [valueOption, setValueOption] = useState(1)


    return (
        <>
            <HomeHeader />
            <div className="detail-campaign-container">
                <div className="detail-campaign-left">

                    <div className="d-c-l-description">
                        <Row justify={"space-between"} align={"center"}>
                            <div className="name-campaign">
                                Quyên góp miền Trung
                            </div>
                            <div>
                                <Space>
                                    <Button type="primary" style={{fontWeight: 600}}>Ủng hộ</Button>
                                    <Button type="primary" style={{backgroundColor: '#43DA86', fontWeight: 600}}>Chia sẻ</Button>
                                </Space>
                            </div>
                        </Row>
                        <Row>
                            <Space align={"center"}>
                                <div style={{fontSize: '16px', fontWeight: 600}}>Tổ chức thiện nguyện A </div>
                                <CheckCircleTwoTone style={{fontWeight: 600, fontSize: '20px'}} twoToneColor="#52c41a" />
                            </Space>
                        </Row>
                        <div style={{marginTop: '12px'}}></div>
                        <div>Tinh thần “Lá lành đùm lá rách” là một đức tính cao đẹp của người dân Việt Nam. Trong suốt chương trình BTC đã nhận được rất nhiều sự ủng hộ quý báu của các MTQ đã tham gia.
Xin trân trọng cảm ơn sâu sắc những tấm lòng đóng góp quý báu của các MTQ để BTC chúng tôi là nhịp cầu nối giữa các nhà hảo tâm, các mạnh thường quân, các tổ chức, cá nhân có lòng từ thiện cùng chia sẻ với các các đối tượng khuyết tật nghèo, để phần nào giúp họ có được niềm vui, sự ấm áp và vì một ngày mai tươi sáng hơn.</div>

                        <div className="detail-campaign-block">
                            <Row justify={"space-between"}>
                                <div><SmileTwoTone /> 400 Người đã ủng hộ <span style={{marginLeft: '24px'}}><HeartTwoTone twoToneColor="#eb2f96" /> 99</span></div>
                                <div><StarOutlined style={{color: 'green'}} /> 0 Nhận xét</div>
                            </Row>
                            <div style={{margin: '20px 0'}}></div>
                            <Row justify={"space-between"}>
                                <div>150.000.000 đ Đã ủng hộ</div>
                                <div>200.000.000 đ Mục tiêu</div>
                            </Row>
                            <div style={{margin: '0 0 4px 0'}}></div>
                            <Row>
                                <Progress percent={75} status="active" />
                            </Row>
                            <div style={{margin: '4px 0'}}></div>
                            <Row justify={"space-between"}>
                                <div>5 ngày còn lại</div>
                                <div>75% Thành công</div>
                            </Row>
                            <div style={{margin: '12px 0'}}></div>
                            <Row>
                                <div style={{fontWeight: 600}}>Dự án còn 5 ngày nữa sẽ kết thúc.</div>
                            </Row>
                        </div>
                    </div>

                    <div style={{margin: '42px 0'}}></div>

                    <div className="link-youtube">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/Fkz57a72a_U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    
                </div>
                <div className="detail-campaign-right">
                    <div className="detail-campaign-info">
                        <SegmentedApp 
                            options={arrOptions} 
                            value={valueOption}
                            onChange={(valueOption) => setValueOption(valueOption)}
                        />
                        {
                            valueOption && valueOption === 1 &&
                            <div>Hi 1</div>
                        }
                        {
                            valueOption && valueOption === 2 &&
                            <div>Hi 2</div>
                        }
                        {
                            valueOption && valueOption === 3 &&
                            <div>Hi 3</div>
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default DetailCampaign;