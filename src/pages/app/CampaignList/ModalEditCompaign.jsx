import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Col, message, Modal, Row, Select, Space, Upload } from "antd";
import { Input } from 'antd';
import campaignService from "./CampaignService";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalEditCampaign({
    isOpenModalEdit,
    handleOk,
    handleCancel,
    type
}) {
    const {TextArea} = Input;
    const [nameCampaign, setNameCampaign] = useState('')
    const [targetAudience, setTargetAudience] = useState('')
    const [targetCampaign, setTargetCampaign] = useState('')
    const [descriptionCampaign, setDescriptionCampaign] = useState('')
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')
    const [imageCampaign, setImageCampaign] = useState('')

    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);


        const getBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
        });

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };

    const uploadButton = (
        <div>
        <PlusOutlined />
        <div
            style={{
            marginTop: 8,
            }}
        >
            Tải ảnh lên
        </div>
        </div>
    );
    
    const [region, setRegion] = useState('')
    let [regionOptions, setRegionOptions] = useState([])

    useEffect(() => {
        (async () => {
            try {
                let res = await campaignService.getAllRegion();
                if(res.data && res.data.length > 0) {
                    regionOptions = res.data.map((region) => {
                        region.label = region.fullName;
                        return {
                            label: region.fullName,
                            value: region.codeName
                        };
                    })
                    setRegionOptions(regionOptions);
                }
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])

    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const handleEditorChange = ({html, text}) => {
        setContentMarkdown(text);
        setContentHTML(html);
    }

    return (
        <>
                 <Modal
                     width={1000}
                     bodyStyle={{height: '100%'}}
                     okText={type === 'create' ? "Đồng ý" : "Lưu thay đổi"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalEdit} 
                     onOk={handleOk} 
                     onCancel={handleCancel}
                     className="modal-create"
                 >
                     <div className="modal-header">Chỉnh sửa cuộc vận động</div>
                     <div className="modal-body">
                         <Row gutter={[12, 12]}>
                             <Col span={8}>
                                 <label>Tên cuộc vận động</label>
                                 <br />
                                 <Input 
                                     placeholder=""
                                     value={nameCampaign}
                                     onChange={(e) => setNameCampaign(e.target.value)} 
                                     style={{width: '100%'}}
                                 />
                             </Col>
                             <Col span={8}>
                                 <label>Đối tượng hướng tới</label>
                                 <br />
                                 <Input 
                                     placeholder=""
                                     value={targetAudience}
                                     onChange={(e) => setTargetAudience(e.target.value)} 
                                     style={{width: '100%'}}
                                 />
                             </Col>
                             <Col span={8}>
                                 <label>Mục tiêu</label>
                                 <br />
                                 <Input 
                                     placeholder=""
                                     value={targetCampaign}
                                     onChange={(e) => setTargetCampaign(e.target.value)} 
                                     style={{width: '100%'}}
                                 />
                             </Col>
                         </Row>                       
                         <div style={{margin: '12px 0'}}></div>
                         <Row gutter={[12, 0]}>
                            <Col span={8}>
                                <label>Ngày bắt đầu</label>
                                <Input
                                    style={{width: '100%'}}
                                    value={startDay}
                                    onChange={(e) => setStartDay(e.target.value)}
                                    placeholder="Ngày/Tháng/Năm"
                                />    
                            </Col>
                            <Col span={8}>
                                <label>Ngày kết thúc</label>
                                <Input
                                    style={{width: '100%'}}
                                    value={endDay}
                                    onChange={(e) => setEndDay(e.target.value)}
                                    placeholder="Ngày/Tháng/Năm"
                                />    
                            </Col>
                            <Col span={8}>
                                <label>Khu vực kêu gọi</label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{width: '100%'}}
                                    placeholder='Vui lòng chọn khu vực'
                                    options={regionOptions}
                                    placement={'bottomLeft'}
                                    filterOption={(input, option) => {
                                        return option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    }
                                    onChange={(value) => {setRegion(value)}}
                                />                                    
                            </Col>
                            
                         </Row>
                         <div style={{margin: '12px 0'}}></div>
                         <Row>
                             <label>Bài viết giới thiệu</label>
                             <Col span={24}>
                                <MdEditor
                                    value={contentMarkdown} 
                                    style={{height: '180px'}} 
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                />
                             </Col>
                         </Row>
                         <div style={{margin: '12px 0'}}></div>
                         <Row>
                            <Col span={8}>
                            Chọn ảnh đăng tải
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={beforeUpload}
                                >
                                    {
                                        fileList && fileList.length >= 1 ? null : uploadButton
                                    }
                                    
                                </Upload>
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                                    <img
                                        alt="image"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </Col>
                         </Row>
                     </div>
                 </Modal>
        </>
    )
}

export default ModalEditCampaign;