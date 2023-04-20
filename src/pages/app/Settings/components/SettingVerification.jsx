import { memo } from "react"
import { Button, Card, Input } from "../../../../components"
import { InboxOutlined } from '@ant-design/icons';
import { message, Row, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function SettingVerification() {
    return (
        <Card
            title='Đăng ký xác thực'
        >
            <div style={{padding: '20px 40px'}}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                    </p>
                </Dragger>
                <div>
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            margin: '20px 0 10px'
                        }}
                    >
                        Thêm lời nhắn
                    </div>
                    <Row>
                        <textarea className='input-app'
                            placeholder="Nhập ...."
                            style={{width: '100%', minHeight: 100}}
                        />
                    </Row>
                    <button className='btn-primary' style={{marginTop: 20}}>
                        Gửi
                    </button> 
                     
                </div>
            </div>
        </Card>
    )
}

export default memo(SettingVerification)