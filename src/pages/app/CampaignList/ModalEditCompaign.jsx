import { useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Col, message, Modal, Row, Upload } from "antd";
import { Input } from "../../../components";

function ModalEditCampaign({
    isOpenModalEdit,
    handleOk,
    handleCancel,
}) {

    const [nameCampaign, setNameCampaign] = useState('')
    const [targetCampaign, setTargetCampaign] = useState('')
    const [descriptionCampaign, setDescriptionCampaign] = useState('')
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

    return (
        <>
                 <Modal
                     width={1000}
                     okText={"Lưu thay đổi"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalEdit} 
                     onOk={handleOk} 
                     onCancel={handleCancel}
                     className="modal-create"
                 >
                     <div className="modal-header">Chỉnh sửa cuộc vận động</div>
                     <div className="modal-body">
                         <Row>
                             <Col span={12}>
                                 <label>Tên cuộc vận động</label>
                                 <br />
                                 <Input 
                                     placeholder="..."
                                     value={nameCampaign}
                                     onChange={(e) => setNameCampaign(e.target.value)} 
                                     style={{width: '400px'}}
                                 />
                             </Col>
                             <Col span={12}>
                                 <label>Mục tiêu</label>
                                 <br />
                                 <Input 
                                     placeholder="..."
                                     value={targetCampaign}
                                     onChange={(e) => setTargetCampaign(e.target.value)} 
                                     style={{width: '400px'}}
                                 />
                             </Col>
                         </Row>
                         <br />
                         <Row>
                             <label>Mô tả ngắn</label>
                             <Col span={24}>
                                 <textarea 
                                     className="textarea-campaign" rows="4" cols="122"
                                     value={descriptionCampaign} 
                                     onChange={(e) => setDescriptionCampaign(e.target.value)}
                                 />
                             </Col>
                         </Row>
                         <Row>
                            <Col span={6}>
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