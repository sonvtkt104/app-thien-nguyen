import { Component } from "react";
import { PageLayout, TableApp } from "../../../components";
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './CampaignList.css'
import { Button, Divider, Modal } from "antd";
import { Link } from "react-router-dom";

  
class CamPaignList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpenModalCompaign: false,
            isOpenModalEdit: false,
            columns: [
                {
                  key: "name",
                  title: "Tên",
                  dataIndex: "name",
                  align: 'center',
                },
                {
                  key: "target",
                  title: "Mục tiêu",
                  dataIndex: "target",
                  align: 'center',
                },
                {
                  key: "receive",
                  title: "Nhận được",
                  dataIndex: "receive",
                  align: 'center',
                },
                {
                  key: "complete",
                  title: "Hoàn thành",
                  dataIndex: "complete",
                  align: 'center',
                },
                {
                  key: "status",
                  title: "Trạng thái",
                  dataIndex: "status",
                  align: 'center',
                },
                {
                    key: "preview",
                    title: "Xem",
                    dataIndex: "preview",
                    align: 'center',
                    render: () => {
                        return (
                            <Link
                                to="/campaign-list/preview" 
                                className="preview"
                                // onClick={() => this.handleClickPreview()}
                            >Preview</Link>
                        )
                    }
                },
                {
                    key: "actions",
                    title: "Actions",
                    align: 'center',
                    render: (text, record, index) => {
                        return (
                            <div className="campaign-list-actions">
                                <Link to="/campaign-list/preview">
                                    <EyeOutlined
                                        className="actions-hide"
                                        onClick={()=> this.handleActions(record,'hide')}
                                    />
                                </Link> 
            
                                <EditOutlined
                                    className="actions-edit"
                                    onClick={()=> this.handleActions(record, 'edit')}
                                />
            
                                <DeleteOutlined
                                    className="actions-delete"
                                    onClick={()=> this.handleActions(record, 'delete')}
                                />            
                            </div>
                        )
                    }
                },
            ],
            dataSource: [
                {
                    key: "1",
                    name: "Áo ấm cho em",
                    target: '2.000.000.000 VNĐ',
                    receive: '100.000.000 VNĐ',
                    complete: '5%',
                    status: 'Hoạt động',
                    hide: false,
                },
                {
                    key: "2",
                    name: "Quyên góp miền Trung",
                    target: '1.000.000.000 VNĐ',
                    receive: '500.000.000 VNĐ',
                    complete: '50%',
                    status: 'Hoạt động',
                    hide: false,
                },
                {
                    key: "3",
                    name: "Quyên góp mùa lũ",
                    target: '500.000.000 VNĐ',
                    receive: '40.000.000 VNĐ',
                    complete: '80%',
                    status: 'Hoạt động',
                    hide: false,
                }
            ],
            columns2: [
                {
                  key: 1,
                  title: "Tiêu đề",
                  dataIndex: "name",
                  align: 'center',
                },
                {
                  key: 2,
                  title: "Kiểu bài đăng",
                  dataIndex: "postType",
                  align: 'center',
                },
                {
                  key: 3,
                  title: "Trạng thái",
                  dataIndex: "status",
                  align: 'center',
                },
                {
                  key: 4,
                  title: "Thời gian đăng",
                  dataIndex: "date",
                  align: 'center',
                },
                {
                  key: "status",
                  title: "Trạng thái",
                  dataIndex: "action",
                  align: 'center',
                },
            ],
            dataSource2: [
                {
                    key: 1,
                    name: "Kêu gọi toàn dân vận động",
                    postType: "Kêu gọi",
                    status: "Hoạt động",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 2,
                    name: "Đi hoạt động ở Hà Nội",
                    postType: "Hoạt động",
                    status: "Ẩn",
                    date: '15/03/2023',
                    action: 'no'
                },
            ],
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleActions = (record, type) => {
        if(type === 'hide') {
            // console.log(record)
            // this.showModal();
        }
        if(type === 'edit') {
            this.showModal();
        }
    }

    handleClickCampaign = () => {
        this.showModalCreateNewCampaign();
    }

    showModal = () => {
        this.setState({
            isOpenModalEdit: true
        })
    }

    handleOk = () => {
        this.setState({
            isOpenModalEdit: false,
            isOpenModalCompaign: false
        })
    }

    handleCancel = () => {
        this.setState({
            isOpenModalEdit: false,
            isOpenModalCompaign: false
        })
    }

    showModalCreateNewCampaign = () => {
        this.setState({
            isOpenModalCompaign: true
        })
    }

    handleClickPreview = () => {
        console.log('aaa')
    }

    render() {
        return (
            <>
                <PageLayout>
                    <div className="campaign-list-title">
                        <div className="c-l-t-name">Danh sách cuộc vận động</div>
                        <Button 
                            type="primary"
                            onClick={() => this.handleClickCampaign()}
                        >
                            Tạo cuộc vận động mới
                        </Button>
                    </div>
                    <div className="campaign-list-table">
                        {/* <div className="header-title">
                            <div className="h-t-name">Danh sách cuộc vận động</div>
                        </div>
                        <Divider /> */}
                        <TableApp columns={this.state.columns} dataSource={this.state.dataSource}>

                        </TableApp>
                    </div>

                    <Modal title="Modal Edit" open={this.state.isOpenModalEdit} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                    <Modal title="Create new a campaign" open={this.state.isOpenModalCompaign} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </PageLayout>
            </>
        )
    }
    
}

export default CamPaignList;