import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CreateUser } from '../actions/api';
import {
    Col, Card,
    Row,Alert,
    Container, Table,
    Form, Button, Modal
} from "react-bootstrap";

export default function UserForm() {

    const [success, setsuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');



    const [image, setimage] = useState(null);

    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
        total_orders: 0
    });

    const { user_name, user_email, user_password, total_orders } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });



    const handleChangeImage = (e) => {
        setimage(e.target.files[0]);
    }

    if (success) {
        return <Redirect to='/users' />
    }

    const handleSubmit = () => {
        if(user_name.length==0 || user_email.length==0 || user_password.length==0 || !image){
            setShow(true);
            seterrorMsg("All fields are required.");
        }
        else{
            let form_data = new FormData();
            form_data.append('user_name', user_name);
            form_data.append('user_email', user_email);
            form_data.append('user_password', user_password);
            form_data.append('total_orders', total_orders);
            form_data.append('image', image);
            console.log(form_data);
    
            CreateUser(form_data).then((data) => {
                if (data) {
                    console.log(data);
                    setsuccess(true);
                }else{
                    setShow(true);
                    seterrorMsg("Email Already Exists");
                }
            })
        }
    }

    return (
        <div className='pb-4 bg-primary text-white' >
            <Container style={{ paddingTop:30 }}>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <Container className='p-4' style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}}>
                            <div>
                                <h5 className="text-center text-white">Register User</h5>
                            </div>
                            <hr/>
                            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>{errorMsg}</Alert>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="User Name"
                                    value={user_name} name='user_name' onChange={e => onChange(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    value={user_email} name='user_email' onChange={e => onChange(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    value={user_password} name='user_password' onChange={e => onChange(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="orders">
                                <Form.Label>Total Orders</Form.Label>
                                <Form.Control type="text" placeholder="Total Orders"
                                    value={total_orders} name='total_orders' onChange={e => onChange(e)}/>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" onChange={handleChangeImage} />
                            </Form.Group>

                            <Button variant="danger" onClick={() => handleSubmit()}>Submit</Button>
                        </Container>
                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Container>
        </div>
    )
}
