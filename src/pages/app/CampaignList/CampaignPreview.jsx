import { Component } from "react";
import { ArrowLeftIcon, PageLayout, SegmentedApp, TableApp } from "../../../components";
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Divider, Modal } from "antd";
import { Link } from "react-router-dom";
import Chart from 'react-apexcharts';

import './CampaignPreview.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class CamPaignPreview extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            options: [
                {label: 'Thông tin chung', value: 1},
                {label: 'Bài viết giới thiệu', value: 2}, 
                {label: 'Hoạt động', value: 3}, 
                {label: 'Sao kê', value: 4}, 
                {label: 'Thống kê', value: 5}
            ],
            valueOption: 1,
            contentHTML: '',
            contentMarkdown: '',
            columns: [
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
            dataSource: [
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

            columns2: [
                {
                  key: 1,
                  title: "Họ và tên",
                  dataIndex: "fullname",
                  align: 'center',
                },
                {
                  key: 2,
                  title: "Số tiền",
                  dataIndex: "money",
                  align: 'center',
                },
                {
                  key: 3,
                  title: "Nội dung",
                  dataIndex: "content",
                  align: 'center',
                },
                {
                  key: 4,
                  title: "Thời gian",
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
                    fullname: "Nguyễn Xuân Sơn",
                    money: "8.000.000 VNĐ",
                    content: "Ủng hộ",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 2,
                    fullname: "Trịnh Hoàng",
                    money: "5.000.000 VNĐ",
                    content: "Ủng hộ bà con",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 3,
                    fullname: "Nguyễn Bá Tiên",
                    money: "3.000.000 VNĐ",
                    content: "ung ho",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 4,
                    fullname: "Khuất Văn Hải",
                    money: "2.000.000 VNĐ",
                    content: "Ủng hộ miền Trung",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 5,
                    fullname: "Lê Mạnh Linh",
                    money: "10.000.000 VNĐ",
                    content: "Ủng hộ",
                    date: '15/03/2023',
                    action: 'no'
                },
                {
                    key: 5,
                    fullname: "Lê Văn Kiên",
                    money: "4.000.000 VNĐ",
                    content: "Ủng hộ",
                    date: '15/03/2023',
                    action: 'no'
                },
            ],
            optionsChart1: {
                series: [98, 2],
                labels: ["Đã ủng hộ", "Chưa ủng hộ"],
                chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
            optionsChart2: {
                series: [{
                    name: 'Số lượt tiếp cận',
                    data: [100, 200, 150, 400, 1000, 800, 100, 2000, 300, 40, 600, 1000]
                }],
                xaxis:{
                    categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
                  },

                  options: {
                    chart: {
                      height: 300,
                      type: 'area'
                    },
                    dataLabels: {
                      enabled: false,
                      style: {
                        colors: ['#F44336', '#E91E63', '#9C27B0']
                      }
                    },
                    stroke: {
                      curve: 'smooth'
                    },
                  },
                
            }
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        console.log(html, text);
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    render() {
        let {options, valueOption} = this.state;
        return (
            <>
                <PageLayout>
                    <div className="campaign-preview-container">
                        <div className="navigation-bar">
                            <div className="n-b-left">
                                <Link to={"/campaign-list"} className="n-b-l-back">
                                    <ArrowLeftIcon fontSize={24} color={"black"} style={{cursor: 'pointer'}} />
                                </Link>
                                <div>Quyên góp miền Trung</div>
                            </div>
                            <div className="n-b-right">
                                <Button type="primary">Preview</Button>
                            </div>
                        </div>
                        <SegmentedApp 
                            className="segmented-preview"
                            options={options}
                            value={valueOption}
                            onChange={(valueOption) => this.setState({valueOption: valueOption})}
                        />
                        {
                            valueOption === 1 &&
                            <>
                                <div className="c-p-c-content">
                                    <button className="btn-preview-edit">Chỉnh sửa</button>
                                    <div className="content-info">
                                        <div className="form-group">
                                            <label>Tên cuộc vận động:</label>
                                            <div>Quyên góp miền Trung</div>
                                        </div>
                                        <div className="form-group">
                                            <label>Giới thiệu:</label>
                                            <div>abc</div>
                                        </div>
                                        <div className="form-group">
                                            <label>Đối tượng:</label>
                                            <div>Đồng bào miền Trung</div>
                                        </div>
                                        <div className="form-group">
                                            <label>Thời gian bắt đầu:</label>
                                            <div>15/3/2023</div>
                                        </div>
                                        <div className="form-group">
                                            <label>Thời gian kết thúc:</label>
                                            <div>Chưa rõ</div>
                                        </div>
                                        <div className="form-group">
                                            <label>Mô tả:</label>
                                            <div>abc</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            valueOption === 2 &&
                            <div className="c-p-c-content">
                                <MdEditor
                                    value={this.state.contentMarkdown} 
                                    style={{height: '300px'}} 
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                />
                                <button className="btn-preview-save">Lưu</button>
                            </div>
                        }
                        {
                            valueOption === 3 &&
                            <div className="activity-container">
                                <div className="header-title">
                                    <div className="h-t-name">Danh sách hoạt động</div>
                                </div>
                                <Divider />
                                <TableApp columns={this.state.columns} dataSource={this.state.dataSource}>

                                </TableApp>
                            </div>
                        }
                        {
                            valueOption === 4 &&
                            <div className="statement-container">
                                <div className="s-c-up">
                                    <div className="total-donor">Tổng: 100 người ủng hộ</div>
                                    <div className="btn-actions">
                                        <button className="btn-action-import">Import</button>
                                        <button className="btn-action-export">Export</button>
                                    </div>
                                </div>
                                <div className="s-c-down">
                                    <div className="statement-table">
                                        <div className="header-title">
                                        <div className="h-t-name">Danh sách hoạt động sao kê</div>
                                    </div>
                                    <Divider />
                                    <TableApp columns={this.state.columns2} dataSource={this.state.dataSource2}>

                                    </TableApp>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            valueOption === 5 &&
                            <div className="statistical-container">
                                <div className="statistical-up">
                                    <div className="s-t-left">
                                        <div className="s-t-l-title">Tiến độ hoàn thành</div>
                                        <Divider />
                                        <div className="s-t-l-body">
                                            <Chart options={this.state.optionsChart1} type="donut" series={this.state.optionsChart1.series} width={'100%'} height={120} />
                                        </div>
                                            <div className="thong-ke">
                                                <div>Trạng thái: <span style={{fontWeight: '600'}}>Hoạt động</span></div>
                                                <div>Mục tiêu: <span style={{fontWeight: '600'}}>500.000.000 triệu</span></div>
                                                <div>Đã ủng hộ: <span style={{fontWeight: '600'}}>490.000.000 triệu</span></div>
                                            </div>
                                    </div>
                                    <div className="s-t-right">
                                        <div className="s-t-r-title">Thống kê số lượt tiếp cận</div>
                                        <Divider />
                                        <Chart options={this.state.optionsChart2} type="area" series={this.state.optionsChart2.series} width={'100%'} height={220} />                                      
                                    </div>
                                </div>
                                <div className="statistical-down">
                                    <div className="s-t-r-title">Thống kê ủng hộ</div>
                                    <Divider />  
                                    <Chart options={this.state.optionsChart2} type="area" series={this.state.optionsChart2.series} width={'100%'} height={250} />                                                                         
                                </div>
                            </div>
                        }
                        
                    </div>
                </PageLayout>
            </>
        )
    }
    
}

export default CamPaignPreview;