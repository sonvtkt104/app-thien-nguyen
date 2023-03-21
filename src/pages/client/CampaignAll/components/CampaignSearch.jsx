import { Input, Popover, Row } from "antd"
import { memo, useState } from "react"
import { FilterIcon, SearchIcon, Tag } from "../../../../components"

function CampaignSearch() {
    const [openFilter, setOpenFilter] = useState(false)

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
                        <div className='item-filter-search' style={{ display: openFilter ? 'block' : "none", background: '#ffffff', borderRadius: 12,padding: 20, boxShadow:'0px 10px 40px rgba(56, 56, 58, 0.1)', minHeight: 200 }}>
                            <div>name</div>
                            <div>Doi tuong</div>
                            <div>khu vuc</div>
                            <div>loai hinh</div>
                            <div>muc tieu so tien</div>
                            <div>status</div>
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
                        <span style={{ background: '#ffffff', fontWeight: '600', border: '1px solid var(--color-blue)', borderRadius: 20, padding: "5px 14px", color: 'var(--color-blue)', marginRight: 10 }}>
                            Lũ lụt
                        </span>
                        <span style={{ background: '#ffffff', fontWeight: '600', border: '1px solid var(--color-blue)', borderRadius: 20, padding: "5px 14px", color: 'var(--color-blue)', marginRight: 10 }}>
                            Trại trẻ mồ côi
                        </span>
                        <span style={{ background: '#ffffff', fontWeight: '600', border: '1px solid var(--color-blue)', borderRadius: 20, padding: "5px 14px", color: 'var(--color-blue)', marginRight: 10 }}>
                            Làng trẻ SOS
                        </span>
                        <span style={{ background: '#ffffff', fontWeight: '600', border: '1px solid var(--color-blue)', borderRadius: 20, padding: "5px 14px", color: 'var(--color-blue)', marginRight: 10 }}>
                            Áo ấm trao em
                        </span>
                    </Row>
                </span>
            </Row>
        </Row>
    )
}

export default memo(CampaignSearch)