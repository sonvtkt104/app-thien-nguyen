import { FacebookOutlined, GithubOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { memo } from "react";

function  HomeFooter() {
    return (
        <Row className="landing-page-footer"
            style={{justifyContent: 'center'}}
        >
            <Col 
                xs={7} sm={7} md={7} lg={7} xl={7}
                style={{textAlign: 'left', paddingLeft: '13%'}} className='landing-page-footer-item'>
                <div className="landing-page-footer-title" style={{textAlign: 'left', marginBottom: '25px'}}>Thiện Nguyện</div>
                <p style={{textAlign: 'left',marginBottom: '5px'}}>144 Xuân Thủy, Mai Dịch</p>
                <p>Cầu Giấy, Hà Nội, Việt Nam</p>
                <br></br>
                <p>Phone: +84 349437116</p>
                <p>Email: thiennguyen@gmail.com</p>
            </Col>
            <Col 
                xs={7} sm={7} md={7} lg={7} xl={7}
                style={{padding: '0 20px', }}
                className="landing-page-footer-middle">
                <div style={{marginBottom: 20}}><Button className="btn-primary" >ĐĂNG KÝ</Button></div>
                <div>
                    <span><FacebookOutlined /></span>
                    <span><InstagramOutlined /></span>
                    <span><GithubOutlined /></span>
                    <span><TwitterOutlined /></span>
                    <span><YoutubeOutlined /></span>
                </div>
                <div>
                    <div><div className="landing-page-footer-title" style={{fontSize: '25px'}}>Thiện Nguyện</div></div>
                    <div><p style={{marginBottom: '10px', fontSize: '13px', color: '#a3a3a3'}}>Copyright © 2022 Thien Nguyen team</p></div>
                    <div>
                        <span>Contact</span>
                        <span>About Us</span>
                        <span>FAQ</span>
                    </div>
                </div>
            </Col>
            <Col 
                xs={7} sm={7} md={7} lg={7} xl={7}
                className='landing-page-footer-item'>
                <div className="landing-page-footer-title" style={{textAlign: 'left', marginBottom: '25px', fontSize: '22px'}}>Dịch vụ của chúng tôi</div>
                <p>Hệ thống minh bạch công khai rõ ràng &gt;</p>
                <p>Cung cấp một nền tảng CMS cho tổ chức từ thiện &gt;</p>
                <p>Tạo một flatform cho một cuộc vận động</p>
                <p>Quản lý các cuộc vận động&gt;</p>
                <p>Quản lý danh sách quyên góp &gt;</p>
            </Col>
        </Row>
    )
}

export default memo(HomeFooter)