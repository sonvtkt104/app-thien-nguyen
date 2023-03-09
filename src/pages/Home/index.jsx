import { Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home () {

    const app = useSelector((state) => state.app)
    console.log('app : ', app)

    return (
        <div>
            <div>Home</div>
            <Row>
                <span>Name: </span>
                <span>{app?.name}</span>
            </Row>
        </div>
    )
}