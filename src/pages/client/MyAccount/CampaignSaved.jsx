import SideBar from "./SideBar";
import { Row, Col, Input } from "antd";
import { ItemCampaign } from "../../../components";

function CampaignSaved() {


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
            <div className="cs-title">
                <h2>Danh sách các Cuộc vận động</h2>
                <Input.Search
                    placeholder="Tìm kiếm..."
                    allowClear
                    enterButton="Search"
                    // size="large"
                    onSearch={(value) => {
                        globalSearch(value)
                    }}
                    onChange={(e) => {
                        globalSearch(e.target.value)
                    }}
                    className='cs-input-search'
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap:"wrap" }} >
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                        <ItemCampaign
                            key={index}
                            style={{ width: "48%", marginBottom: 30 }}
                        />
                    ))
                }
            </div>
        </SideBar>
    )
}

export default CampaignSaved
