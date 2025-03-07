import React, {useContext} from 'react';
import { NavLink} from 'react-router-dom';
import {Card, Button, Typography, Divider} from 'antd';
import { FormOutlined, CloudDownloadOutlined, CaretRightOutlined } from '@ant-design/icons';
import './Dashboard.css';
import {FormContext} from "../context/FormContext";

const { Title } = Typography;

const Dashboard = () => {
    const { formData,updateFormData } = useContext(FormContext);

    return (
        <div className="dashboard-container">
            <Title level={2}  className="dashboard-title">OU Onboarding Tool</Title>

            <div className="forms-container" style={{margin:"40px !important"}}>
                <Card className="form-card">
                    <FormOutlined className="form-icon"/>
                    <Title level={5}>BBPOU Participation Form</Title>
                    <p>Enter your basic personal details</p>
                    <NavLink to="/dashboard/form1">
                        <Button color="primary" variant="filled" disabled={Object.keys(formData.form1).length !== 0}>
                            Fill the form
                        </Button>
                    </NavLink>
                    <Divider/>
                    <div>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.form1).length === 0}>
                            Download Form<CloudDownloadOutlined/>
                        </Button>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.form1).length === 0}>
                            Upload Signed Form<CaretRightOutlined />
                        </Button>
                    </div>

                </Card>

                <Card className="form-card">
                    <FormOutlined className="form-icon"/>
                    <Title level={5}>BBPS- Acess Request Form</Title>
                    <p>Provide your address details</p>
                    <NavLink to="/dashboard/form2">
                        <Button color="primary" variant="filled" disabled={Object.keys(formData.barf).length !== 0}>
                            Fill the form
                        </Button>
                    </NavLink>
                    <Divider/>
                    <div>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.barf).length === 0}>
                            Download Form<CloudDownloadOutlined/>
                        </Button>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.barf).length === 0}>
                            Upload Signed Form<CaretRightOutlined />
                        </Button>
                    </div>
                </Card>

                <Card className="form-card">
                    <FormOutlined className="form-icon"/>
                    <Title level={5}>Sponsor Bank Form</Title>
                    <p>Share your work experience</p>
                    <NavLink to="/dashboard/form3">
                        <Button color="primary" variant="filled" disabled={Object.keys(formData.sponsorBankForm).length !== 0}>
                            Fill the form
                        </Button>
                    </NavLink>
                    <Divider />
                    <div>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.sponsorBankForm).length === 0}>
                            Download Form<CloudDownloadOutlined />
                        </Button>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.sponsorBankForm).length === 0}>
                            Upload Signed Form<CaretRightOutlined />
                        </Button>
                    </div>

                </Card>
            </div>
        </div>
    );
};

export default Dashboard;