import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, NotFound } from '../pages'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}