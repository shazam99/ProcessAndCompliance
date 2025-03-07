import React, {useContext, useEffect} from 'react';
import {Form, Input, Button, Card, Typography, Select, message, Row, Col} from 'antd';
import {UserOutlined, HomeOutlined, BankOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {FormContext} from "../../context/FormContext";

const {Title} = Typography;

const SponsorBankForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { formData,updateFormData } = useContext(FormContext);


    const onFinish = (values) => {
        console.log('Form values:', values);
        message.success('Personal information submitted successfully!');
        updateFormData('sponsorBankForm', values);
        console.log('Form values:', formData);
        handleBack();
    };

    useEffect(() => {
        form.setFieldsValue(formData.sponsorBankForm);
    }, [form, formData.sponsorBankForm]);

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.getDate() + '/' + date.toLocaleString('default', { month: 'short' }) + '/' + date.getFullYear();
        form.setFieldsValue({
            timestamp: formattedDate,
        });
    }, [form]);

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
                On Sponsor Bank's Letter Head
            </Title>
        </div>

        <Form
            form={form}
            name="personalInfoForm"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
            disabled={Object.keys(formData.sponsorBankForm).length !== 0}
        >
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="Name of Sponsor Bank"
                        label="Name of Sponsor Bank"
                        rules={[{required: true, message: 'Please enter full name'}]}
                    >
                        <Input prefix={<BankOutlined/>} placeholder="Enter full name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="NameOfBBPOU"
                        label="Name of BBPOU"
                        rules={[{required: true, message: 'Please enter full name'}]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Enter BBPOU name"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="Sponsor bank address"
                        label="Sponsor Bank address"
                        rules={[{required: true, message: "Please enter Bank's Address"}]}
                    >
                        <Input prefix={<HomeOutlined/>} placeholder="Enter Bank's Address"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="Net debit cap per settlement cycle for BBPOU"
                        label="Net Debit Cap per Settlement Cycle for BBPOU"
                        rules={[{required: true, message: "Please enter net debit cap"}]}
                    >
                        <Input placeholder="Enter Net debit cap per Settlement cycle"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item
                        name="Total net debit cap for BBPS"
                        label="Total Net Debit Cap for BBPS"
                        rules={[{required: true, message: "Please enter total net debot cap"}]}
                    >
                        <Input prefix={"₹"} placeholder="Enter Total Net debit"/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="timestamp" style={{display: 'none'}}>
                <Input type="hidden"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit Sponsor Bank Information
                </Button>
            </Form.Item>
        </Form>
    </Card>);
};

export default SponsorBankForm;