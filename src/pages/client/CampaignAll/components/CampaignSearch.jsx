import { Col, Input, Popover, Row } from "antd"
import { memo, useMemo, useState } from "react"
import { FilterIcon, SearchIcon, Tag } from "../../../../components"

function CampaignSearch({
    search,
    setSearch,
    name,
    setName,
    targetObject,
    setTargetObject,
    region,
    setRegion,
    status,
    setStatus,
    campaignTargetAmountFrom,
    setCampaignTargetAmountFrom,
    campaignTargetAmountTo,
    setCampaignTargetAmountTo,
}) {
    const [openFilter, setOpenFilter] = useState(true)

    const recommendSearch = useMemo(() => {
        return [
            "Lũ lụt",
            "Trại trẻ mồ côi",
            "Làng trẻ SOS",
            "Áo ấm trao em",
        ]
    }, [])

    return (
        <Row
            style={{ height: 300, background: '#f0f0f0', textAlign: 'center' }}
            justify='center'
            className="flex-col-center"
        >
            <Row justify='center' className="h1-app" style={{ marginBottom: 50 }}>
                Đồng hành cùng nhau để xây dựng một tương lai tốt đẹp hơn
            </Row>
            <Row>
                <span style={{ width: '50%', margin: 'auto', position: 'relative' }}>
                    <Input
                        className="input-app"
                        style={{ width: '100%', margin: 'auto', height: 56, background: '#fff', boxShadow: '0px 10px 40px rgba(56, 56, 58, 0.04)', padding: '28px 60px 28px 55px', borderRadius: '50px' }}
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                    />
                    <SearchIcon
                        fontSize={26}
                        style={{ position: 'absolute', left: 20, top: 15 }}
                    />
                    <span
                        style={{ position: 'absolute', right: 20, top: 15, cursor: 'pointer' }}
                        onClick={() => setOpenFilter(true)}
                    >
                        <FilterIcon
                            fontSize={26}
                        />
                    </span>
                    <span style={{display: openFilter ? 'block' : "none", position: 'fixed', inset: 0, opacity: 0, zIndex: 99}}
                        onClick={() => setOpenFilter(false)}
                    >
                    </span>
                    <div
                        style={{position: 'absolute', width: '100%', paddingTop: '10px', zIndex: 100}}
                    >
                        <div className='item-filter-search' style={{ display: openFilter ? 'block' : "none", background: '#ffffff', borderRadius: 12,padding: 30, boxShadow:'0px 10px 40px rgba(56, 56, 58, 0.1)', minHeight: 200 }}>
                            <Row justify='space-between'
                                style={{marginBottom:20}}
                            >
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'left', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    Tên
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <input type="text" 
                                        // placeholder="Tên cuộc vận động"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 20px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row justify='space-between'
                                style={{marginBottom:20}}
                            >
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'left', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    Khu vực
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <input type="text" 
                                        // placeholder="Tên cuộc vận động"
                                        value={region}
                                        onChange={(e) => {
                                            setRegion(e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 20px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row justify='space-between'
                                style={{marginBottom:20}}
                            >
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'left', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    Trạng thái
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <input type="text" 
                                        // placeholder="Tên cuộc vận động"
                                        value={status}
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 20px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'center', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    Đối tượng
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <input type="text" 
                                        // placeholder="Tên cuộc vận động"
                                        value={targetObject}
                                        onChange={(e) => {
                                            setTargetObject(e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 20px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row justify='space-between'
                                style={{marginBottom:20}}
                            >
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'left', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    From
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <input type="number" 
                                        placeholder="vnđ"
                                        value={campaignTargetAmountFrom}
                                        onChange={(e) => {
                                            setCampaignTargetAmountFrom(Number(e.target.value));
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 0px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}
                                    className="flex-col-center"
                                    style={{textAlign: 'center', lineHeight: '25px', fontWeight: '500'}}
                                >
                                    To
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <input type="number" 
                                        // placeholder="Tên cuộc vận động"
                                        placeholder="vnđ"
                                        value={campaignTargetAmountTo}
                                        onChange={(e) => {
                                            setCampaignTargetAmountTo(Number(e.target.value));
                                        }}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #e8e8e8',
                                            padding: '2px 0px 2px 0',
                                            outline: 'none'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row
                                justify='end'
                            >
                                <button
                                    className="btn"
                                    style={{ 
                                        marginRight: 12
                                    }}
                                    onClick={() => {
                                        setName("")
                                        setTargetObject("")
                                        setRegion("")
                                        setStatus("")
                                        setCampaignTargetAmountFrom(0)
                                        setCampaignTargetAmountTo(0)
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="btn-primary"
                                >
                                    Tìm kiếm
                                </button>
                            </Row>
                        </div>
                    </div>
                </span>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: 20 }}>
                <span
                    style={{ fontWeight: '600', lineHeight: '28px', marginRight: 10, fontSize: 16 }}
                >
                    Tìm kiếm phổ biến:
                </span>
                <span>
                    <Row>
                        {
                            recommendSearch.map((item, i) => (
                                <span key={i} style={{ cursor: 'pointer' ,background: '#ffffff', fontWeight: '600', border: '1px solid var(--color-blue)', borderRadius: 20, padding: "5px 14px", color: 'var(--color-blue)', marginRight: 10 }}
                                    onClick={()=> {
                                        setSearch(item)
                                    }}
                                >
                                    {item}
                                </span>
                            ))
                        }
                    </Row>
                </span>
            </Row>
        </Row>
    )
}

export default memo(CampaignSearch)