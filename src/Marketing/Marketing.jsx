import {Card, Divider, Space, Table, Typography} from "antd";
import React, {useState} from "react";

import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Spin } from 'antd';

const { Title, Text } = Typography;

const Marketing = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    // Handle file uploads
    const handleFile1Change = (info) => {
        // Since we prevent auto upload, we need to manually handle the file
        const file = info.file.originFileObj || info.file;
        setFile1(file);
        message.success(`${file.name} selected successfully`);
    };

    const handleFile2Change = (info) => {
        // Since we prevent auto upload, we need to manually handle the file
        const file = info.file.originFileObj || info.file;
        setFile2(file);
        message.success(`${file.name} selected successfully`);
    };

    // PDF file upload props
    const pdfUploadProps = {
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                message.error('You can only upload PDF files!');
                return Upload.LIST_IGNORE;
            }
            return false; // Prevent auto upload
        },
        maxCount: 1,
        showUploadList: true,
    };

    // Image file upload props
    const imageUploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
            if (!isImage) {
                message.error('You can only upload PNG or JPEG image files!');
                return Upload.LIST_IGNORE;
            }
            return false; // Prevent auto upload
        },
        maxCount: 1,
        showUploadList: true,
    };

    // Send files to backend
    const handleCompare = async () => {
        if (!file1 || !file2) {
            message.error('Please upload both PDF and logo files');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const formData = new FormData();
            formData.append('pdf', file1);
            formData.append('logo', file2);

            const response = await fetch('http://127.0.0.1:8000/check-logo/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            // data.result.filter((item) => !item.logo_found);
            console.log(data);
            setResults(data.result.filter((item) => !item.logo_found));
            // setResults(resultssss.filter((item) => !item.logo_found));
            console.log(results);
        } catch (err) {
            setError(err.message);
            message.error('Failed to check logo in PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

        const resultssss= [
        {
            "page": 1,
            "logo_found": false,
            "match_score": 147
        },
        {
            "page": 2,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 3,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 4,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 5,
            "logo_found": true,
            "match_score": 148
        },
        {
            "page": 6,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 7,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 8,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 9,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 10,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 11,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 12,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 13,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 14,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 15,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 16,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 17,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 18,
            "logo_found": true,
            "match_score": 147
        },
        {
            "page": 19,
            "logo_found": true,
            "match_score": 147
        }
    ];

    return (
        <div className="cp-main">
            <Title level={2} className="dashboard-title">Logo Check Utility</Title>

            <Card title="PDF and Logo Comparison Tool" style={{ maxWidth: 800, margin: '0 auto' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <Text strong>Upload PDF file</Text>
                            <Upload
                                {...pdfUploadProps}
                                onChange={handleFile1Change}
                                style={{ width: '100%', marginTop: 8 }}
                            >
                                <Button icon={<UploadOutlined />}>Select PDF File</Button>
                            </Upload>
                        </div>

                        <div style={{ flex: 1 }}>
                            <Text strong>Upload logo (PNG/JPEG)</Text>
                            <Upload
                                {...imageUploadProps}
                                onChange={handleFile2Change}
                                style={{width: '100%', marginTop: 8}}
                            >
                                <Button icon={<UploadOutlined/>}>Select Logo Image</Button>
                            </Upload>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        onClick={handleCompare}
                        disabled={!file1 || !file2 || loading}
                        loading={loading}
                        style={{ marginTop: 16 }}
                    >
                        Generate Report
                    </Button>

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <Spin tip="Checking logo in PDF..." />
                        </div>
                    )}

                    {error && (
                        <div style={{ marginTop: 16 }}>
                            <Text type="danger">{error}</Text>
                        </div>
                    )}

                    {results && (
                        <>
                            <Divider />
                            <Title level={4}>Comparison Results</Title>
                            <Card>
                                <h2 className="text-xl font-bold text-red-600">Pages with False Results:</h2>
                                <ul className="list-disc list-inside mt-2">
                                    {results.length > 0 ? results.map((item) => (
                                        <li key={item.page} className="text-gray-700">
                                            <b>Page</b> {item.page} - <b>Status</b> False
                                        </li>
                                    )) : <h2 className="text-xl font-bold text-green-600">✅ Success: No pages with false
                                        results.</h2>}
                                </ul>
                                {/*<pre>{JSON.stringify(results, null, 2)}</pre>*/}
                            </Card>
                        </>
                    )}
                </Space>
            </Card>
        </div>
    )
}

export default Marketing;