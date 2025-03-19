import React, {use, useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Card, Button, Typography, Divider, Drawer, List, Avatar, Empty} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    BellFilled
} from '@ant-design/icons';
import {FormContext} from "../context/FormContext";
import { Checkbox } from 'antd';

const {Text} = Typography;

const {Title} = Typography;

const Admin = () => {
    const {formData, updateFormData} = useContext(FormContext);
    const [open, setOpen] = useState(false);
    const [allCheckedValue,setAllCheckedValue] = useState(false);
    const { setShowMarketing } = useContext(FormContext);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const data = [
        {
            title: 'Application Id- ACEPK4',
            name: "HDFC Bank Co."
        },
        {
            title: 'Application Id- VWEE34',
            name: "ADANI Infra Co."
        },
    ];

    const plainOptions = ['All Forms Submitted', 'Forms Signed', 'form Data correct'];


    const [show, setShow] = useState(false);

    function handleItemClick() {
        setShow(!show);
    }
    // console.log(allCheckedValue);

    return (<>
            <div className="dashboard-container" style={{maxWidth: "1000px"}}>
                <Title level={2} className="dashboard-title">Admin Interface</Title>
                {show &&
                    <Checkbox.Group
                        style={{display: "flex", justifyContent: "center"}}
                        options={plainOptions}
                        defaultValue={['']}
                        onChange={(checkedValues) => {
                            const allChecked = plainOptions.every(option => checkedValues.includes(option));
                            if(allChecked){
                                setShowMarketing(true);
                            }else{
                                setShowMarketing(false);
                            }
                        }}
                    />}
                <Divider/>

                <Button color="primary" variant="text" onClick={showDrawer}>Notification <BellFilled/></Button>
                {!show && <Empty style={{marginTop: '100px'}}/>}
                {show && <Text type="secondary">Application Id- ACEPK4</Text>}<br/><br/>
                {show && <div className="forms-container">
                    <Card className="form-card">
                        <Title level={5}>BBPOU Participation Form</Title>
                        <NavLink to="/dashboard/form1">
                            <Button color="primary" variant="filled">
                                View form
                            </Button>
                        </NavLink>
                        <Divider/>
                        <div>
                            <Button color="primary" variant="text">
                                Accept <CheckCircleOutlined/>
                            </Button>
                            <Button style={{color: '#f5222d', backgroundColor: '#fff', border: "none"}}>
                                Reject <CloseCircleOutlined/>
                            </Button>
                        </div>
                    </Card>

                    <Card className="form-card">

                        <Title level={5}>BBPS- Acess Request Form</Title>
                        <NavLink to="/dashboard/form2">
                            <Button color="primary" variant="filled">
                                View form
                            </Button>
                        </NavLink>
                        <Divider/>
                        <div>
                            <Button color="primary" variant="text">
                                Accept <CheckCircleOutlined/>
                            </Button>
                            <Button style={{color: '#f5222d', backgroundColor: '#fff', border: "none"}}>
                                Reject <CloseCircleOutlined/>
                            </Button>
                        </div>
                    </Card>

                    <Card className="form-card">

                        <Title level={5}>Sponsor Bank Form</Title>
                        <NavLink to="/dashboard/form3">
                            <Button color="primary" variant="filled">
                                View form
                            </Button>
                        </NavLink>
                        <Divider/>
                        <div>
                            <Button color="primary" variant="text">
                                Accept <CheckCircleOutlined/>
                            </Button>
                            <Button style={{color: '#f5222d', backgroundColor: '#fff', border: "none"}}>
                                Reject <CloseCircleOutlined/>
                            </Button>
                        </div>
                    </Card>
                </div>
                }
            </div>


            <Drawer title="Notificatons" onClose={onClose} placement={"left"} width={300}
                    closable={false} open={open}>
            <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item onClick={() => handleItemClick()} style={{cursor: "pointer"}}>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                                title={item.title}
                                description={item.name}
                            />
                        </List.Item>
                    )}
                />

            </Drawer>
        </>
    );
};

export default Admin;