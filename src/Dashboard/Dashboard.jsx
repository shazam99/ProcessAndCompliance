import React, {useContext, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import {Card, Button, Typography, Divider, UploadProps, Upload, message} from 'antd';
import { FormOutlined, CloudDownloadOutlined, CaretRightOutlined, UploadOutlined } from '@ant-design/icons';
import './Dashboard.css';
import {FormContext} from "../context/FormContext";
import handleParticipationForm from "./HtmlForm/handleParticipationForm";
import handleBarfForm from "./HtmlForm/handleBarfForm";
import handleSponsorBankForm from "./HtmlForm/handleSponsorBankForm";

const { Title } = Typography;

const Dashboard = () => {
    const { formData } = useContext(FormContext);
    const { showMarketing, setScreenName, setJourneyName } = useContext(FormContext);


    useEffect(() => {
        console.log(showMarketing);
    }, [showMarketing]);

    const journeyUpload=(file) => {
        console.log("File name:", file.name);
        setJourneyName(file.name);
        return false; // Prevent default upload behavior
    }

    const journey = {
        name: 'file',
        customRequest: ({ file, onSuccess }) => {
            journeyUpload(file);
            onSuccess({}, file);
        },
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const screensUpload = (file) => {
        console.log("File name:", file.name);
        setScreenName(file.name);
        return false; // Prevent default upload behavior
    }

    const handleParticipationformDownload = () =>{
        console.log(formData);
        handleParticipationForm({ formData });
    }

    const handleBarfFormDownload = () =>{
        console.log(formData);
        handleBarfForm({ formData });
    }

    const handleSponsorBankFormDownload =()=> {
        console.log(formData);
        handleSponsorBankForm({ formData });
    }
    const screen = {
        name: 'file',
        customRequest: ({ file, onSuccess }) => {
            screensUpload(file);
            onSuccess({}, file);
        },
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


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
                        <Button color="primary" variant="text" disabled={Object.keys(formData.form1).length === 0} onClick={handleParticipationformDownload}>
                            Download Form<CloudDownloadOutlined/>
                        </Button>
                        <Upload>
                            <Button color="primary" icon={<UploadOutlined />} variant="text" disabled={Object.keys(formData.form1).length === 0}>
                                Upload Signed Form<CaretRightOutlined />
                            </Button>
                        </Upload>
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
                        <Button color="primary" variant="text" disabled={Object.keys(formData.barf).length === 0} onClick={handleBarfFormDownload}>
                            Download Form<CloudDownloadOutlined/>
                        </Button>
                        <Upload>
                            <Button color="primary" icon={<UploadOutlined />} variant="text" disabled={Object.keys(formData.barf).length === 0}>
                                Upload Signed Form<CaretRightOutlined />
                            </Button>
                        </Upload>
                    </div>
                </Card>

                <Card className="form-card">
                    <FormOutlined className="form-icon"/>
                    <Title level={5}>Sponsor Bank Form</Title>
                    <p>Share your work experience</p>
                    <NavLink to="/dashboard/form3">
                        <Button color="primary"  variant="filled" disabled={Object.keys(formData.sponsorBankForm).length !== 0}>
                            Fill the form
                        </Button>
                    </NavLink>
                    <Divider />
                    <div>
                        <Button color="primary" variant="text" disabled={Object.keys(formData.sponsorBankForm).length === 0} onClick={handleSponsorBankFormDownload}>
                            Download Form<CloudDownloadOutlined />
                        </Button>
                        <Upload>
                            <Button color="primary" icon={<UploadOutlined />} variant="text" disabled={Object.keys(formData.sponsorBankForm).length === 0}>
                                Upload Signed Form<CaretRightOutlined />
                            </Button>
                        </Upload>
                    </div>

                </Card>
            </div>

            <Divider/>
            {showMarketing &&
                <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                    <Upload {...screen}>
                        <Button icon={<UploadOutlined />}>Upload Screens</Button>
                    </Upload>
                </div>
            }
        </div>
    );
};

export default Dashboard;