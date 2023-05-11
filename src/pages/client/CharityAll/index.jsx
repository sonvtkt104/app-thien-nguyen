import { FooterClient, HeaderClient } from "../../../components";
import CharityList from "./components/CharityList";
import CharityBanner from "./components/CharityBanner";

import './css/index.css'

export default function CharityAll() {
    return (
        <div className="charity-all-app">
            <HeaderClient page="charity-all" />
            <CharityBanner />
            <CharityList />
            <FooterClient />
        </div>
    )
}

