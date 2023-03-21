
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  Donation,
  MyDonation,
  ManageUser,
  ManageCVD,
  CamPaignList,
  GeneralInformation,
  HomePageCharity,
  DetailCampaign
} from "../pages";
import CamPaignPreview from "../pages/app/CampaignList/CampaignPreview";

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
        <Route path="/admin" element={<ManageUser />} />
        <Route path="/admin/cuocvandong" element={<ManageCVD />} />
        <Route path="/home-page-charity" element={<HomePageCharity />} />
        <Route path="/general-information" element={<GeneralInformation />} />
        <Route path="/detail-campaign/:campaignId" element={<DetailCampaign />} />
      </Routes>
    </BrowserRouter>
  );
}
