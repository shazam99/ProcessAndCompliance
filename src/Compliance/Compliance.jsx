import './cp.css';
import {Button, Table, Typography, Divider, Spin} from "antd";
import React, { useState } from "react";


const { Title } = Typography;

const ToolTable = () => {
    // State to track if the report is visible
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);

    // Data for the tools
    const tools = [
        { id: 1, name: "Live Category Tool", description: "Generate compliance reports" },
        { id: 2, name: "User Screens", description: "Screens for User Journey" },
        { id: 3, name: "User Management", description: "Manage user accounts" },
        { id: 4, name: "Report Generator", description: "Create custom reports" },
        { id: 5, name: "Settings", description: "Configure system settings" }
    ];

    // AI and Categories data for the report
    const aiCategoriesData = [
        {
            key: '1',
            aiId: 'A101',
            liveCategories: 'Electricity, Water, Mobile Recharge, Broadband, DTH, Gas, Postpaid Mobile, Landline'
        },
        {
            key: '2',
            aiId: 'A102',
            liveCategories: 'Electricity, Gas, Mobile Recharge, DTH'
        },
        {
            key: '3',
            aiId: 'A103',
            liveCategories: 'Water, Broadband, Insurance, Cable TV'
        },
    ];

    // Define table columns for tools
    const toolColumns = [
        {
            title: 'Tool Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Button
                    type="primary"
                    onClick={() => handleToolClick(record.id)}
                    disabled={index > 1} // Enable buttons only for first two rows
                >
                    {record.id === 2 ? "Open Screens" :  "Generate Report"}
                </Button>
            ),
        },
    ];

    // Define columns for the AI categories report
    const reportColumns = [
        {
            title: 'AI ID',
            dataIndex: 'aiId',
            key: 'aiId',
        },
        {
            title: 'Live Categories',
            dataIndex: 'liveCategories',
            key: 'liveCategories',
        },
    ];

    // Handle tool button click
    const handleToolClick = (toolId) => {
        if (toolId === 1) {
            // Generate Report for Tool 1
            setLoading(true);
            console.log(`Tool ${toolId} launched`);
            setTimeout(() => {
                setShowReport(true);
                setLoading(false);
            }, 2000);
        } else if (toolId === 2) {
            // Open a PDF for Tool 2
            console.log(`Opening PDF for Tool ${toolId}`);
            window.open("/BrandGuidelines.pdf", '_blank');
        }
    };


    return (
        <div className="cp-main">
            <Title level={2} className="dashboard-title">Tools Dashboard</Title>
            <Table
                dataSource={tools}
                columns={toolColumns}
                rowKey="id"
                pagination={false}
            />
            {loading && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Spin tip="Generating Report..." />
                </div>
            )}
            {!loading && showReport && (
                <>
                    <Divider />
                    <Title level={3}>AI Categories Report</Title>
                    <Table
                        dataSource={aiCategoriesData}
                        columns={reportColumns}
                        rowKey="key"
                        pagination={false}
                    />
                </>
            )}
        </div>
    );
};

export default ToolTable;