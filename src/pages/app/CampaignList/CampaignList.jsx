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

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import CamPaignPreview from "./CampaignPreview";
const { confirm } = Modal;



class CamPaignList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpenModalCompaign: false,
            isOpenModalEdit: false,
            valueSearch: '',
            type: false,
            dataOrigin: {},
            campaign_id: '',
            organization_id: '',
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
                                <Link to={`/campaign-list/preview/${record.campaign_id}`}>
                                    <EyeOutlined
                                        className="actions-hide"
                                        onClick={()=> this.handleActions(record, 'preview')}
                                    />
                                </Link> 
            
                                <EditOutlined
                                    className="actions-edit"
                                    onClick={()=> this.handleActions(record, 'edit')}
                                />
            
                                <DeleteOutlined
                                    className="actions-delete"
                                    onClick={() => this.showDeleteConfirm(record)}
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
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    getData = async () => {
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
                campaign_id: item.id,
                organization_id: item.organization && item.organization.id
            }))
            this.setState({
                dataSource: dataAllCampaigns,
                dataSourceSearch: dataAllCampaigns
            })
        }
    }

    handleActions = async (record, type) => {
        if(type === 'edit') {
            this.showModal();
            // let res = await axios({
            //     method: 'get',
            //     url: `http://localhost:8089/charity/campaign/get-by-condition?campaign-id=${record.campaign_id}&organization-id=${record.organization_id}`,
            //     headers: {
            //         token: 'abcd'
            //     }
            // }).then(res => res.data)
            // if(res && res.organization && res.organization.id) {
            //     this.setState({
            //         dataOrigin: res
            //     })
            // }
            this.setState({
                campaign_id: record.campaign_id,
                organization_id: record.organization_id
            })
        }
        // else if(type === 'delete') {

        //     await axios({
        //         method: 'delete',
        //         url: `http://localhost:8089/charity/campaign/delete-campaign?campaign-id=${record.campaign_id}`,
        //         headers: {
        //             token: 'abcd'
        //         },
        //     });
        //     toast.success('Đã xóa cuộc vận động này!');
        //     this.getData(); 
        // }
        else if(type === 'preview') {

        }
    }

    showDeleteConfirm = (record) => {
        let _this = this;
        confirm({
          title: 'Bạn muốn xóa cuộc vận động này?',
          icon: <ExclamationCircleFilled />,
          content: 'Dữ liệu bị xóa sẽ không thể khôi phục, vẫn tiếp tục?',
          okText: 'Đồng ý',
          okType: 'danger',
          cancelText: 'Hủy bỏ',
          centered: true,
          async onOk() {
            await axios({
                method: 'delete',
                url: `http://localhost:8089/charity/campaign/delete-campaign?campaign-id=${record.campaign_id}`,
                headers: {
                    token: 'abcd'
                },
            });
            toast.success('Đã xóa cuộc vận động này!');
            _this.getData();
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      };

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
    
    globalSearch = (value) => {
        const filteredData = this.state.dataSource.filter((data) => {
            return (
                data.name.toLowerCase().includes(value.toLowerCase())
                // data.target.toLowerCase().includes(value.toLowerCase()) ||
                // data.receive.toLowerCase().includes(value.toLowerCase()) ||
                // data.complete.toLowerCase().includes(value.toLowerCase()) ||
                // data.status.toLowerCase().includes(value.toLowerCase())
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

                    <ModalCreateCampaign 
                        isOpenModalCompaign={isOpenModalCompaign}
                        handleOk={this.handleOk} 
                        handleCancel={this.handleCancel}
                        getData={this.getData}
                    />

                    <ModalEditCompaign 
                        isOpenModalEdit={isOpenModalEdit}
                        handleOk={this.handleOk} 
                        handleCancel={this.handleCancel}
                        getData={this.getData}
                        campaign_id={this.state.campaign_id}
                        organization_id={this.state.organization_id}
                    />
                    
                </PageLayout>
            </>
        )
    }
    
}

export default CamPaignList;