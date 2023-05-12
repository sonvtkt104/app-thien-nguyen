import { useEffect, useState } from "react";
import { FooterClient, HeaderClient } from "../../../components";
import CampaignList from "./components/CampaignList";
import CampaignSearch from "./components/CampaignSearch";
import './css/index.css'
import { getAllCampaignsClient } from "../../../api/campaigns";

export default function CampaignAll() {

    const [listCampaign, setListCampaign] = useState([])
    /**
     * [
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
     *      charityIsVerified
     * ]
     */
    const [search, setSearch] = useState("")
    const [name, setName] = useState("")
    const [targetObject, setTargetObject] = useState("")
    const [region, setRegion] = useState("")
    const [status, setStatus] = useState("")
    const [campaignTargetAmountFrom, setCampaignTargetAmountFrom] = useState()
    const [campaignTargetAmountTo, setCampaignTargetAmountTo] = useState()
    

    useEffect(() => {
        getAllCampaignsClient().then(res=> {
            let arr = [];
            res.data.forEach(item => {
                console.log(item)
                let obj = {
                    campaignId: item.id,
                    campaignName: item.campaignName,
                    campaignImage: item.campaignImage,
                    campaignTargetAmount: item.targetAmount,
                    campaignReceiveAmount: item.receiveAmount,
                    campaignRegion: item.region,
                    campaignStatus: item.status,
                    campaignStartDate: item.startDate,
                    campaignStopDate: item.stopDate,
                    campaignTargeObject: item.targetObject,
                    charityId: item?.organization.id,
                    charityName: item?.organization.charityName,
                    charityAvatar: item?.organization.avatar,
                    charityIsVerified: item?.organization.isVerificated
                }
                arr.push(obj)
            })
            console.log(arr)
            setListCampaign(arr)
        })
    }, [])

    const handleSearch = () => {
        let result = listCampaign?.filter((campaignSearch) => {
            // campaignSearch.
        })
    }

    return (
        <div>
            <HeaderClient page="campaign-all" />
            <CampaignSearch 
                search={search}
                setSearch={setSearch}
                name={name}
                setName={setName}
                targetObject={targetObject}
                setTargetObject={setTargetObject}
                region={region}
                setRegion={setRegion}
                status={status}
                setStatus={setStatus}
                campaignTargetAmountFrom={campaignTargetAmountFrom}
                setCampaignTargetAmountFrom={setCampaignTargetAmountFrom}
                campaignTargetAmountTo={campaignTargetAmountTo}
                setCampaignTargetAmountTo={setCampaignTargetAmountTo}
            />
            <CampaignList listCampaign={listCampaign} />
            <FooterClient />
        </div>
    )
}

