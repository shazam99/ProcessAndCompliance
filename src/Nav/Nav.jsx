import React, {useContext, useEffect, useState} from 'react';
import './Nav.css';
import {MenuOutlined, MailOutlined, PhoneOutlined, UserOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {NavLink, useLocation} from "react-router-dom";
import {GiCircleClaws} from "react-icons/gi";
import {Button, Col, Divider, Drawer, Row, Steps} from "antd";
import {Typography} from 'antd';
import {FormContext} from "../context/FormContext";


const DescriptionItem = ({title, content, color}) => (

    <div className="site-description-item-profile-wrapper">
        <Typography.Text className="site-description-item-profile-p-label" style={{color}}>
            {title}
        </Typography.Text>
        &nbsp; &nbsp;{content}
    </div>
);

function Nav() {
    const {formData} = useContext(FormContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiData, setApiData] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [queryData, setQueryData] = useState('');
    const handleInputChange = (e) => {
        setQueryData(e.target.value);
    };

    const [fetchQuery, setFetchQuery] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleAiBotQuery = (e) => {
        e.preventDefault();
        setFetchQuery(true);
    };

    useEffect(() => {
        if (fetchQuery) {
            setApiData(null);
            setLoading(true);
            fetch(`http://127.0.0.1:8000/query?q=${queryData}` )
                .then(response => response.json())
                .then(data => setApiData(data))
                .catch(error => console.error('Error fetching data:', error))
                .finally(() => {
                    setFetchQuery(false);
                    setLoading(false);
                    console.log(apiData);
                });
        }
    }, [fetchQuery, queryData]);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getTracker = () => {
        let count = 0;

        if (Object.keys(formData.form1).length !== 0 && Object.keys(formData.barf).length !== 0 && Object.keys(formData.sponsorBankForm).length !== 0) {
            count++;
            // if (Object.keys(formData.form1["uploadedForm"]) !== null && Object.keys(formData.barf["uploadedForm"]) !== null && Object.keys(formData.sponsorBankForm["uploadedForm"]) !== null) {
            //     count++;
            // }
        }
        return count;
    }

    const location = useLocation();

    const hideButton = location.pathname.includes("dashboard");


    return (
        <>
            <nav>
                <NavLink to="/dashboard"><img src={"icon_logo.svg"} height="40px" alt={""}/></NavLink>
                <div className={"buttonsDiv"}>
                    <Button color="default" variant="outlined" onClick={handleOpenModal}>
                        BBPS AI <GiCircleClaws className="rotate"/>
                    </Button>
                    {hideButton && <Button color="default" variant="filled" onClick={showDrawer}>
                        <MenuOutlined/>
                    </Button>}
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <div className="chat-container">
                                <h2>Ask your Query</h2>
                                <div className="chat-box">
                                    {loading && <p>Thinking...</p>}
                                    {apiData &&
                                        <>
                                            <p><strong>Answer: </strong>{apiData.answer}</p>
                                            <p><strong>Document: </strong>{apiData.document}</p>
                                            <p><strong>Source: </strong>{apiData.source_paragraph}</p>
                                        </>
                                    }
                                </div>
                                <form className="chat-form">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        required
                                        value={queryData}
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit" onClick={handleAiBotQuery}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
            <Drawer width={400} placement="right" onClose={onClose} open={open}>
                <p className="site-description-item-profile-p" style={{marginBottom: 24}}>
                    <strong>Help <QuestionCircleOutlined /></strong>
                </p>
                <p className="site-description-item-profile-p">Business contact</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<UserOutlined/>} content="Siddharth Sharma" color="#1777FF"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<MailOutlined/>} content="siddharth@nbbl.com" color="#1777FF"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<PhoneOutlined/>} content="8800088000" color="#1777FF"/>
                    </Col>
                </Row>

                <Divider/>
                <p className="site-description-item-profile-p">Compliance contact</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<UserOutlined/>} content="Vinod Patidar" color="#1777FF"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<MailOutlined/>} content="vinod@nbbl.com" color="#1777FF"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title={<PhoneOutlined/>} content="9988776655" color="#1777FF"/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p"><b>Application Progress</b></p>
                <Steps
                    direction="vertical"
                    current={getTracker()}
                    items={[
                        {
                            title: 'Forms filled',
                            description: `${getTracker() > 0 ? new Date().toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            }) : 'forms not filled yet'}`,
                        },
                        {
                            title: 'Signed Forms Uploaded',
                            description: `${getTracker() > 1 ? new Date().toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            }) : 'forms not uploaded yet'}`,
                        },
                        {
                            title: 'Approval from BBPS',
                            description: "pending...",
                        },
                    ]}
                />
            </Drawer>
        </>

    );
}

export default Nav;