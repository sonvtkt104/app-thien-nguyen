import { Component } from "react";
import { Input, PageLayout, TableApp } from "../../../components";
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './CampaignList.css'
import { Button} from "antd";
import { Link } from "react-router-dom";
import ModalCreateCampaign from "./ModalCreateCompaign";
import ModalEditCompaign from "./ModalEditCompaign";
import { toast } from "react-toastify";

  
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
                                to="/detail-campaign/14" 
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
        if(type === 'edit') {
            this.showModal();
        }
    }

    handleClickCampaign = () => {
        this.setState({
            isOpenModalCompaign: true
        })
    }

    showModal = () => {
        this.setState({
            isOpenModalEdit: true
        })
    }

    handleOk = () => {
        toast.success('Tạo mới thành công!');
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
    
    handleClickPreview = () => {
        console.log('aaa')
    }

    render() {
        const {isOpenModalCompaign, isOpenModalEdit} = this.state;

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
                        <TableApp columns={this.state.columns} dataSource={this.state.dataSource}>

                        </TableApp>
                    </div>

                    <ModalEditCompaign 
                        isOpenModalEdit={isOpenModalEdit} 
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        type={'edit'}
                    />
                    <ModalCreateCampaign 
                        isOpenModalCompaign={isOpenModalCompaign}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        type={'create'}
                    />
                </PageLayout>
            </>
        )
    }
    
}

export default CamPaignList;