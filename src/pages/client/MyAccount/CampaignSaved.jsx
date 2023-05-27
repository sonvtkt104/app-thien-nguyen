import SideBar from "./SideBar";
import { Row, Col, Input, Space, Form } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProvinces, getCampaignFollow } from "../../../api/campaigns";
import { ItemCampaign } from "./components/ItemCampaign";

function CampaignSaved() {

    const {userType, infoUser} = useSelector(state => state?.app)
    const navigate = useNavigate()

    const [listCampaignFollow, setListCampaignFollow] = useState([])
    const [listCampaignFollowOrigin, setListCampaignFollowOrigin] = useState([])
    const [search, setSearch] = useState("")
    const [listProvinces, setListProvinces] = useState({})

    useEffect(() => {
        console.log("campaign follow", userType, infoUser)
        getCampaignFollow().then(res => {
            console.log('campaign follow', res.data)
            let arr = [];
            res?.data?.forEach(item => {
                console.log(item)
                let obj = {
                    campaignId: item.id,
                    campaignName: item.campaignName,
                    campaignImage: item?.images?.split(',')[0],  // ???
                    campaignTargetAmount: Number(item.targetAmount),
                    campaignReceiveAmount: Number(item.receiveAmount),
                    campaignRegion: item.region,
                    campaignStatus: item.status,
                    campaignStartDate: item.startDate,
                    campaignStopDate: item.stopDate,
                    campaignTargeObject: item.targetObject,
                    charityId: item?.organization.id,
                    charityName: item?.organization.charityName,
                    charityAvatar: item?.organization.avatar,
                    charityIsVerified: item?.organization.isVerified,
                    isFollow: 1
                }
                arr.push(obj)
            })
            console.log('arrr list campaign follow', arr)
            setListCampaignFollow(arr)
            setListCampaignFollowOrigin(arr)
        })

        getAllProvinces().then(res => {
            console.log('getAllProvinces', res.data)
            let obj = {}
            res?.data?.forEach(item => {
                obj[item?.codeName] =  item?.name
            })
            setListProvinces(JSON.parse(JSON.stringify(obj)))
        })
    }, [])

    const handleSearch = () => {
        if(search) {
            let result = listCampaignFollowOrigin?.filter(campaign => {
                return campaign?.campaignName?.toLowerCase()?.includes(search?.toLowerCase())
            })
            setListCampaignFollow(JSON.parse(JSON.stringify(result)))
        } else {
            setListCampaignFollow(JSON.parse(JSON.stringify(listCampaignFollowOrigin)))
        }
    }


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


    return (
        <SideBar>
            <div className="cs-title" style={{marginBottom: 30}}>
                <h2 className="h2-app">Danh sách các Cuộc vận động</h2>
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
                            placeholder="Nhập tên cuộc vận động"
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
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap:"wrap" }} >
                {
                    (listCampaignFollow && listCampaignFollow.length > 0) ? listCampaignFollow?.map((item, index) => (
                        <ItemCampaign
                            key={index}
                            style={{ width: "48%", marginBottom: 30 }}
                            data={item}
                            listCampaignFollow={listCampaignFollow}
                            setListCampaignFollow={setListCampaignFollow}
                            listCampaignFollowOrigin={listCampaignFollowOrigin}
                            setListCampaignFollowOrigin={setListCampaignFollowOrigin}
                            listProvinces={listProvinces}
                        />
                    )): (
                        <div>
                            Không tìm thấy cuộc vận động nào. Hãy theo dõi các <span className="link-app" style={{color: 'var(--color-blue)', fontWeight: '600', cursor: 'pointer'}} onClick={() => {navigate('/campaign-all')}}>Cuộc vận động</span> ngay bây giờ
                        </div>
                    )
                }
            </div>
        </SideBar>
    )
}

export default CampaignSaved
