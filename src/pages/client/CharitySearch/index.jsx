import { Col, Row } from "antd";
import { FooterClient, HeaderClient, TickIcon } from "../../../components";
import CharitySearchHeader from "./components/CharitySearchHeader";


import './css/index.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCharities, getTopCharity, setFollowCharity } from "../../../api/charities";
import { useSelector } from "react-redux";

export default function CharitySearch() {
    const navigate = useNavigate()
    const {userType, infoUser} = useSelector(state => state?.app)
    const [search, setSearch] = useState(new URLSearchParams(window.location.search).get("s") ? (new URLSearchParams(window.location.search).get("s"))?.replaceAll("-", " ")  : "")
    console.log('search', search)

    const [listCharities, setListCharities] = useState([])
    const [listCharitiesOrigin, setListCharitiesOrigin] = useState([])
    const [charityTheBest, setCharityTheBest] = useState([])
    /**
     * data = {
     *  charityId,
        charityName,
        charityImage,
        charityDescription,
        isVerified,
        isFollow, 
        charityBanner,
     * }
     */

    useEffect(() => {
        getAllCharities().then(res => {
            let arr = []
            res?.data?.data?.forEach(item => {
                console.log("charity", item)
                let obj =  {
                    charityId : Number(item.charityId),
                    charityName : item.charityName,
                    charityImage : item.charityImage,  
                    charityDescription: item.charityDescription ,
                    isVerified: item.isVerified,   
                    isFollow : Number(item.isFollow),   
                    charityBanner : item.charityBanner,  
               }

               arr.push(obj)
            })
            setListCharitiesOrigin(JSON.parse(JSON.stringify(arr)))

            if(search) {
                let result = arr?.filter(charity => {
                    return charity?.charityName?.replaceAll("-"," ")?.toLowerCase()?.includes(search?.toLowerCase())
                })
                setListCharities(JSON.parse(JSON.stringify(result)))
            } else {
                setListCharities(JSON.parse(JSON.stringify(arr)))
            }
        }) 
    }, [])

    const handleSearch = () => {
        if(search) {
            let result = listCharitiesOrigin?.filter(charity => {
                return charity?.charityName?.replaceAll("-"," ")?.toLowerCase()?.includes(search?.replaceAll("-"," ")?.toLowerCase())
            })
            setListCharities(JSON.parse(JSON.stringify(result)))
        } else {
            setListCharities(JSON.parse(JSON.stringify(listCharitiesOrigin)))
        }
    }

    useEffect(() => {
        getTopCharity().then(res => {
            console.log('charity the best', res)
            if(res.data && res.data.data) {
                let arr = []
                res?.data?.data?.forEach(item => {
                    let obj = {}
                    obj.id = item.id
                    obj.avatar = item.avatar
                    arr.push(obj)
                })
                setCharityTheBest(arr)
            }
        })
    }, [])

    // const charityTheBest = [
    //     'https://cdn.topcv.vn/60/company_logos/cong-ty-tnhh-transcosmos-viet-nam-63f70af7037aa.jpg',
    //     'https://cdn.topcv.vn/60/company_logos/cong-ty-co-phan-smartosc-61d50e76c4aec.jpg',
    //     'https://crowdfunding.comicola.com/wp-content/uploads/2022/05/Anh-bia-1.jpg',
    //     'https://cdn.topcv.vn/135/company_logos/d5b536ece7651788c2e034cd811aade4-62296d605176d.jpg',
    //     'https://cdn.topcv.vn/60/company_logos/cong-ty-tnhh-transcosmos-viet-nam-63f70af7037aa.jpg',
    //     'https://cdn.topcv.vn/60/company_logos/cong-ty-co-phan-smartosc-61d50e76c4aec.jpg',
    // ]

    console.log("charity search", {
        listCharities,
        listCharitiesOrigin
    })

    return (
        <div className="charity-search-app"
            style={{minHeight: '100vh', background: 'var(--color-background-header)'}}
        >
            <HeaderClient page="charity-all" />
            <CharitySearchHeader search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <div 
                style={{padding:'16px 0 40px'}}
            >
                <Row
                    justify='center'
                >
                    <Col xs={21} sm={21} md={21} lg={21} xl={21}>
                        <Row>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}
                                style={{paddingRight: 15}}
                            >
                                <div
                                    style={{
                                        borderRadius: 8,
                                        padding: 24,
                                        boxShadow: '-1px 1px 6px rgba(0,0,0,.05)',
                                        background: '#fff'
                                    }}
                                >
                                    <div style={{marginBottom: 24}}>
                                        {
                                            (listCharities && listCharities?.length > 0) 
                                            ? (
                                                <>Tìm thấy <span style={{fontWeight: 600, color: 'var(--color-blue)', fontSize: 16}}>{listCharities?.length}</span> tổ chức từ thiện</>
                                            )
                                            : "Không tìm thấy tổ chức từ thiện nào phù hợp với yêu cầu của bạn. Xem thêm các tổ chức từ thiện nổi bật khác."
                                        }
                                    </div>
                                    {
                                        (listCharities && listCharities.length > 0) ? listCharities?.map((item, i) => (
                                            <div style={{position: 'relative'}}>
                                                <span style={{color: item?.isFollow ? "var(--color-gray)" : "var(--color-blue)", cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    zIndex: 1
                                                }}
                                                    onClick={() => {
                                                        console.log('theo doi')
                                                        if(userType == 'normal_user') { // follow or un follow
                                                            if(item.isFollow) { // un follow
                                                                setFollowCharity(infoUser.id, item.charityId, false).then(res => {
                                                                    if(res && res.data && res.data.data == 1) {
                                                                        let arr = listCharities?.map(charity => {
                                                                            if(charity?.charityId == item.charityId) {
                                                                                charity.isFollow = 0
                                                                            }
                                                                            return charity
                                                                        })
                                    
                                                                        setListCharities(JSON.parse(JSON.stringify(arr)))
                                                                    }
                                                                })
                                                            } else { // follow
                                                                setFollowCharity(infoUser.id, item.charityId, true).then(res => {
                                                                    if(res && res.data && res.data.data == 1) {
                                                                        let arr = listCharities?.map(charity => {
                                                                            if(charity?.charityId == item.charityId) {
                                                                                charity.isFollow = 1
                                                                            }
                                                                            return charity
                                                                        })
                                    
                                                                        setListCharities(JSON.parse(JSON.stringify(arr)))
                                                                    }
                                                                })
                                                            }
                                                        } else { // login
                                                            navigate("/login")
                                                        }
                                                    }}
                                                > 
                                                    {
                                                        item?.isFollow ? "Hủy theo dõi" : "Theo dõi"
                                                    }
                                                </span>
                                                <Row
                                                    className="charity-search-item"
                                                    key={i}
                                                    style={{padding: 16, marginBottom: 20, borderRadius: 5, boxShadow: '-1px 1px 6px rgba(0,0,0,.05)', flexWrap: 'nowrap', position: 'relative'}}
                                                    onClick={() => {
                                                        navigate("/profile-charity/" + item?.charityId)
                                                    }} 
                                                >
                                                    <img 
                                                        src={item?.charityImage || "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"}
                                                        alt="charity-logo" 
                                                        style={{
                                                            width: 80, height: 80, 
                                                            borderRadius: 4,
                                                            background: "#FFFF",
                                                            objectFit: "contain",
                                                            filter: 'drop-shadow(-1px 1px 6px rgba(0,0,0,.05))',
                                                            border: '1px solid #f7f7f7',
                                                            marginRight: 16
                                                        }}
                                                    />
                                                    <Col
                                                        style={{padding: '7px 0'}}
                                                    >
                                                        <Row style={{fontWeight: '600', fontSize: 16}}
                                                            // justify='space-between'
                                                        >
                                                            {item?.charityName}
                                                            {
                                                                item?.isVerified == 2 ? (
                                                                    <span style={{marginLeft: 10}}>
                                                                        <TickIcon  />
                                                                    </span>
                                                                ) : ""
                                                            }
                                                            {/* <span style={{color: "var(--color-blue)", cursor: 'pointer'}}
                                                                onClick={() => {

                                                                }}
                                                            > 
                                                                Theo dõi 
                                                            </span> */}
                                                        </Row>
                                                        <div
                                                            style={{
                                                                marginTop: 5,
                                                                lineHeight: '20px',
                                                                WebkitLineClamp: 2,
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}
                                                        >
                                                            {item?.charityDescription}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )) : ""
                                    }
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}
                                style={{paddingLeft: 15}}
                            >
                                <div
                                    style={{
                                        borderRadius: 8,
                                        padding: 24,
                                        boxShadow: '-1px 1px 6px rgba(0,0,0,.05)',
                                        background: '#fff'
                                    }}
                                >
                                    <div style={{fontSize: 16, fontWeight: '600', marginBottom: 20, textAlign: 'center'}}>Tổ chức từ thiện nổi bật</div>
                                    <Row
                                        justify='center'
                                    >
                                        {
                                            charityTheBest.map((item, i) => (
                                                <div
                                                    key={i}
                                                    style={{ background: "#FFFF", borderRadius: '50%',
                                                        margin: '0 10px 16px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        navigate("/profile-charity/" + item?.id)
                                                    }}
                                                >
                                                    <img 
                                                        src={item?.avatar}
                                                        alt="charity-logo" 
                                                        style={{
                                                            width: 60, height: 60, 
                                                            objectFit: 'cover',
                                                            borderRadius: '50%'
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Row>   
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <FooterClient />
        </div>
    )
}

