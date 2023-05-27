import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Col, DatePicker, message, Modal, Row, Select, Space, Upload } from "antd";
import { Input } from 'antd';

import moment from "moment";

import axios from "axios";
import { toast } from "react-toastify";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
import ReactPlayer from "react-player";



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
    const [introVideo, setIntroVideo] = useState('')
    const [status, setStatus] = useState('Đang vận động')


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
            value: 'Trẻ em'
        },
        {
            label: 'Trẻ em mồ côi',
            value: 'Trẻ em mồ côi'
        },
        {
            label: 'Người già',
            value: 'Người già'
        },
        {
            label: 'Người khuyết tật',
            value: 'Người khuyết tật'
        },
        {
            label: 'Thương binh liệt sỹ',
            value: 'Thương binh liệt sỹ'
        },
        {
            label: 'Người vô gia cư',
            value: 'Người vô gia cư'
        },
        {
            label: 'Khác',
            value: 'Khác'
        },
    ]

    let optionStatus = [
        {
            label: 'Đang vận động',
            value: 'Đang vận động'
        },
        {
            label: 'Kết thúc',
            value: 'Kết thúc'
        }
    ]


    const handlePressOk = async () => {
        let images = fileList && fileList.length > 0 ? fileList.map((image) => (image.url)).join(', ') : ''
        // // setImageCampaign(arrTemp)
        // console.log(nameCampaign)
        // console.log(targetAudience)
        // console.log(targetCampaign)
        // console.log(startDay)
        // console.log(endDay)
        // console.log(region)
        // // console.log(region.join(', '))
        // console.log(introVideo)
        // console.log(images)
        // console.log(status)
        // // console.log(imageCampaign)
        // console.log(introductoryPost)
        // // handleOk()
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
                    status: status,
                    intro_video: introVideo,
                    images: images,
                    target_amount: targetCampaign,
                    start_date: startDay,
                    stop_date: endDay,                  
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
            
        }

    }

    return (
        <>
                 <Modal
                     width={1200}
                    //  height={'100%'}
                     bodyStyle={{height: '100%'}}
                     okText={"Đồng ý"}
                     cancelText={"Quay lại"}
                     centered 
                     open={isOpenModalCompaign} 
                     onOk={handlePressOk} 
                     onCancel={handleCancel}
                     className="modal-create modal-app"
                 >
                     <div className="modal-header h2-app">Tạo cuộc vận động mới</div>
                     <div className="modal-body">
                         <Row gutter={[12, 12]}>
                             <Col span={8}>
                                 <label><span style={{color: 'red'}}>*</span> Tên cuộc vận động</label>
                                 <br />
                                 <div style={{marginBottom: 8}}></div>
                                 <Input 
                                     placeholder="Nhập tên cuộc vận động"
                                     value={nameCampaign}
                                     onChange={(e) => setNameCampaign(e.target.value)} 
                                     style={{width: '100%'}}
                                     autoFocus
                                     className="input-app"
                                 />
                             </Col>
                             <Col span={8}>
                                 <label><span style={{color: 'red'}}>*</span> Đối tượng hướng tới</label>
                                 <br />
                                 <div style={{marginBottom: 8}}></div>
                                 <Select
                                    className="select-app"
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
                                 />
                                 {/* <Input 
                                     placeholder=""
                                     value={targetAudience}
                                     onChange={(e) => setTargetAudience(e.target.value)} 
                                     style={{width: '100%'}}
                                 /> */}
                             </Col>
                             <Col span={8}>
                                 <label><span style={{color: 'red'}}>*</span> Mục tiêu số tiền</label>
                                 <br />
                                 <div style={{marginBottom: 8}}></div>
                                 <Input
                                     placeholder="VNĐ"
                                     value={targetCampaign}
                                     onChange={(e) => setTargetCampaign(e.target.value)} 
                                     style={{width: '100%'}}
                                     className="input-app"
                                 />
                             </Col>
                         </Row>                       
                         <div style={{margin: '12px 0'}}></div>
                         <Row gutter={[12, 0]}>
                            <Col span={8}>
                                <div>
                                    <label><span style={{color: 'red'}}>*</span> Ngày bắt đầu</label>
                                </div>
                                <div style={{marginBottom: 8}}></div>
                                <DatePicker 
                                    onChange={(date, dateString) => {
                                        console.log(date, dateString);
                                        setStartDay(dateString)
                                    }}
                                    placeholder="Năm-Tháng-Ngày"
                                    className="date-picker-app"
                                />
                                {/* <Input
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
                                }     */}
                            </Col>
                            <Col span={8}>
                                <label><span style={{color: 'red'}}>*</span> Ngày kết thúc</label>
                                {/* <Input
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
                                }         */}
                                <div style={{marginBottom: 8}}></div>
                                <DatePicker 
                                    onChange={(date, dateString) => {
                                        console.log(date, dateString);
                                        setEndDay(dateString)
                                    }}
                                    placeholder="Năm-Tháng-Ngày"
                                    className="date-picker-app"
                                />
                            </Col>
                            <Col span={8}>
                                <label><span style={{color: 'red'}}>*</span> Khu vực kêu gọi</label>
                                <div style={{marginBottom: 8}}></div>
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
                                    className="select-app"
                                />                                    
                            </Col>
                            
                         </Row>
                         <div style={{margin: '12px 0'}}></div>
                         <Row>
                             <label><span style={{color: 'red'}}>*</span> Giới thiệu</label>
                             <Col span={24} style={{marginTop: 8}}>
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
                            <Col span={8} >
                                <label>Trạng thái</label>
                                <Select
                                    value={status}
                                    showSearch
                                    allowClear
                                    style={{width: '100%', marginTop: 8}}
                                    options={optionStatus}
                                    placement={'bottomLeft'}
                                    filterOption={(input, option) => {
                                        return option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    }
                                    onChange={(value) => setStatus(value)}
                                    className="select-app"
                                   
                                 />
                                {/* <Select
                                    style={{width: '100%'}}
                                    options={optionStatus}
                                    onChange={(value) => setStatus(value)}
                                 /> */}
                            </Col>
                            <div style={{margin: '12px 8px'}}></div>
                            <Col span={8} style={{marginRight: 24}}>
                                <label>Link video youtube</label>
                                <div style={{marginBottom: 8}}></div>
                                <Input
                                    placeholder="Link video" 
                                    value={introVideo}
                                    onChange={(e) => setIntroVideo(e.target.value)}
                                    className="input-app"
                                 />
                            </Col>
                            <Col span={24} style={{marginTop: 12}}>
                            Chọn ảnh đăng tải
                            <div style={{marginBottom: 8}}></div>
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

export default ModalCreateCampaign;