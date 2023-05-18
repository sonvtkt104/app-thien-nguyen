import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Col, message, Modal, Row, Select, Space, Upload } from "antd";
import { Input } from 'antd';

import moment from "moment";

import axios from "axios";
import { toast } from "react-toastify";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";



function ModalCreateCampaign({
    isOpenModalCompaign,
    handleCancel,
    getData,
    handleOk
}) {
    let [selectDay, setSelectDay] = useState(new Date())
    let [isCalendar, setIsCalendar] = useState(false)
    let [isCalendar2, setIsCalendar2] = useState(false)
    const {TextArea} = Input;
    const [nameCampaign, setNameCampaign] = useState('')
    const [targetAudience, setTargetAudience] = useState('')
    const [targetCampaign, setTargetCampaign] = useState('')
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')
    const [introductoryPost, setIntroductoryPost] = useState('')
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
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:8089/charity/address/provinces',
                    headers: {
                        Authorization: `Bearer ${getTokenFromCookies()}`,
                        Token: getTokenFromCookies()
                    }
                });
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

    let options = [
        {
            label: 'Trẻ em',
            value: 1
        },
        {
            label: 'Người già',
            value: 2
        },
        {
            label: 'Tất cả mọi người',
            value: 3
        }
    ]

    let optionStatus = [
        {
            label: 'Đang vận động',
            value: 'Đang vận động',
        },
    ]


    const handlePressOk = async () => {
        // console.log(nameCampaign)
        // console.log(targetAudience)
        // console.log(targetCampaign)
        // console.log(startDay)
        // console.log(endDay)
        // console.log(region)
        // console.log(region.join(', '))
        // console.log(introductoryPost)
        // return;
        if(!nameCampaign || !targetAudience || !targetCampaign || !startDay || !endDay || !region || !introductoryPost) {
            toast.error('Vui lòng điền đầy đủ thông tin!')
        }
        else {
            await axios({
                method: 'post',
                url: 'http://localhost:8089/charity/campaign/add-campaign',
                headers: {
                    Authorization: `Bearer ${getTokenFromCookies()}`,
                    Token: getTokenFromCookies()
                },
                data: {
                    campaign_name: nameCampaign,
                    introduction: introductoryPost,
                    target_object: targetAudience,
                    region: region.join(', '),
                    status: 'Đang vận động',
                    campaign_type: 'Tạm thời chưa biết',
                    target_amount: targetCampaign,
                    start_date: startDay,
                    stop_date: endDay,
                    start_active_date: startDay,
                    stop_active_date: endDay,
                    stop_receive_date: endDay
                }
            })
            toast.success('Tạo mới cuộc vận động thành công!');
    
            setNameCampaign('')
            setTargetAudience('')
            setRegion('')
            setTargetCampaign('')
            setStartDay('')
            setEndDay('')
            setIntroductoryPost('')
    
            getData();
            handleOk()
            setTimeout(() => {
                window.location.reload()
            }, 1000)

        }

    }

    return (
        <>
                 <Modal
                     width={1000}
                     bodyStyle={{height: '100%'}}
                     okText={"Đồng ý"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalCompaign} 
                     onOk={handlePressOk} 
                     onCancel={handleCancel}
                     className="modal-create"
                 >
                     <div className="modal-header">Tạo cuộc vận động mới</div>
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
                                     autoFocus
                                 />
                             </Col>
                             <Col span={8}>
                                 <label>Đối tượng hướng tới</label>
                                 <br />
                                 {/* <Select
                                    showSearch
                                    allowClear
                                    style={{width: '100%'}}
                                    placeholder='Vui lòng đối tượng hướng tới'
                                    options={options}
                                    placement={'bottomLeft'}
                                    filterOption={(input, option) => {
                                        return option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    }
                                    onChange={(value) => {setTargetAudience(value)}}
                                 /> */}
                                 <Input 
                                     placeholder=""
                                     value={targetAudience}
                                     onChange={(e) => setTargetAudience(e.target.value)} 
                                     style={{width: '100%'}}
                                 />
                             </Col>
                             <Col span={8}>
                                 <label>Mục tiêu số tiền</label>
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
                                    placeholder="Năm-Tháng-Ngày"
                                    onClick={() => setIsCalendar(true)}
                                />
                                {
                                    isCalendar &&
                                    <Calendar 
                                        value={selectDay} 
                                        onChange={(value) => {
                                            let valueFormat = moment(value).format('YYYY-MM-DD'); 
                                            setSelectDay(valueFormat);
                                            setIsCalendar(false)
                                            setStartDay(valueFormat)
                                        }}
                                         
                                    />
                                }    
                            </Col>
                            <Col span={8}>
                                <label>Ngày kết thúc</label>
                                <Input
                                    style={{width: '100%'}}
                                    value={endDay}
                                    onChange={(e) => setEndDay(e.target.value)}
                                    placeholder="Năm-Tháng-Ngày"
                                    onClick={() => setIsCalendar2(true)}
                                />
                                {
                                    isCalendar2 &&
                                    <Calendar 
                                        value={selectDay} 
                                        onChange={(value) => {
                                            let valueFormat = moment(value).format('YYYY-MM-DD'); 
                                            setSelectDay(valueFormat)
                                            setIsCalendar2(false)
                                            setEndDay(valueFormat)
                                        }}
                                         
                                    />
                                }        
                            </Col>
                            <Col span={8}>
                                <label>Khu vực kêu gọi</label>
                                <Select
                                    mode="multiple"
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
                                    onChange={
                                        (value) => {                                                                                     
                                            setRegion(prev => {
                                                let arrRegions = [...prev, value]
                                                return arrRegions[arrRegions.length - 1]
                                            })
                                        }
                                    }
                                />                                    
                            </Col>
                            
                         </Row>
                         <div style={{margin: '12px 0'}}></div>
                         <Row>
                             <label>Bài viết giới thiệu</label>
                             <Col span={24}>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={introductoryPost}
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setIntroductoryPost(data);
                                    } }                                
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

export default ModalCreateCampaign;