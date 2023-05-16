import { FooterClient, HeaderClient } from "../../../components";
import CharityList from "./components/CharityList";
import CharityBanner from "./components/CharityBanner";

import './css/index.css'
import { useEffect, useState } from "react";
import { getAllCharities } from "../../../api/charities";

export default function CharityAll() {
    const [listCharities, setListCharities] = useState([])

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

            setListCharities(arr)
        }) 
    }, [])

    return (
        <div className="charity-all-app">
            <HeaderClient page="charity-all" />
            <CharityBanner />
            <CharityList listCharities={listCharities} setListCharities={setListCharities} />
            <FooterClient />
        </div>
    )
}

