import { Component } from "react";
import { Input, PageLayout, TableApp } from "../../../components";
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './CampaignList.scss'
import { Button} from "antd";
import { Link } from "react-router-dom";
import ModalCreateCampaign from "./ModalCreateCompaign";
import ModalEditCompaign from "./ModalEditCompaign";
import { toast } from "react-toastify";
import Search from "antd/es/input/Search";
import campaignService from "./CampaignService";
import axios from "axios";



class CamPaignList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpenModalCompaign: false,
            isOpenModalEdit: false,
            valueSearch: '',
            type: false,
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
                  title: "Đã nhận được",
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
                                target="_blank"
                                // onClick={() => this.handleClickPreview()}
                            >Preview</Link>
                        )
                    }
                },
                {
                    key: "actions",
                    title: "Hành động",
                    align: 'center',
                    render: (text, record, index) => {
                        return (
                            <div className="campaign-list-actions">
                                <Link to="/campaign-list/preview">
                                    <EyeOutlined
                                        className="actions-hide"
                                        onClick={()=> this.handleActions(record, 'delete')}
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
            dataSource: [],
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
            dataSourceSearch: []
        }
    }

    async componentDidMount() {
        await axios({
            method: 'post',
            url: 'http://localhost:8089/charity/access/token',
            headers: {}, 
            data: {
              user_id: 2,
              token: 'abcd'
            }
          });

        let res = await axios({
            method: 'get',
            url: 'http://localhost:8089/charity/campaign/get-all',
            headers: {
                token: 'abcd'
            }
        }).then(res => res.data);
        if(res && res.length > 0) {
            let dataAllCampaigns = [];
            dataAllCampaigns = res.map((item, index) => ({
                key: index,
                name: item.campaignName,
                receive: 0,
                complete: '0%',
                target: item.targetAmount,
                status: item.status,
                campaign_id: item.id
            }))
            this.setState({
                dataSource: dataAllCampaigns,
                dataSourceSearch: dataAllCampaigns
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    
    }

    handleActions = async (record, type) => {
        if(type === 'edit') {
            this.showModal();
        }
        else if(type === 'delete') {
            console.log(record)
            await axios({
                method: 'delete',
                url: `http://localhost:8089/charity/campaign/delete-campaign?campaign-id=${record.campaign_id}`,
                headers: {
                    token: 'abcd'
                },
            });
            toast.success('Đã xóa cuộc vận động này!');
            
            let res = await axios({
            method: 'get',
            url: 'http://localhost:8089/charity/campaign/get-all',
            headers: {
                token: 'abcd'
            }
            }).then(res => res.data);
            if(res && res.length > 0) {
                let dataAllCampaigns = [];
                dataAllCampaigns = res.map((item, index) => ({
                    key: index,
                    name: item.campaignName,
                    receive: 0,
                    complete: '0%',
                    target: item.targetAmount,
                    status: item.status,
                    campaign_id: item.id
                }))
                this.setState({
                    dataSource: dataAllCampaigns,
                    dataSourceSearch: dataAllCampaigns
                })
            }
            }
    }

    handleClickCampaign = () => {
        this.setState({
            isOpenModalCompaign: true,
            type: true
        })
    }

    showModal = () => {
        this.setState({
            isOpenModalEdit: true,
            type: false
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

    globalSearch = (value) => {
        const filteredData = this.state.dataSource.filter((data) => {
            return (
                data.name.toLowerCase().includes(value.toLowerCase()) ||
                data.target.toLowerCase().includes(value.toLowerCase()) ||
                data.receive.toLowerCase().includes(value.toLowerCase()) ||
                data.complete.toLowerCase().includes(value.toLowerCase()) ||
                data.status.toLowerCase().includes(value.toLowerCase())
            )
        })
        this.setState({
            dataSourceSearch: filteredData
        })
    }

    render() {
        const {isOpenModalCompaign, isOpenModalEdit} = this.state;

        return (
            <>
                <PageLayout keyActive='campaign'>
                    <div className="campaign-list-title">
                        <Button 
                            type="primary"
                            onClick={() => this.handleClickCampaign()}
                        >
                            Tạo cuộc vận động mới
                        </Button>
                    </div>
                    <div className="campaign-list-table">
                        <div className="c-l-t-header">
                            <h2 className="c-l-t-name">Danh sách cuộc vận động</h2>
                            <Search
                                placeholder="Tìm kiếm"
                                allowClear
                                style={{
                                    width: 300,
                                }}
                                onSearch={(value) => {
                                    this.globalSearch(value)
                                }} 
                                onChange={(e) => {
                                    this.globalSearch(e.target.value)
                                }}
                            />
                        </div>
                        
                        <TableApp 
                            columns={this.state.columns} 
                            dataSource={this.state.dataSourceSearch} 
                        />
                        
                    </div>

                    <ModalEditCompaign 
                        isOpenModalEdit={isOpenModalEdit} 
                        handleCancel={this.handleCancel}
                        type={this.state.type}
                    />
                    
                    <ModalCreateCampaign 
                        isOpenModalCompaign={isOpenModalCompaign}
                        handleCancel={this.handleCancel}
                        type={this.state.type && this.state.type }
                    />
                </PageLayout>
            </>
        )
    }
    
}

export default CamPaignList;