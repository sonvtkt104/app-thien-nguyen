import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Col, message, Modal, Row, Select, Space, Upload } from "antd";
import { Input } from 'antd';
import campaignService from "./CampaignService";

import { toast } from "react-toastify";
import axios from "axios";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ModalEditPost({
    isOpenModalEditPost,
    handleOk,
    handleCancel,
}) {
    const {TextArea} = Input;
    const [namePost, setNamePost] = useState('')
    const [typePost, setTypePost] = useState(0)
    const [statusPost, setStatusPost] = useState(1)
    const [contentPost, setContentPost] = useState('')

    let options = [
        {
            label: 'Bài viết giới thiệu',
            value: 1
        },
        {
            label: 'Hoạt động',
            value: 2
        }
    ]

    let optionsStatus = [
        {
            label: 'Hoạt động',
            value: 1
        },
        {
            label: 'Ẩn',
            value: 0
        },
    ]

    const handlePressOk = async () => {

        console.log(namePost, typePost, statusPost, contentPost);
        return;
        await axios({
            method: 'post',
            url: 'http://localhost:8089/charity/campaign/add-campaign',
            headers: {
                token: 'abcd'
            },
            
        })
        toast.success('Tạo mới bài viết thành công!');

    }

    return (
        <>
                 <Modal
                     width={1000}
                     bodyStyle={{height: '100%'}}
                     okText={"Đồng ý"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalEditPost} 
                     onOk={handlePressOk} 
                     onCancel={handleCancel}
                     className="modal-create"
                 >
                     <div className="modal-header">Tạo bài viết mới</div>
                     <div className="modal-body">
                         <Row gutter={[12, 12]}>
                             <Col span={12}>
                                 <label>Tiêu đề bài viết</label>
                                 <br />
                                 <Input 
                                     placeholder=""
                                     value={namePost}
                                     onChange={(e) => setNamePost(e.target.value)} 
                                     style={{width: '100%'}}
                                 />
                             </Col>
                             <Col span={12}>
                                 <label>Kiểu bài viết</label>
                                 <br />
                                 <Select
                                    showSearch
                                    allowClear
                                    style={{width: '100%'}}
                                    placeholder='Vui lòng chọn kiểu bài đăng'
                                    options={options}
                                    placement={'bottomLeft'}
                                    filterOption={(input, option) => {
                                        return option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    }
                                    onChange={(value) => setTypePost(value)}
                                 />
                             </Col>
                             {/* <Col span={6}>
                                 <label>Trạng thái</label>
                                 <br />
                                 <Select
                                    defaultValue={optionsStatus[0]}
                                    showSearch
                                    allowClear
                                    style={{width: '100%'}}
                                    placeholder='Trạng thái bài viết'
                                    options={optionsStatus}
                                    placement={'bottomLeft'}
                                    filterOption={(input, option) => {
                                        return option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    }
                                    onChange={(value) => setStatusPost(value)}
                                 />
                             </Col> */}
                         </Row>                       
                         <div style={{margin: '12px 0'}}></div>
                         <Row className='ck-editor-post'>
                             <label>Nội dung bài viết</label>
                             <Col span={24}>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={contentPost}
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setContentPost(data);
                                    } }                                
                                />
                             </Col>
                         </Row>
                         <div style={{margin: '12px 0'}}></div>
                         {/* <Row>
                            <Col span={8}>
                            Chọn ảnh đăng tải
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={beforeUpload}
                                    multiple
                                >
                                    {
                                        fileList && fileList.length >= 2 ? null : uploadButton
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
                         </Row> */}
                     </div>
                 </Modal>
        </>
    )
}

export default ModalEditPost;