import { HeaderClient } from "../../../components";
import CampaignList from "./components/CampaignList";
import CampaignSearch from "./components/CampaignSearch";
import './css/index.css'

export default function CampaignAll() {
    return (
        <div>
            <HeaderClient />
            <CampaignSearch />
            <CampaignList />
        </div>
    )
}

