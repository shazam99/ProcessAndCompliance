import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Button, Card, Typography, Select, message, Row, Col, Alert} from 'antd';
import {
    ArrowLeftOutlined, IdcardOutlined
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {FormContext} from "../../context/FormContext";
import './Forms.css';

const {Title} = Typography;

const BBPOUParticipationForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { formData,updateFormData } = useContext(FormContext);
    const [errorMessage,setErrorMessage] = useState(null);
    const [showAlert,setShowAlert] = useState(false);


    const onFinish = (values) => {
        console.log('Form values:', values);
        message.success('Personal information submitted successfully!');
        if(values['PAN no'] !== "KEBPS3701A"){
            setErrorMessage("Invalid PAN number: " + values['PAN no']);
            setShowAlert(true);
        }
        else if(values['GSTIN'] !== "22KEBPS3701A1Z5"){
            setErrorMessage("Invalid GSTIN number: " + values['GSTIN']);
            setShowAlert(true);
        }
        else {
            setErrorMessage(null);
            setShowAlert(false);
            updateFormData('form1', values);
            console.log('Form values:', formData);
            handleBack();
        }
    };

    useEffect(() => {
        form.setFieldsValue(formData.form1);
    }, [form, formData.form1]);


    const handleBack = () => {
        navigate('/dashboard');
    };

    return (<Card className="form-container">
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '24px'}}>
            <Button
                type="text"
                icon={<ArrowLeftOutlined/>}
                onClick={handleBack}
                style={{marginRight: '16px'}}
            />
            <Title level={3} style={{margin: 0, textAlign: 'center', flex: 1}}>
                BBPOU Participation Form
            </Title>
        </div>

        {showAlert && <Alert className={"alert"}
            message="Error: "
            description={errorMessage}
            type="error"
            closable
            onClose={() => {setShowAlert(false); setErrorMessage(null)}}
        />
        }

        <Form
            form={form}
            name="personalInfoForm"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
            disabled={Object.keys(formData.form1).length !== 0}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="Name of BBPOU"
                        label="Name of BBPOU"
                        rules={[{required: true, message: 'Please enter full name'}]}
                    >
                        <Input placeholder="Enter full name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="BBPOU Address"
                        label="BBPOU Address"
                        rules={[{required: true, message: 'Please enter full Address'}]}
                    >
                        <Input prefix={<IdcardOutlined />} placeholder="BBPOU Address"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="Sponsor Bank"
                        label="Sponsor Bank"
                        rules={[{required: false}]}
                    >
                        <Input prefix={<IdcardOutlined />} placeholder="Sponsor Bank (if applicable) "/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Type of Entity" name="Type of Entity" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value="Bank">Bank</Select.Option>
                            <Select.Option value="Non-Bank">Non-Bank</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Type of BBPOU" name="Type of BBPOU" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value="Customer BBPOU">Customer BBPOU</Select.Option>
                            <Select.Option value="Biller BBPOU">Biller BBPOU</Select.Option>
                            <Select.Option value="Both">Both</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Address of Data center" name="Address of Data center" rules={[{required: true}]}>
                        <Input placeholder="Address of Data center"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Contact of Data center" name="Contact of Data center" rules={[{required: true}]}>
                        <Input placeholder="Contact of Data center"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Mobile Number" name="Mobile Number" rules={[{required: true}]}>
                        <Input placeholder="Mobile Number"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Email" name="Email" rules={[{required: true}]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="PAN no" name="PAN no" rules={[{required: true}]}>
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="GSTIN" name="GSTIN" rules={[{required: true}]}>
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit BBPOU Participation Form
                </Button>
            </Form.Item>
        </Form>
    </Card>);
};

export default BBPOUParticipationForm;