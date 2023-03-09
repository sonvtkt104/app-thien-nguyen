import { Card, Col, Collapse, Row, Typography } from "antd";
import React from "react";

const { Panel } = Collapse;
const { Text } = Typography;

const FAQs = () => {
    return (
        <>
            <Row
                gutter={[24, 24]}
                style={{
                    paddingTop: 20,
                    marginBottom: 30,
                }}
            >
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card
                        title={
                            <div
                                className="title-card-custom"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Text strong>Frequently asked questions</Text>
                            </div>
                        }
                        bordered={false}
                        style={{
                            width: "100%",
                            borderRadius: "20px",
                        }}
                        className="card-custom-faqs"
                    >
                        <Collapse
                            style={{
                                border: 0,
                            }}
                            expandIconPosition={"end"}
                            accordion
                        >
                            <Panel
                                header={
                                    <font
                                        style={{
                                            color: "#38383A",
                                            fontSize: 14,
                                        }}
                                    >
                                        Heading
                                    </font>
                                }
                            >
                                <div
                                    style={{
                                        paddingLeft: 14,
                                        fontSize: 14,
                                    }}
                                >
                                    Content
                                </div>
                            </Panel>
                            <Panel
                                header={
                                    <font
                                        style={{
                                            color: "#38383A",
                                            fontSize: 14,
                                        }}
                                    >
                                        Heading
                                    </font>
                                }
                            >
                                <div
                                    style={{
                                        paddingLeft: 14,
                                        fontSize: 14,
                                    }}
                                >
                                    Content
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default FAQs;
