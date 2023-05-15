import { CloseOutlined } from "@ant-design/icons"
import { Col, Row, Tag } from "antd"
import { memo, useState } from "react"
import { ItemCampaign } from "../../../../components"

function CampaignList({
    listCampaign,
    searchKey,
    nameKey,
    targetObjectKey,
    regionKey,
    statusKey,
    campaignTargetAmountFromKey,
    campaignTargetAmountToKey,

    setSearchKey,
    setNameKey,
    setTargetObjectKey,
    setRegionKey,
    setStatusKey,
    setCampaignTargetAmountFromKey,
    setCampaignTargetAmountToKey,

    setSearch,
    setName,
    setTargetObject,
    setRegion,
    setStatus,
    setCampaignTargetAmountFrom,
    setCampaignTargetAmountTo,
}) {



    return (
        <Row justify='center'
            style={{padding :'50px 0'}}
        >
            <Col 
                xs={16} sm={16} md={16} lg={16} xl={16}
            >
                <Row justify='space-between'
                    style={{marginBottom :30}}
                >
                    <Col>
                        <Row>
                            <span style={{fontSize: 18, lineHeight: '36px', fontWeight: '600', marginRight: 30}}>
                                {listCampaign?.length || 0} Cuộc vận động
                            </span>
                            {
                                (searchKey || nameKey) ? (
                                    <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                        <Row>
                                            {`"${searchKey || nameKey}"`}
                                            <span
                                                style={{marginLeft: 7,cursor: 'pointer'}}
                                                onClick={() => {
                                                    if( searchKey) {
                                                        setSearch("")
                                                        setSearchKey("")
                                                    } else if( nameKey) {
                                                        setName("")
                                                        setNameKey("")
                                                    }
                                                }}
                                            >
                                                <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                            </span>
                                        </Row>
                                    </span>
                                ) : ''
                            }
                            {
                                targetObjectKey ? (
                                    <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                        <Row>
                                            {targetObjectKey}
                                            <span
                                                style={{marginLeft: 7,cursor: 'pointer'}}
                                                onClick={() => {
                                                    setTargetObject("")
                                                    setTargetObjectKey("")
                                                }}
                                            >
                                                <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                            </span>
                                        </Row>
                                    </span>
                                ) : ''
                            }
                            {
                                regionKey ? (
                                    <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                        <Row>
                                            {regionKey}
                                            <span
                                                style={{marginLeft: 7,cursor: 'pointer'}}
                                                onClick={() => {
                                                    setRegion("")
                                                    setRegionKey("")
                                                }}
                                            >
                                                <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                            </span>
                                        </Row>
                                    </span>
                                ) : ''
                            }
                            {
                                statusKey ? (
                                    <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                        <Row>
                                            {statusKey}
                                            <span
                                                style={{marginLeft: 7,cursor: 'pointer'}}
                                                onClick={() => {
                                                    setStatus("")
                                                    setStatusKey("")
                                                }}
                                            >
                                                <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                            </span>
                                        </Row>
                                    </span>
                                ) : ''
                            }
                            {
                                (campaignTargetAmountToKey && campaignTargetAmountToKey > 0) ? (
                                    <span style={{ padding: '10px 12px 10px 12px', borderRadius: 8, fontSize: 16, fontWeight: '600', background :'rgba(13,12,34,0.05)', marginRight: 12 }}>
                                        <Row>
                                            {`${campaignTargetAmountFromKey || 0} - ${campaignTargetAmountToKey}`}
                                            <span
                                                style={{marginLeft: 7,cursor: 'pointer'}}
                                                onClick={() => {
                                                    setCampaignTargetAmountFrom(0)
                                                    setCampaignTargetAmountTo(0)
                                                    setCampaignTargetAmountFromKey(0)
                                                    setCampaignTargetAmountToKey(0)
                                                }}
                                            >
                                                <CloseOutlined style={{fontSize: 14, color: 'var(--color-black)'}}/>
                                            </span>
                                        </Row>
                                    </span>
                                ) : ''
                            }
                        </Row>
                    </Col>
                    <Col
                        style={{fontSize: 16, color: 'var(--color-gray)', lineHeight :'36px'}}
                    >
                        Trang 1/1
                    </Col>
                </Row>
                <Row justify='space-between'>
                    {
                        (listCampaign && listCampaign.length > 0) ? listCampaign?.map((item, i) => (
                            <Col xs={11} sm={11} md={11} lg={11} xl={11} key={i}>
                                <ItemCampaign data={item} /> 
                            </Col>
                        ))
                        : (
                            "Không tìm thấy cuộc vận động nào"
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default memo(CampaignList)