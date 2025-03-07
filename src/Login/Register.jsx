import React from 'react';
import { Button, Form, Input } from 'antd';
import './Login.css';
import { Typography } from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
const { Title } = Typography;

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="form-container">

            <Form
                name="basic"
                style={{
                    maxWidth: 600,
                    width: '100%',
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Title>Register</Title>
                <Form.Item
                    label="Access Code"
                    name="accessCode"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={"Already have an account?"}>
                    <NavLink to="/login">Login</NavLink>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" onClick={handleBack}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;