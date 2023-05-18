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

function ModalEditPost({
    isOpenModalEditPost,
    handleOk,
    handleCancel,
    postId,
    getDataPosts
}) {
    const {TextArea} = Input;
    const [namePost, setNamePost] = useState('')
    const [typePost, setTypePost] = useState('')
    const [statusPost, setStatusPost] = useState(1)
    const [contentPost, setContentPost] = useState('')
    
    let [optionSelect, setOptionSelect] = useState({})

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

    useEffect(() => {
        (async () => {
            try {
                if(postId) {
                    let res = await axios({
                        method: 'get',
                        url: `http://localhost:8089/charity/post/get-post-by-id?post-id=${postId}`,
                        headers: {
                            Authorization: `Bearer ${getTokenFromCookies()}`,
                            Token: getTokenFromCookies()
                        }
                    }).then(res => res.data)
                    // console.log(res)
                    setNamePost(res.title)
                    options = options.filter(item => (item.value === res.type))
                    setTypePost(options[0].value)
                    setOptionSelect(options[0])
                    setContentPost(res.content)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [postId])

    const handlePressOk = async () => {

        // console.log(postId, +campaignId, namePost, contentPost, typePost);
        // return;
        if(!campaignId || !namePost || !typePost || !contentPost) {
            toast.error('Vui lòng điền đầy đủ thông tin!')
        }
        else {
            await axios({
                method: 'put',
                url: 'http://localhost:8089/charity/post/update-post',
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                },
                data: {
                    post_id: postId,
                    campaign_id: +campaignId,
                    title: namePost,
                    content: contentPost,
                    type: typePost
                }
            })
            toast.success('Chỉnh sửa bài viết thành công!');
            handleOk();
            getDataPosts();
        }

    }

    return (
        <>
                 <Modal
                     width={1000}
                     bodyStyle={{height: '100%'}}
                     okText={"Lưu thay đôi"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalEditPost} 
                     onOk={handlePressOk} 
                     onCancel={handleCancel}
                     className="modal-create"
                 >
                     <div className="modal-header">Chỉnh sửa bài viết</div>
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
                                    value={optionSelect}
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
                                    onChange={(value) => {setOptionSelect(value); setTypePost(value)}}
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