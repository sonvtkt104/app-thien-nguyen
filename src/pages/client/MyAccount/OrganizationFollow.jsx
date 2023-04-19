import SideBar from "./SideBar";
import { Row, Col, Input } from "antd";
import ItemCharity from "../CharityAll/components/ItemCharity";



function OrganizationFollow() {


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
                <h2>Danh sách các Tổ chức</h2>
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
            <Row justify='space-between'>
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
            </Row>
        </SideBar>
    )
}

export default OrganizationFollow