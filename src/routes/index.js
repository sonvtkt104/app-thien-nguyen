import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, NotFound, Donation, MyDonation } from '../pages'
import CamPaignPreview from '../pages/CampaignList/CampaignPreview';
import CamPaignList from '../pages/CampaignList/CampaignList';



export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<NotFound />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/mydonation" element={<MyDonation />} />
                <Route path="/campaign-list" element={<CamPaignList />} />
                <Route path="/campaign-list/preview" element={<CamPaignPreview />} />
            </Routes>
        </BrowserRouter>
    )
}