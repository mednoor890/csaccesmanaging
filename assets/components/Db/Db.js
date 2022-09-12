import React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Db() {
    const [DomainList, setDomainList]=useState([])
    const fetchDomainList=()=>{
        axios.get('/api/domain')
            .then(function (response){
                setDomainList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    useEffect(()=>{

        fetchDomainList()
    },[])

            const [show,setShow]=useState(false);
            const handleClose = () => setShow(false)
            const [validated, setValidated] = useState(false);

            const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

            setValidated(true);
        };
           const [hostUrl,setHostUrl]=useState('')
            const [dbName,setDbName]=useState('');
            const [login,setLogin]=useState('');
            const [password,setPassword]=useState('');

            const [isSaving,setIsSaving] = useState(false)
            const handleSave =() => {
            setIsSaving(true);


            let formData=new FormData()
            formData.append("dbName",dbName)
            formData.append("login",login)
            formData.append("pw",password)
            formData.append("HostUrl",hostUrl)


            //formData.append("domaine",domaine)
            axios.post('/api/Db',formData)
            .then(function (response){
            Swal.fire({
            icon:'success',
            title: 'Access to database Added successfully',
            timer:1500,
            showConfirmButton: false,

        })
            setIsSaving(false);
            setDbName('')
            setLogin('')
            setPassword('')
                setHostUrl('')
            })
            .catch(function(error){
            Swal.fire({
            icon:'error',
            title: 'An Error Occurred!',
            timer:1500,
            showConfirmButton: false,

        })
            setIsSaving(false)
        })
        }
            return (
            <>
                <Button variant="primary" style={{marginLeft:"90%"}} onClick={ () =>setShow(true)}> Add DB access</Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Access to database</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form   noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Database name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter the database name"
                                    autoFocus
                                    onChange={(event)=>{setDbName(event.target.value)}}
                                    required
                                    value={dbName}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Host Domain</Form.Label>
                                <Form.Select onChange={(event)=>{setHostUrl(event.target.value)}}>

                                    <option>Please select a domain</option>
                                    {DomainList.map((domain, key)=>{

                                        return (

                                            <option key={key} value={domain.nom}>   {domain.nom}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="validationCustom02"                >
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="enter login"
                                              onChange={(event)=>{setLogin(event.target.value)}}
                                              required
                                              value={login}
                                              autoFocus />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="validationCustom02"                >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="enter password"
                                              onChange={(event)=>{setPassword(event.target.value)}}
                                              required
                                              value={password}
                                              autoFocus />
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>





            </>
    );
}

export default Db;