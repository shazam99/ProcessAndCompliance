import './cp.css';
import { Button, Divider, Input, List, Typography } from "antd";
import React, { useState } from "react";
// import Title from "antd/es/skeleton/Title";
const { Title } = Typography;

const Compliance = () => {
    const [aiId, setAiId] = useState("");
    const [unusedCategories, setUnusedCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Full list of categories
    const allCategories = [
        "Electricity", "Water", "Mobile Recharge", "Broadband", "DTH",
        "Gas", "Postpaid Mobile", "Landline", "Cable TV", "Insurance",
        "Loan Repayment", "Credit Card Payment"
    ];

    // Records
    const records = [
        { aiId: "A101", billPaymentCategory: "Electricity" },
        { aiId: "A101", billPaymentCategory: "Water" },
        { aiId: "A101", billPaymentCategory: "Mobile Recharge" },
        { aiId: "A101", billPaymentCategory: "Broadband" },
        { aiId: "A101", billPaymentCategory: "DTH" },
        { aiId: "A101", billPaymentCategory: "Gas" },
        { aiId: "A101", billPaymentCategory: "Postpaid Mobile" },
        { aiId: "A101", billPaymentCategory: "Landline" },
        { aiId: "A101", billPaymentCategory: "Cable TV" },
        { aiId: "A101", billPaymentCategory: "Insurance" },
        { aiId: "A101", billPaymentCategory: "Loan Repayment" },
        { aiId: "A101", billPaymentCategory: "Credit Card Payment" },
        { aiId: "A102", billPaymentCategory: "Electricity" },
        { aiId: "A102", billPaymentCategory: "Gas" },
        { aiId: "A102", billPaymentCategory: "Mobile Recharge" },
        { aiId: "A102", billPaymentCategory: "DTH" },
        { aiId: "A103", billPaymentCategory: "Water" },
        { aiId: "A103", billPaymentCategory: "Broadband" },
        { aiId: "A103", billPaymentCategory: "Insurance" },
        { aiId: "A103", billPaymentCategory: "Cable TV" }
    ];

    // Function to find unused categories for a given aiId
    const getUnusedCategories = (aiId, data, categoryList) => {
        const usedCategories = data
            .filter(item => item.aiId === aiId)
            .map(item => item.billPaymentCategory);

        return categoryList.filter(cat => !usedCategories.includes(cat));
    };

    const handleReport = () => {
        if (!aiId.trim()) {
            setUnusedCategories([]);
            setErrorMessage("Please enter a valid AI ID.");
            return;
        }

        const aiIdExists = records.some(record => record.aiId === aiId);

        if (!aiIdExists) {
            setUnusedCategories([]);
            setErrorMessage(`No data found for AI ID: ${aiId}`);
            return;
        }

        const unused = getUnusedCategories(aiId, records, allCategories);
        setUnusedCategories(unused);
        setErrorMessage(""); // Clear any previous error
    };

    return (
        <div className="cp-main">
            <Title level={2}  className="dashboard-title">Compliance Tool</Title>
            <Divider style={{ border:"none"}} />
            <Input
                name="aiId"
                placeholder="Enter AI ID"
                value={aiId}
                onChange={(e) => setAiId(e.target.value)}
                style={{ width: 200, marginRight: 10 }}
            />
            <Button type="primary" onClick={handleReport}>
                Generate Report
            </Button>

            <Divider />

            {errorMessage ? (
                <Typography.Text type="danger">{errorMessage}</Typography.Text>
            ) : unusedCategories.length > 0 ? (
                <div>
                    <Typography.Title level={4}>Unused Categories:</Typography.Title>
                    <List
                        bordered
                        dataSource={unusedCategories}
                        renderItem={item => <List.Item>{item}</List.Item>}
                        style={{ maxWidth: 400 }}
                    />
                </div>
            ) : (
                unusedCategories && <Typography.Text type="secondary">No unused categories found.</Typography.Text>
            )}
        </div>
    );
};


export default Compliance;
