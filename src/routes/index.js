import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  Donation,
  MyDonation,
  ManageUser,
  ManageCVD,
} from "../pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<NotFound />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/mydonation" element={<MyDonation />} />
        <Route path="/admin" element={<ManageUser />} />
        <Route path="/admin/cuocvandong" element={<ManageCVD />} />
      </Routes>
    </BrowserRouter>
  );
}
