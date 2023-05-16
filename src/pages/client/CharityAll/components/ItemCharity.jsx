import { Row } from "antd"
import { memo } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFollowCharity } from "../../../../api/charities"

function ItemCharity({
    data,
    listCharities,
    setListCharities
}) {

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

    const navigate = useNavigate()
    const { infoUser, userType } = useSelector(state => state?.app) 

    return (
        <div
            style={{position: 'relative',}}
        >
            <div
                className="box-shadow-app"
                style={{ 
                    background:"#ffffff",
                    boxShadow: '-1px 1px 4px rgba(0,0,0,.051)',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    navigate("/profile-charity")
                }}
            >
                <div
                    style={{height: 150, position: "relative", marginBottom: 40, background: data?.charityBanner ? "#fff" : "rgb(240, 240, 240)" }}
                >
                    {data?.charityBanner ? (
                        <img src={data?.charityBanner} alt="banner charity" 
                            style={{ height: '100%', width: '100%', objectFit: 'cover', verticalAlign: 'middle' }}
                        />
                    ) : ''}
                    <span style={{position: 'absolute', zIndex: 1, background: '#ffffff', borderRadius:"50%", height: 50, width: 50, left: 30, bottom: '-25px', border: '1px solid var(--color-border)'}}

                    >
                        <img src={data?.charityImage || "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9JF1oy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfCL5aPIZO0VHpt0yPVvVv9k1b-71ZSxgskEDgpJsYX8ow&oe=648AEE38"} alt="logo" 
                            style={{height:50, width: 50, borderRadius: '50px', objectFit: 'cover'}}
                        />
                    </span>
                </div>
                <div
                    style={{
                        padding: '0 20px 30px'
                    }}
                >
                    <div
                        style={{fontSize: 16, fontWeight: '700',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {data?.charityName}
                    </div>
                    <div
                        style={{marginTop: 15, lineHeight: '21px',
                            WebkitLineClamp: 6,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            minHeight: 126
                        }}
                    >
                        {data?.charityDescription}
                    </div>
                    <Row
                        style={{marginTop: 10}}
                    >
                        <span
                            className="link-app"
                            style={{
                                color:'var(--color-blue)',
                                fontSize: 16
                            }}
                        >
                            Xem thêm
                        </span>
                    </Row>
                </div>
            </div>
            <button
                className={data?.isFollow ? "btn-primary charity-un-follow" : "btn-primary charity-follow"}
                onClick={() => {
                    if(userType == 'normal_user') { // follow or un follow
                        if(data.isFollow) { // un follow
                            setFollowCharity(infoUser.id, data.charityId, false).then(res => {
                                if(res && res.data && res.data.data == 1) {
                                    let arr = listCharities?.map(charity => {
                                        if(charity?.charityId == data.charityId) {
                                            charity.isFollow = 0
                                        }
                                        return charity
                                    })

                                    setListCharities && setListCharities(JSON.parse(JSON.stringify(arr)))
                                }
                            })
                        } else { // follow
                            setFollowCharity(infoUser.id, data.charityId, true).then(res => {
                                if(res && res.data && res.data.data == 1) {
                                    let arr = listCharities?.map(charity => {
                                        if(charity?.charityId == data.charityId) {
                                            charity.isFollow = 1
                                        }
                                        return charity
                                    })

                                    setListCharities && setListCharities(JSON.parse(JSON.stringify(arr)))
                                }
                            })
                        }
                    } else { // login
                        navigate("/login")
                    }
                }}
                
            >
                {
                    data?.isFollow ? "Hủy theo dõi" : "Theo dõi"
                }
            </button>
        </div>
    )
}

export default memo(ItemCharity)