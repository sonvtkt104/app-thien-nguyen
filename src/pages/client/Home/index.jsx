import React from 'react'
import HomeCampaign from './components/HomeCampaign'
import HomeFooter from './components/HomeFooter'
import HomeFQA from './components/HomeFQA'
import HomeHeader from './components/HomeHeader'
import HomeNews from './components/HomeNews'
import HomeNumber from './components/HomeNumber'
import HomeProcess from './components/HomeProcess'
import HomeReady from './components/HomeReady'
import HomeService from './components/HomeService'
import HomeSlider from './components/HomeSlider'
import HomeTarget from './components/HomeTarget'
import HomeTestimonial from './components/HomeTestimonial'
import "./css/index.css"
import { getTokenFromCookies } from '../../Authentication/HandleUserInfomation'


export default function Home () {

    return (
        <div className='home-app'>
            <HomeHeader />
            <HomeSlider />
            <HomeCampaign />
            <HomeTarget />
            <HomeNumber />
            <HomeService />
            <HomeProcess />
            <HomeTestimonial />
            <HomeFQA />
            <HomeNews />
            <HomeReady />
            <HomeFooter />
        </div>
    )
}