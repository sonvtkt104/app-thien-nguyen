import React from 'react'
import HomeCampaign from './components/HomeCampaign'
import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'
import HomeSlider from './components/HomeSlider'
import "./css/index.css"


export default function Home () {

    return (
        <div className='home-app'>
            <HomeHeader />
            <HomeSlider />
            <HomeCampaign />
            <HomeFooter />
        </div>
    )
}