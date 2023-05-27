import { Col, Progress, Row } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { setUserFollowCampaign, setUserUnFollowCampaign } from "../../../../api/campaigns";
import { Tag, TickIcon } from "../../../../components";

export function ItemCampaign({
    style,
    className,
    data,
    listCampaignFollow, // [campaignId, ....]
    setListCampaignFollow,
    listCampaignFollowOrigin,
    setListCampaignFollowOrigin,
    listProvinces
}) {

    /**
     * data = {
     *      campaignId,
     *      campaignName,
     *      campaignImage,
     *      campaignTargetAmount,
     *      campaignReceiveAmount,
     *      campaignRegion,
     *      campaignStatus,
     *      campaignStartDate,
     *      campaignStopDate,
     *      campaignTargeObject,
     *      charityId,
     *      charityName,
     *      charityAvatar,
     *      charityIsVerified,
     *      isFollow
     * }
     */

    const navigate = useNavigate()
    const FormatCurrency = useCallback((number) => {
        const currencyString = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Thêm ký tự VND vào cuối chuỗi
        return currencyString + " ₫";
    }, [])

    return (
        <Row
            style={{
                position: 'relative',
                border: '1px solid var(--color-border)',
                marginBottom: '50px',
                boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)',
                borderRadius: 6,
                // cursor: 'pointer',
                ...style,
            }}
            className={className}
            // onClick={() => {
            //     navigate("/detail-campaign/1")
            // }}
        >
            <Col xs={8} sm={8} md={8} lg={8} xl={8}
                style={
                    data?.campaignImage ? {
                        backgroundImage: `url(${data?.campaignImage})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center center',
                    } :{
                        background:'rgba(13, 12, 34, 0.05)'
                    }
                }
                className="flex-col-center"
            >
                {
                    !data?.campaignImage ? (
                        <div style={{color: 'rgba(13, 12, 34, 0.5)', fontWeight: '600', fontSize: 16, textAlign: 'center'}}>
                            {/* CHƯA THÊM ẢNH */}
                        </div>
                    ) : ""
                }
            </Col>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}
                style={{ padding: 20, position: 'relative' }}
            >
                <span
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      cursor: 'pointer',
                      zIndex: 1
                    }}
                    onClick={() => {
                        console.log('like campaign')
                        if(data?.isFollow) { // click to un follow
                            setUserUnFollowCampaign(data?.campaignId).then(res => {
                                console.log(res)
                                let arr = listCampaignFollow?.map(campaign => {
                                    if(campaign?.campaignId == data.campaignId) {
                                        campaign.isFollow = 0
                                    }
                                    return campaign
                                })
                                setListCampaignFollow && setListCampaignFollow(JSON.parse(JSON.stringify(arr)))

                                let arr1 = listCampaignFollowOrigin?.map(campaign => {
                                    if(campaign?.campaignId == data.campaignId) {
                                        campaign.isFollow = 0
                                    }
                                    return campaign
                                })
                                setListCampaignFollowOrigin && setListCampaignFollowOrigin(JSON.parse(JSON.stringify(arr1)))
                            }) 
                        } else { // click to follow
                            setUserFollowCampaign(data?.campaignId).then(res => {
                                console.log(res.data)
                                let arr = listCampaignFollow?.map(campaign => {
                                    if(campaign?.campaignId == data.campaignId) {
                                        campaign.isFollow = 1
                                    }
                                    return campaign
                                })
                                setListCampaignFollow && setListCampaignFollow(JSON.parse(JSON.stringify(arr)))

                                let arr1 = listCampaignFollowOrigin?.map(campaign => {
                                    if(campaign?.campaignId == data.campaignId) {
                                        campaign.isFollow = 1
                                    }
                                    return campaign
                                })
                                setListCampaignFollowOrigin && setListCampaignFollowOrigin(JSON.parse(JSON.stringify(arr1)))
                            }) 
                        }
                    }}
                  >
                    {
                        data?.isFollow ? (
                            <HeartFilled style={{fontSize: 20, fontWeight: '600', color: 'var(--color-red)', transform: 'translateY(-3px)'}} />
                        ) : (
                            <HeartOutlined style={{fontSize: 20, fontWeight: '600', color: 'var(--color-gray)', transform: 'translateY(-3px)'}} />
                        )
                    }
                  </span>
                <div className="text-hover"
                    style={{ fontSize: 18, fontWeight: '600', paddingRight: 20, WebkitLineClamp: 1,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical', cursor: 'pointer' }}

                    onClick={() => {
                        navigate("/detail-campaign/" + data?.campaignId)
                    }}
                >
                    {data?.campaignName}
                </div>
                <Row style={{margin: '10px 0'}}>
                    {
                        data?.campaignTargeObject ? (
                            <span><Tag title={data?.campaignTargeObject} color='var(--color-blue)' background="#e4faff" /></span>
                        ) : ""
                    }
                    {
                        data?.campaignRegion ? data?.campaignRegion?.split(",")?.map((item, i) => {
                            let key = item.trim();
                            return (
                                <span
                                    style={{margin: '0 0px 5px 10px'}}
                                ><Tag title={listProvinces[key]} color='var(--color-red)' background="#ff3c001a"/></span>
                            )
                        })
                        : ""
                    }
                    {/* <span><Tag title={data?.campaignRegion} /></span> */}
                </Row>
                <Row>
                    <span>Mục tiêu: </span>
                    <span style={{fontWeight: '600', marginLeft: 5}}>{FormatCurrency(data?.campaignTargetAmount)}</span>
                </Row>
                <Progress strokeColor={'#6DCCE3'} percent={parseInt(data?.campaignReceiveAmount * 100 / data?.campaignTargetAmount)} showInfo={false} 
                    style={{marginBottom: 20}}
                />
                <Row justify='space-between'
                    style={{paddingTop: 10, borderTop: '1px solid var(--color-border)'}}
                >
                    <Col style={{flexBasis: '65%'}}>
                        <Row>
                            <Col>
                                <img src={data?.charityAvatar || "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"} alt="charity_img" 
                                    style={{width: 40, height: 40, borderRadius: '50%', marginRight: 10, cursor: 'pointer'}}
                                    onClick={() => {
                                        navigate("/profile-charity/" + data?.charityId)
                                    }}
                                />
                            </Col>
                            <Col className="flex-col-center" style={{cursor: 'pointer'}}
                                onClick={() => {
                                    navigate("/profile-charity/" + data?.charityId)
                                }}
                            >
                                {data?.charityName}
                            </Col>
                            {
                                data?.charityIsVerified == 2 ? (
                                    <Col className="flex-col-center" style={{marginLeft: 7}}>
                                        <TickIcon />
                                    </Col>
                                ) : ""
                            }
                        </Row>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <div style={{fontWeight: '600'}}>{`${parseInt(data?.campaignReceiveAmount * 100 / data?.campaignTargetAmount)}%`}</div>
                        <div style={{color: 'var(--color-gray)'}}>Thành công</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
