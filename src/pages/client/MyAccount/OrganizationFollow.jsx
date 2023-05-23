import "./css/OrganizationFollow.css"
import SideBar from "./SideBar";
import { Row, Col, Input, Form, Space } from "antd";
import ItemCharity from "./components/ItemCharity";
import {useState, useEffect} from 'react'
import { getCharityFollow } from '../../../api/charities'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { FilterIcon, SearchIcon, Tag } from "../../../components"


function OrganizationFollow() {

    const {userType, infoUser} = useSelector(state => state?.app)
    const navigate = useNavigate()

    const [listCharityFollow, setListCharityFollow] = useState()
    const [listCharityFollowOrigin, setListCharityFollowOrigin] = useState()
    const [search, setSearch] = useState("")


    useEffect(() => {
        console.log("organizationFollow", userType, infoUser)
        getCharityFollow(infoUser?.id).then(res => {
            let arr = []
            res?.data?.data?.forEach(item => {
                console.log("charity", item)
                let obj =  {
                    charityId : Number(item.charityId),
                    charityName : item.charityName,
                    charityImage : item.charityImage,  
                    charityDescription: item.charityDescription ,
                    isVerified: item.isVerified,   
                    isFollow : 1,   
                    charityBanner : item.charityBanner,  
               }

               arr.push(obj)
            })
            setListCharityFollow(arr)
            setListCharityFollowOrigin(arr)
        })
    }, [])


    const globalSearch = (value) => {
        // const filteredData = donationPosts.filter((donation) => {
        //   return (
        //     donation.date?.toLowerCase().includes(value.toLowerCase()) ||
        //     donation.name?.toLowerCase().includes(value.toLowerCase()) ||
        //     donation.organizationReceived?.toLowerCase().includes(value.toLowerCase()) ||
        //     donation.status?.toLowerCase().includes(value.toLowerCase())
        //     // donation.donationAddress.toLowerCase().includes(value.toLowerCase()) ||
        //     // donation.phone.toLowerCase().includes(value.toLowerCase()) ||
        //     // donation.address.toLowerCase().includes(value.toLowerCase()) ||
        //     // donation.donorName.toLowerCase().includes(value.toLowerCase()) ||
        //     // donation.donationObject.toLowerCase().includes(value.toLowerCase())
        //   )
        // })
        // setSearcheddata(filteredData)
    }

    const handleSearch = () => {
        if(search) {
            let result = listCharityFollowOrigin?.filter(charity => {
                return charity?.charityName?.toLowerCase()?.includes(search?.toLowerCase())
            })
            setListCharityFollow(JSON.parse(JSON.stringify(result)))
        } else {
            setListCharityFollow(JSON.parse(JSON.stringify(listCharityFollowOrigin)))
        }
    }

    return (
        <SideBar>
            <div className="cs-title" style={{marginBottom: 30}}>
                <h2 className="h2-app">Danh sách các Tổ chức</h2>
                <Form
                    name="basic"
                    onFinish={() => {
                        console.log("finish")
                        handleSearch()
                    }}
                >
                    <Row justify={"end"}>
                      <Space>
                          <input
                            className="input-app"
                            placeholder="Nhập tên tổ chức"
                            type="search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            style={{
                              minWidth: 300,
                              height: 40
                            }}
                          />
                          <button className="btn-primary">
                              Tìm kiếm
                          </button>
                      </Space>
                  </Row>
                </Form>
            </div>
            {/* <Row justify='space-between'>
                {
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <Col xs={11} sm={11} md={11} lg={11} xl={11}
                            style={{ marginBottom: 30 }}
                            key={index}
                        >
                            <ItemCharity />
                        </Col>
                    ))
                }
            </Row> */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap:"wrap" }} >
                {
                    (listCharityFollow && listCharityFollow.length > 0) ? listCharityFollow?.map((item, index) => (
                        <div style={{position:"none", width: "48%", marginBottom: 30 }}>
                            <ItemCharity
                                key={index}
                                className="of-itemCharity"
                                data={item}
                                listCharityFollow={listCharityFollow}
                                setListCharityFollow={setListCharityFollow}
                                listCharityFollowOrigin={listCharityFollowOrigin}
                                setListCharityFollowOrigin={setListCharityFollowOrigin}
                            />
                        </div>

                    )): (
                        <div>
                            Không tìm thấy tổ chức từ thiện nào. Hãy theo dõi các <span className="link-app" style={{color: 'var(--color-blue)', fontWeight: '600', cursor: 'pointer'}} onClick={() => {navigate('/charity-all')}}>Tổ chức từ thiện</span> ngay bây giờ
                        </div>
                    )
                }
            </div>
        </SideBar>
    )
}

export default OrganizationFollow