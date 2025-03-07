import React, {useContext, useEffect} from 'react';
import {Form, Input, Button, Card, Typography, Select, message, Row, Col, DatePicker} from 'antd';
import {
    ArrowLeftOutlined,
    PhoneOutlined,
    MailOutlined, IdcardOutlined
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {FormContext} from "../../context/FormContext";

const {Title} = Typography;

const BBPSAcessRequestFormBARF = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { formData,updateFormData } = useContext(FormContext);


    const onFinish = (values) => {
        console.log('Form values:', values);
        message.success('Personal information submitted successfully!');
        updateFormData('barf', values);
        console.log('Form values:', formData);
        handleBack();
    };

    useEffect(() => {
        form.setFieldsValue(formData.barf);
    }, [form, formData.barf]);


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
                BBPS- Acess Request Form (BARF)
            </Title>
        </div>

        <Form
            form={form}
            name="personalInfoForm"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
            disabled={Object.keys(formData.barf).length !== 0}
        >
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="Name of BBPOU"
                        label="Name of BBPOU"
                        rules={[{required: true, message: 'Please enter full name'}]}
                    >
                        <Input placeholder="Enter full name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="BBPOU ID"
                        label="BBPOU ID"
                        rules={[{required: true, message: 'Please enter full ID'}]}
                    >
                        <Input prefix={<IdcardOutlined />} placeholder="BBPOU ID"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24}>
                    <Form.Item label="DatePicker" name="DatePicker">
                        <DatePicker/>
                    </Form.Item>
                </Col>
            </Row>
            <strong>Admin User Details</strong>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="FirstName"
                        label="FirstName"
                        rules={[{required: true, message: "Please enter First Name"}]}
                    >
                        <Input placeholder="First Name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="LastName"
                        label="LastName"
                        rules={[{required: true, message: "Please enter Last Name"}]}
                    >
                        <Input placeholder="Last Name"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="Department"
                        label="Department"
                        rules={[{required: true, message: "Please enter Department"}]}
                    >
                        <Input placeholder="Department"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="Designation"
                        label="Designation"
                        rules={[{required: true, message: "Please enter Designation"}]}
                    >
                        <Input placeholder="Designation"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="MobileNumber"
                        label="Mobile Number"
                        rules={[{required: true, message: "Please enter MobileNumber"}]}
                    >
                        <Input prefix={<PhoneOutlined />} placeholder="MobileNumber"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="Email"
                        label="Email"
                        rules={[{required: true, message: "Please enter Email"}]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email"/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit BARF
                </Button>
            </Form.Item>
        </Form>
    </Card>);
};

export default BBPSAcessRequestFormBARF;