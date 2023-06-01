import { useEffect, useState } from "react";
import { FooterClient, HeaderClient } from "../../../components";
import CampaignList from "./components/CampaignList";
import CampaignSearch from "./components/CampaignSearch";
import './css/index.css'
import { getAllCampaignsClient, getAllProvinces, setUserFollowCampaign } from "../../../api/campaigns";

export default function CampaignAll() {

    const [listCampaign, setListCampaign] = useState([])
    const [listCampaignOrigin, setListCampaignOrigin] = useState([])
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

    const [searchKey, setSearchKey] = useState("")
    const [nameKey, setNameKey] = useState("")
    const [targetObjectKey, setTargetObjectKey] = useState("")
    const [regionKey, setRegionKey] = useState("")
    const [statusKey, setStatusKey] = useState("")
    const [campaignTargetAmountFromKey, setCampaignTargetAmountFromKey] = useState(0)
    const [campaignTargetAmountToKey, setCampaignTargetAmountToKey] = useState(0)

    const [listProvinces, setListProvinces] = useState({})

    console.log("listProvinces" ,listProvinces)

    
    console.log('status', {
        listCampaign,
        search,
        name,
        targetObject,
        region,
        status,
        campaignTargetAmountFrom,
        campaignTargetAmountTo,
    })

    useEffect(() => {
        getAllCampaignsClient().then(res=> {
            let arr = [];
            res?.data?.forEach(item => {
                console.log(item)
                let obj = {
                    campaignId: item.id,
                    campaignName: item.campaignName,
                    campaignImage: item?.images?.split(',')[0],  // ???
                    campaignTargetAmount: Number(item.targetAmount),
                    campaignReceiveAmount: Number(item.receiveAmount),
                    campaignRegion: item.region,
                    campaignStatus: item.status,
                    campaignStartDate: item.startDate,
                    campaignStopDate: item.stopDate,
                    campaignTargeObject: item.targetObject,
                    charityId: item?.organization.id,
                    charityName: item?.organization.charityName,
                    charityAvatar: item?.organization.avatar,
                    charityIsVerified: item?.organization.isVerified
                }
                arr.push(obj)
            })
            console.log(arr)
            setListCampaign(arr)
            setListCampaignOrigin(arr)
        })

        getAllProvinces().then(res => {
            console.log('getAllProvinces', res.data)
            let obj = {}
            res?.data?.forEach(item => {
                obj[item?.codeName] =  item?.name
            })
            setListProvinces(JSON.parse(JSON.stringify(obj)))
        })
    }, [])

    useEffect(() => {
        handleSearch()
    }, [searchKey])

    useEffect(() => {
        handleFilter()
    }, [nameKey, targetObjectKey, regionKey, statusKey, campaignTargetAmountFromKey, campaignTargetAmountToKey])


    const handleSearch = (s='') => {
        let search1 = s || search
        let result = listCampaignOrigin?.filter((campaign) => {
            return campaign?.campaignName?.toLowerCase().includes(search1?.toLowerCase())
        })

        setListCampaign(JSON.parse(JSON.stringify(result)))
        setName("")
        setTargetObject("")
        setRegion("")
        setStatus("")
        setCampaignTargetAmountFrom(0)
        setCampaignTargetAmountTo(0)

        setSearchKey(search1)
        setNameKey("")
        setTargetObjectKey("")
        setRegionKey("")
        setStatusKey("")
        setCampaignTargetAmountFromKey(0)
        setCampaignTargetAmountToKey(0)
    }

    const handleFilter = () => {
        let arr = listCampaignOrigin

        if(name) {
            setNameKey(name)
            arr = arr.filter(campaign => {
                return campaign?.campaignName?.toLowerCase().includes(name?.toLowerCase())
            })
        } else {
            setNameKey("")
        }

        if(region) {
            setRegionKey(region)
            arr = arr.filter(campaign => {
                return campaign?.campaignRegion?.toLowerCase().includes(region?.toLowerCase())
            })
        } else {
            setRegionKey("")
        }

        if(status) {
            setStatusKey(status)
            console.log('status', status)
            arr = arr.filter(campaign => {
                return campaign?.campaignStatus?.toLowerCase().includes(status?.toLowerCase())
            })
        } else {
            setStatusKey("")
        }

        if(targetObject) {
            setTargetObjectKey(targetObject)
            arr = arr.filter(campaign => {
                return campaign?.campaignTargeObject?.toLowerCase().includes(targetObject?.toLowerCase())
            })
        } else {
            setTargetObjectKey("")
        }

        if(campaignTargetAmountTo && campaignTargetAmountTo > 0) {
            let campaignTargetAmountFrom1 = campaignTargetAmountFrom || 0
            setCampaignTargetAmountToKey(campaignTargetAmountTo)
            setCampaignTargetAmountFromKey(campaignTargetAmountFrom1)
            arr = arr.filter(campaign => {
                return campaign?.campaignTargetAmount && campaign?.campaignTargetAmount >= campaignTargetAmountFrom1 && campaign?.campaignTargetAmount <= campaignTargetAmountTo
            })
        } else {
            setCampaignTargetAmountToKey(0)
            setCampaignTargetAmountFromKey(0)
        }

        setListCampaign(JSON.parse(JSON.stringify(arr)))
        setSearch("")

        setSearchKey("")
    }

    const reSetListCampaign = () => {
        setListCampaign(JSON.parse(JSON.stringify(listCampaignOrigin)))

        setSearchKey("")
        setNameKey("")
        setTargetObjectKey("")
        setRegionKey("")
        setStatusKey("")
        setCampaignTargetAmountFromKey(0)
        setCampaignTargetAmountToKey(0)
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
                handleSearch={handleSearch}
                reSetListCampaign={reSetListCampaign}
                handleFilter={handleFilter}

                listProvinces={listProvinces}
            />
            <CampaignList 
                listCampaign={listCampaign} 
                searchKey={searchKey}
                nameKey={nameKey}
                targetObjectKey={targetObjectKey}
                regionKey={regionKey}
                statusKey={statusKey}
                campaignTargetAmountFromKey={campaignTargetAmountFromKey}
                campaignTargetAmountToKey={campaignTargetAmountToKey}

                setSearchKey={setSearchKey}
                setNameKey={setNameKey}
                setTargetObjectKey={setTargetObjectKey}
                setRegionKey={setRegionKey}
                setStatusKey={setStatusKey}
                setCampaignTargetAmountFromKey={setCampaignTargetAmountFromKey}
                setCampaignTargetAmountToKey={setCampaignTargetAmountToKey}

                setSearch={setSearch}
                setName={setName}
                setTargetObject={setTargetObject}
                setRegion={setRegion}
                setStatus={setStatus}
                setCampaignTargetAmountFrom={setCampaignTargetAmountFrom}
                setCampaignTargetAmountTo={setCampaignTargetAmountTo}

                listProvinces={listProvinces}
            />
            <FooterClient />
        </div>
    )
}

