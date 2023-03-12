import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, NotFound } from '../pages'

import Donation from '../pages/admin/Donations/Donation';
import MyDonation from '../pages/admin/Donations/MyDonation';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Donation />} />
                <Route path="/mydonation" element={<MyDonation />} />
                <Route path="/test" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}