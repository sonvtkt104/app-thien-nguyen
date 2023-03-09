import { Button, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../../redux/appSlice'

export default function Home () {
    const [value, setValue] = useState("")

    const dispatch = useDispatch()
    const app = useSelector((state) => state.app)
    console.log('app : ', app)

    return (
        <div>
            <div>Home</div>
            <Row>
                <span>Name: </span>
                <span>{app?.name}</span>
            </Row>
            <Row>
                <Col>
                    <Input 
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                    />
                </Col>
                <Button
                    onClick={() => {
                        dispatch(setName({name: value}))
                    }}
                >
                    Change
                </Button>
            </Row>
        </div>
    )
}