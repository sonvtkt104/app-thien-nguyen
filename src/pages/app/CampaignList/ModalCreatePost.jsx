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
import { useParams } from "react-router-dom";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";

function ModalCreatePost({
    isOpenModalCreatePost,
    handleOk,
    handleCancel,
    postId,
    getDataPosts
}) {
    const {TextArea} = Input;
    const [namePost, setNamePost] = useState('')
    const [typePost, setTypePost] = useState('')
    const [contentPost, setContentPost] = useState('')

    const {campaignId} = useParams();

    let options = [
        {
            label: 'Bài viết giới thiệu',
            value: 'Bài viết giới thiệu'
        },
        {
            label: 'Bài viết hoạt động',
            value: 'Bài viết hoạt động'
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
        let images = fileList && fileList.length > 0 ? fileList.map((image) => (image.url)).join(', ') : ''

        // console.log(campaignId, namePost, typePost, contentPost, images);
        // return;

        if(!campaignId || !namePost || !typePost || !contentPost) {
            toast.error('Vui lòng điền đầy đủ thông tin!')
        }
        else {
            await axios({
                method: 'post',
                url: 'http://localhost:8089/charity/post/add-post',
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                },
                data: {
                    campaign_id: campaignId,
                    title: namePost,
                    content: contentPost,
                    type: typePost,
                    images: images
                }
                
            })
            toast.success('Tạo mới bài viết thành công!');
            setNamePost('')
            setTypePost('')
            setContentPost('')
            handleOk()
            getDataPosts()
        }
    }

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

    const handleChange = async ({ file }) => {

        const formData = new FormData();
        formData.append('file', file.originFileObj);
        let res = await axios({
            method: 'post',
            url: 'http://localhost:8080/upload',
            data: formData,
            headers: {
                Authorization: `Bearer ${getTokenFromCookies()}`,
                Token: getTokenFromCookies()
            }
        }).then(res => res.data)
        // console.log(res)
        // console.log([...fileList, res.data])
        setFileList(prev => prev ? [...prev, {url: res.data}] : [{url: res.data}]);
        // let arrTemp = fileList.map((image) => (image.url)).join(', ')
        // setImageCampaign(arrTemp)

    };

    const onRemoveImage = (value) => {
        // console.log(value);
        setFileList((images) => images.filter((image) => image.url !== value.url))
        return false
    }

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
                     bodyStyle={{height: '100%'}}
                     okText={"Đồng ý"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalCreatePost} 
                     onOk={handlePressOk} 
                     onCancel={handleCancel}
                     className="modal-create modal-app"
                 >
                     <div className="modal-header h2-app">Tạo bài viết mới</div>
                     <div className="modal-body">
                         <Row gutter={[12, 12]}>
                             <Col span={12}>
                                 <label>Tiêu đề bài viết</label>
                                 <br />
                                 <div style={{marginBottom: 8}}></div>
                                 <Input 
                                     placeholder="Tiêu đề"
                                     value={namePost}
                                     onChange={(e) => setNamePost(e.target.value)} 
                                     style={{width: '100%'}}
                                     className="input-app"
                                 />
                             </Col>
                             <Col span={12}>
                                 <label>Kiểu bài viết</label>
                                 <br />
                                <div style={{marginBottom: 8}}></div>
                                 <Select
                                    // value={typePost}
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
                                    className="select-app"
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
                             <Col span={24} style={{paddingTop: 8}}>
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
                         <Row>
                         <Col span={24}>
                            Chọn ảnh đăng tải
                                <Upload
                                    listType="picture-card"
                                    onRemove={onRemoveImage}
                                    fileList={fileList}
                                    customRequest={() => false}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={beforeUpload}
                                    multiple
                                >
                                    {
                                        fileList && fileList.length >= 3 ? null : uploadButton
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

export default ModalCreatePost;