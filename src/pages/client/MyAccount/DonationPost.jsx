import "./css/DonationPost.css"
import { Button } from "antd";
import SideBar from "./SideBar";
import ItemDonationPost from "./ItemDonationPost";
import { useState } from "react";
import DonationPostDialog from "./DonationPostDialog";


function DonationPost() {
  const [openDialog, setOpenDialog] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})

    const donationPosts = [
        {
          "id": "6",
          "idDonor": "abcd12345",
          "status": "Chưa nhận",
          "organizationReceived": null,
          "message": "Đợi xác nhận",
          "name": "Sách vở 2",
          "donationAddress": "Hà Nam",
          "donationObject": "Trẻ em khó khăn",
          "donorName": "Khuất Văn Hải",
          "phone": "0123456789",
          "address": "Cầu Giấy Hà Nội",
          "date": "03/12/2023",
          "description": "Sách vở cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
          "images": [
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
            "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
            "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg",
            "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
          ]
        },
        {
          "id": "7",
          "idDonor": "abcd12345",
          "status": "Đã nhận",
          "organizationReceived": "Mái ấm gia đình Mái ấm gia đình",
          "message": "Đợi xác nhận",
          "name": "Quần áo 3",
          "donationAddress": "Nam Định",
          "donationObject": "Trẻ em vùng cao",
          "donorName": "Khuất Văn Hải",
          "phone": "0123456789",
          "address": "Cầu Giấy Hà Nội",
          "date": "03/12/2023",
          "description": "Quần áo cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
          "images": [
            "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
            "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg",
            "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
          ]
        },
        {
          "id": "8",
          "idDonor": "abcd12345",
          "status": "Đã nhận",
          "organizationReceived": "Áo ấm mùa đông",
          "message": "Đã xác nhận",
          "name": "Giày dép",
          "donationAddress": "Hà Giang",
          "donationObject": "Gia đình khó khăn",
          "donorName": "Nguyễn Xuân Sơn",
          "phone": "0123456789",
          "address": "Cầu Giấy Hà Nội",
          "date": "05/07/2022",
          "description": "Giày dép cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
          "images": [
            "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
            "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg",
            "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
          ]
        },
        {
          "id": "9",
          "idDonor": "abcd12345",
          "status": "Chưa nhận",
          "organizationReceived": null,
          "message": "Đã xác nhận",
          "name": "Đồ dùng học tập",
          "donationAddress": "Hà Tĩnh",
          "donationObject": "Học sinh khó khăn",
          "donorName": "Nguyễn Bá Tiên",
          "phone": "0123456789",
          "address": "Cầu Giấy Hà Nội",
          "date": "21/08/2021",
          "description": "Đồ dùng học tập đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
          "images": [
            "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg",
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
            "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
            "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
          ]
        },
        {
          "id": "13",
          "idDonor": "abcd12345",
          "status": "Đã nhận",
          "message": "Đã xác nhận",
          "organizationReceived": "Áo ấm mùa hè",
          "name": "Balo",
          "donationAddress": "Quảng Ninh",
          "donationObject": "Trẻ em vùng cao",
          "donorName": "Khuất Văn Hải",
          "phone": "0123456789",
          "address": "Xuân Thủy Cầu Giấy Hà Nội",
          "date": "25/02/2020",
          "description": "Balo đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
          "images": [
            "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
            "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",
            "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/tfohiuh/2020_10_25/bna_image_6029069_25102020.jpeg"
          ]
        }
      ]

    const handleCloseModal = () => {
        setOpenDialog(false)
        setDataUpdate({})
    }
    const handleOpenModalEdit = (data) => {
      setOpenDialog(true)
      setDataUpdate(data)
  }
    return (
        <SideBar>
            <div className="dp-title">
                <h2>Bài viết đã đăng</h2>
                <Button 
                  type="primary" 
                  className="dp-create" 
                  size="large"
                  onClick={() => {
                    setOpenDialog(true)
                  }}
                >
                  Tạo mới
                </Button>
            </div>
            <div className="dp-container">
                {
                    donationPosts.map((post,index) => {
                        return <ItemDonationPost
                            handleOpenModal={()=>{handleOpenModalEdit(post)}}
                            key={index}
                            data={post}
                        />
                    })
                }
            </div>
            {
              openDialog && <DonationPostDialog 
                              dataUpdate={dataUpdate} 
                              handleCloseModal={handleCloseModal}
                            />
            }
        </SideBar>
    )
}

export default DonationPost