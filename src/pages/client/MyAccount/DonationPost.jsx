import "./css/DonationPost.css"
import { Button, Input } from "antd";
import SideBar from "./SideBar";
import ItemDonationPost from "./ItemDonationPost";
import { useEffect, useState } from "react";
import DonationPostDialog from "./DonationPostDialog";
import { getDonationPostUser } from "./MyAccountService";
import { useRef } from "react";
import { getUserInfomationFromCookies, getInfoOfUserFromCookies } from "../../Authentication/HandleUserInfomation";


function DonationPost() {
  const [openDialog, setOpenDialog] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [donationPosts, setDonationPosts] = useState([])
  const [searchedData, setSearcheddata] = useState([])
  const reloadRef = useRef(1)


  const handleReload = (value) => {
    console.log(value)
    reloadRef.current = value
  }

  const getListDonation = () => {
    console.log("reload")
    getDonationPostUser()
      .then(res => setDonationPosts(res.data.filter(data => data.idDonor === getInfoOfUserFromCookies().id)))
  }
  console.log(reloadRef.current)
  useEffect(() => {
    console.log("useeffect")
    getListDonation()
  }, [reloadRef.current])
  useEffect(() => {
    setSearcheddata(donationPosts)
  },[donationPosts])


  const handleCloseModal = () => {
    setOpenDialog(false)
    setDataUpdate({})
  }
  const handleOpenModalEdit = (data) => {
    setOpenDialog(true)
    setDataUpdate(data)
  }

  console.log(donationPosts)


  const globalSearch = (value) => {
    const filteredData = donationPosts.filter((donation) => {
      return (
        donation.date?.toLowerCase().includes(value.toLowerCase()) ||
        donation.name?.toLowerCase().includes(value.toLowerCase()) ||
        donation.organizationReceived?.toLowerCase().includes(value.toLowerCase()) ||
        donation.status?.toLowerCase().includes(value.toLowerCase())
        // donation.donationAddress.toLowerCase().includes(value.toLowerCase()) ||
        // donation.phone.toLowerCase().includes(value.toLowerCase()) ||
        // donation.address.toLowerCase().includes(value.toLowerCase()) ||
        // donation.donorName.toLowerCase().includes(value.toLowerCase()) ||
        // donation.donationObject.toLowerCase().includes(value.toLowerCase())
      )
    })
    setSearcheddata(filteredData)
  }

  return (
    <SideBar>
      <div className="dp-title">
        <h2>Bài viết đã đăng</h2>
        <div>
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
            className='dp-input-search'
          />
          <Button
            type="primary"
            className="dp-create"
            // size="large"
            onClick={() => {
              setOpenDialog(true)
            }}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="dp-container">
        {
          searchedData?.length !== 0 ? searchedData.map((post, index) => {
            return <ItemDonationPost
              handleOpenModal={() => { handleOpenModalEdit(post) }}
              getListDonation={() => { 
                getListDonation() 
              }}
              handleReload={handleReload}
              key={index}
              data={post}
            />
          }) : (<p style={{fontSize: 17, margin:"8px 4px"}}>Bạn chưa có bài đăng quyến góp nào</p>)
        }
      </div>
      {
        openDialog && <DonationPostDialog
          dataUpdate={dataUpdate}
          handleCloseModal={handleCloseModal}
          getListDonation={getListDonation}
        />
      }
    </SideBar>
  )
}

export default DonationPost