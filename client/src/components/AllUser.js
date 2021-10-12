import React, { useState, useEffect } from 'react';
import { GetAllUser, GetUserbyId, DeleteUser,UpdateUser } from '../actions/api';
import {
    Col, Card,
    Row,
    Container, Table,
    Form, Button, Modal
} from "react-bootstrap";


export default function AllUser() {

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [refresh, setrefresh] = useState(0);

    const [users, setusers] = useState([]);
    const [userDetails, setuserDetails] = useState([]);
    const [detailImage, setdetailImage] = useState(null);
    
    
    const [updateId, setupdateId] = useState(null);
    const [image, setimage] = useState(null);
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        total_orders: 0
    });
    const { user_name, user_email, total_orders } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    useEffect(() => {
        GetAllUser().then((data) => {
            setusers(data);
        });
        GetUserbyId(updateId).then((data) => {
            if (data) {
                console.log("UPDATE DATA =",data);
                setFormData({
                    user_name:   data.user_name,
                    user_email:  data.user_email,
                    total_orders:data.total_orders 
                });
            }
        })
    }, [refresh,updateId])

    const handleDelete = (id) => {
        console.log(id)
        DeleteUser(id);
        setrefresh(refresh + 1);
    }

    const handleDetails = (id) => {
        GetUserbyId(id).then((data) => {
            console.log(data);
            if (data) {
                setuserDetails(data);
                setdetailImage(`http://localhost:4000/images/` + new Buffer.from(data.user_image).toString("ascii"));
                setShow(true);
            }
        })
    }



    const handleChangeImage = (e) => {
        setimage(e.target.files[0]);
    }

    const handleUpdate = (id) => {
        setupdateId(id);
        setShowUpdate(true);
    }


    const handleSubmit = () => {
       
       let post_data= new FormData();
       post_data.append('user_name',user_name);
       post_data.append('user_email',user_email);
       post_data.append('total_orders',total_orders);

        const new_data={
            user_name: user_name,
            user_email:user_email,
            total_orders:total_orders
        }

        // post_data.append(new_data);

        UpdateUser(updateId,new_data).then(()=>{
            console.log("UPDATED SUCCESSFULLY!!!")
            setShowUpdate(false);
        });

        
    }

    const updateForm = (
        <div>
            <Container className='p-4'>
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

                <Form.Group className="mb-3" controlId="orders">
                    <Form.Label>Total Orders</Form.Label>
                    <Form.Control type="text" placeholder="Total Orders"
                        value={total_orders} name='total_orders' onChange={e => onChange(e)} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleChangeImage} />
                </Form.Group>

                <Button variant="danger" onClick={() => handleSubmit()}>Submit</Button>
            </Container>
        </div>
    )





    return (
        <div >
            <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userDetails ?
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='text-center my-4'>
                                            <img src={detailImage} style={{ height: '100%', width: '100%' }}></img>
                                        </div>
                                    </Col>
                                    <Col className='my-4'>
                                        <div>
                                            <p><span style={{ fontWeight: 'bolder' }}>User Name      :</span> {userDetails.user_name}</p>
                                            <p><span style={{ fontWeight: 'bolder' }}>Email          :</span> {userDetails.user_email}</p>
                                            <p><span style={{ fontWeight: 'bolder' }}>Total Orders   :</span> {userDetails.total_orders}</p>
                                            <p><span style={{ fontWeight: 'bolder' }}>Created At     :</span> {userDetails.createdAt}</p>
                                            <p><span style={{ fontWeight: 'bolder' }}>Last Logged In :</span> {userDetails.createdAt}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            :
                            null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdate} onHide={() =>setShowUpdate(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>{updateForm}</Modal.Body>
            </Modal>

            <div className='bg-success' style={{ padding: '50px' }}>
                <Container>
                    <h3 className="text-center text-white">All User Information</h3>
                </Container>
                <hr />
            </div>
            <Container style={{ marginTop: '50px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">S No.</th>
                            <th className="text-center">Image</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th className="text-center">Total Order</th>
                            <th>Created At</th>
                            <th>Last Logged In</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((row, key) => (
                                <tr>
                                    <td className="text-center">{key + 1}</td>
                                    <td className="text-center">
                                        <img src={`http://localhost:4000/images/` + new Buffer.from(row.user_image).toString("ascii")} style={{ height: 50, width: 50, borderRadius: "100%" }}></img>
                                    </td>
                                    <td>{row.user_name}</td>
                                    <td>{row.user_email}</td>
                                    <td className="text-center">{row.total_orders}</td>
                                    <td>{row.createdAt}</td>
                                    <td>{row.createdAt}</td>
                                    <td className="text-center">
                                        <Button className='mx-2' variant="primary"
                                            onClick={() => handleDetails(row.id)}><i class='fas fa-border-all'></i>
                                        </Button>
                                        <Button className='mx-2' variant="danger"
                                            onClick={() => handleDelete(row.id)}><i class='	fas fa-trash-alt'></i>
                                        </Button>
                                        <Button className='mx-2' variant="success"
                                            onClick={() => handleUpdate(row.id)}><i class='far fa-edit'></i></Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
