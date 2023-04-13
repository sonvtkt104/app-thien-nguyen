import { CheckCircleTwoTone, CommentOutlined, HeartOutlined, HeartTwoTone, ShareAltOutlined, SmileTwoTone, StarOutlined } from "@ant-design/icons";
import { Button, Col, Input, Progress, Row, Space } from "antd";
import { useState } from "react";
import { SegmentedApp} from "../../../components";
import HomeHeader from "../Home/components/HomeHeader";
import './DetailCampaign.scss';

function DetailCampaign() {

    const arrOptions = [
        {label: 'Giới thiệu', value: 1},
        {label: 'Hoạt động', value: 2},
        {label: 'Sao kê', value: 3}
    ]

    const { Search } = Input;

    const handleOnSearch = () => {
        console.log('hi')
    }

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
                            <div className="detail-campaign-intro">
                                <div style={{fontWeight: 600}}>Chi tiết về cuộc vận động:</div>
                                <div>
                                Để kịp thời chia sẻ với những khó khăn, thiệt hại to lớn của đồng bào và các địa phương bị thiệt hại do mưa lũ gây ra, và hưởng ứng lời kêu gọi của Chính phủ và Bộ Tài chính, Công đoàn Bộ cũng đã phát động toàn thể cán bộ, công chức, viên chức, người lao động ở các đơn vị thuộc và trực thuộc Bộ Tài chính tham gia ủng hộ đồng bào các tỉnh miền Trung bị thiệt hại do bão lũ tối thiểu 01 ngày lương.
                                </div>
                                <br />
                                <div style={{fontWeight: 600}}>Đối tượng vận động: </div>
                                <div>Toàn bộ người dân trong nước</div>
                                <br />
                                <div style={{fontWeight: 600}}>Địa chỉ vận động:</div>
                                <div>Nhân dân miền Trung</div>
                                <br />
                                <div style={{fontWeight: 600}}>Ảnh & Video mô tả:</div>
                                <div>
                                    <img src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                    <img src="/images/mien-trung-2.jpg" alt="bla bla"></img>
                                </div>
                                <br />
                                <Button className="" type="primary" style={{fontWeight: 600}}>Ủng hộ ngay</Button>
                            </div>
                        }
                        {
                            valueOption && valueOption === 2 &&
                            <>
                                <div className="detail-campaign-activity">
                                    <Row align={"middle"}>
                                        <div style={{fontSize: 18, fontWeight: 600}}>Bài đăng ủng hộ bão lũ miền Trung</div>
                                        <div style={{marginLeft: 20}}>Thời gian đăng: 22/03/2023</div>
                                    </Row>
                                    <br />
                                    <div style={{fontSize: 16, fontWeight: 600}}>Mô tả - Giới thiệu:</div>
                                    <div>Trong thời gian vừa qua, thanh thiếu nhi và nhân dân nhiều địa phương trong cả nước, đặc biệt là các tỉnh duyên hải miền Trung, Tây Nguyên phải hứng chịu nhiều thiên tai gây thiệt hại nặng nề về người và của, đời sống của nhân dân gặp nhiều khó khăn; nhằm phát huy tinh thần “Tương thân tương ái”, “Lá lành đùm lá rách” của dân tộc. </div>
                                    <br />
                                    <Row>
                                        <Space>
                                            <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                            <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                        </Space>
                                    </Row>
                                    <div className="see-detail">Xem chi tiết</div>
                                    <div style={{margin: '12px 0', height: '1px', background: 'gray'}}></div>
                                    <Row justify={"space-around"}>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><HeartOutlined /> Thích</button>
                                        </Col>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><CommentOutlined /> Bình luận</button>
                                        </Col>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><ShareAltOutlined /> Chia sẻ</button>                              
                                        </Col>
                                    </Row>
                                </div>

                                <div className="detail-campaign-activity">
                                    <Row align={"middle"}>
                                        <div style={{fontSize: 18, fontWeight: 600}}>Bài đăng ủng hộ bão lũ miền Trung</div>
                                        <div style={{marginLeft: 20}}>Thời gian đăng: 22/03/2023</div>
                                    </Row>
                                    <br />
                                    <div style={{fontSize: 16, fontWeight: 600}}>Mô tả - Giới thiệu:</div>
                                    <div>Trong thời gian vừa qua, thanh thiếu nhi và nhân dân nhiều địa phương trong cả nước, đặc biệt là các tỉnh duyên hải miền Trung, Tây Nguyên phải hứng chịu nhiều thiên tai gây thiệt hại nặng nề về người và của, đời sống của nhân dân gặp nhiều khó khăn; nhằm phát huy tinh thần “Tương thân tương ái”, “Lá lành đùm lá rách” của dân tộc. </div>
                                    <br />
                                    <Row>
                                        <Space>
                                            <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                            <img className="detail-campaign-img" src="/images/mien-trung-1.jpg" alt="bla bla"></img>
                                        </Space>
                                    </Row>
                                    <div className="see-detail">Xem chi tiết</div>
                                    <div style={{margin: '12px 0', height: '1px', background: 'gray'}}></div>
                                    <Row justify={"space-around"}>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><HeartTwoTone /> Thích</button>
                                        </Col>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><CommentOutlined /> Bình luận</button>
                                        </Col>
                                        <Col>
                                            <button className='btn-actions' style={{fontWeight: 600}}><ShareAltOutlined /> Chia sẻ</button>                              
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        }
                        {
                            valueOption && valueOption === 3 &&
                            <div className="detail-campaign-statement">
                                <Row justify={"end"}>
                                    <Space>
                                        <Search
                                            placeholder="Tìm kiếm"
                                            onSearch={handleOnSearch}
                                            style={{
                                                width: 200,
                                            }}
                                        />
                                        <Button type="primary">
                                            Tải xuống
                                        </Button>
                                    </Space>
                                </Row>
                                <br />
                                    <table className="detail-campaign-table">
                                        <tbody>
                                            <tr className="detail-campaign-table">
                                                <th>Họ và tên</th>
                                                <th>Số tiền quyên góp</th>
                                                <th>Ghi chú</th>
                                                <th>Thời gian</th>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Sơn</td>
                                                <td>500.000đ</td>
                                                <td>kcj</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Hoàng</td>
                                                <td>500.000đ</td>
                                                <td>ủng hộ</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Tiên</td>
                                                <td>300.000đ</td>
                                                <td>pro vjp</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Linh</td>
                                                <td>300.000đ</td>
                                                <td>pro vjp</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Hải</td>
                                                <td>400.000đ</td>
                                                <td>kcj</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                            <tr className="detail-campaign-table">
                                                <td>Kiên</td>
                                                <td>400.000đ</td>
                                                <td>kcj</td>
                                                <td>22/03/2023</td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default DetailCampaign;