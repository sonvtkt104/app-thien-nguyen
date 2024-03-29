import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  Donation,
  MyDonation,
  ManageUser,
  ManageVerify,
  FeedBack,
  CamPaignList,
  GeneralInformation,
  HomePageCharity,
  DetailCampaign,
  CampaignAll,
  ContactUs,
  ProfileCharity,
  Account,
  Confirmation,
  DonationPost,
  LoginPage,
  RegistrationPage,
  PassWord,
  CharityAll,
  CharitySearch,
  OrganizationFollow,
  CampaignSaved,
  Settings,
  ForgotYourPassword,
} from "../pages";
import CamPaignPreview from "../pages/app/CampaignList/CampaignPreview";
import { action as loginAction } from "../pages/Authentication/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<NotFound />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/mydonation" element={<MyDonation />} />
        <Route path="/campaign-list" element={<CamPaignList />} />
        <Route
          path="/campaign-list/preview/:campaignId"
          element={<CamPaignPreview />}
        />
        <Route path="/admin" element={<ManageUser />} />
        <Route path="/admin/verify" element={<ManageVerify />} />
        <Route path="/admin/feedback" element={<FeedBack />} />
        <Route path="/home-page-charity" element={<HomePageCharity />} />
        <Route path="/general-information" element={<GeneralInformation />} />
        <Route
          path="/detail-campaign/:campaignId"
          element={<DetailCampaign />}
        />
        <Route path="/home-page-charity" element={<HomePageCharity />} />
        <Route path="/general-information" element={<GeneralInformation />} />
        <Route path="/campaign-all" element={<CampaignAll />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/profile-charity/:charityId"
          element={<ProfileCharity />}
        />
        <Route path="/charity-all" element={<CharityAll />} />
        <Route path="/charity-search" element={<CharitySearch />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/my-account/password" element={<PassWord />} />
        <Route path="/my-account/donation-post" element={<DonationPost />} />
        <Route
          path="/my-account/request-confirmation"
          element={<Confirmation />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotYourPassword />} />
        <Route
          path="/my-account/organization-follow"
          element={<OrganizationFollow />}
        />
        <Route path="/my-account/campaign-saved" element={<CampaignSaved />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
