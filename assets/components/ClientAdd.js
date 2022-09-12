import React, {useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
//import './ClientAdd.css';
import Form from 'react-bootstrap/Form'
import * as AiIcons from "react-icons/ai";
import styled from "styled-components";
import {Button, Modal} from "react-bootstrap";


function ClientAdd() {
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

    const [nom,setNom]=useState('');
    const [prenom,setPrenom]=useState('');
    const [Company,setCompany]=useState('');
    const [email,setEmail]=useState('');
    const [etat,setEtat]=useState('');
    //const [nomprojet,setNomprojet]=useState('');
    const [domaine,setDomaine]=useState('');//I expect it to return a type error according to my logic it has to be an array of strings
    const [isSaving,setIsSaving] = useState(false)
    const handleSave =() => {
        setIsSaving(true);


        let formData=new FormData()
        formData.append("nom",nom)
        formData.append("prenom",prenom)
        formData.append("Company",Company)
        formData.append("email",email)
        formData.append("etat",etat)
        //formData.append("nomprojet",nomprojet)
        formData.append("domaine",domaine)
        axios.post('/api/clients',formData)
            .then(function (response){
                Swal.fire({
                    icon:'success',
                    title:'Client Added successfully',
                    timer:1500,
                    showConfirmButton: false,
                })
                setIsSaving(false);
                setNom('')
                setPrenom('')
                setCompany('')
                setEmail('')
                setEtat('')
                setDomaine('')
               // setNomprojet('')
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
    <Button variant="primary" style={{marginLeft:"90%"}} onClick={ () =>setShow(true)}> Add Client</Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add a Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form   noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter your first name"
                        autoFocus
                        onChange={(event)=>{setNom(event.target.value)}}
                        required
                        value={nom}

                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="validationCustom02"                >
                    <Form.Label>Last NAME</Form.Label>
                    <Form.Control type="text" placeholder="enter your first name"
                                  onChange={(event)=>{setPrenom(event.target.value)}}
                                  required
                                  value={prenom}
                                  autoFocus />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="validationCustom03"                >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="enter your email"
                                  onChange={(event)=>{setEmail(event.target.value)}}
                                  required
                                  value={email}
                                  autoFocus />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="validationCustom03"                >
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="enter company name"
                                  onChange={(event)=>{setCompany(event.target.value)}}
                                  required
                                  value={Company}
                                  autoFocus />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="validationCustom04">


                    <Form.Select aria-label="Default select example"
                                 onChange={(event)=>{setEtat(event.target.value)}}
                                 required
                                 value={etat}
                    >
                        <Form.Label>state of client</Form.Label>

                        <option>Open this select menu to add client state</option>
                        <option value="In progress">In progress</option>
                        <option value="Old">Old</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Domains</Form.Label>
                    <Form.Control type="text" placeholder="enter Domains"
                                  onChange={(event)=>{setDomaine(event.target.value)}}
                                  required
                                  value={domaine}
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

export default ClientAdd;

/*<div className="modal">
    <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title">Add a Client</h1>
            <div className="modal-close"><button ><AiIcons.AiOutlineClose onClick={props.onClose}/></button></div>
        </div>
        <div className="modal-body">
            <form>
                <Label htmlFor="name">First Name</Label>

                <Input
                    onChange={(event)=>{setNom(event.target.value)}}
                    type="text"
                    id="nom"
                    name="nom"
                    value={nom}
                />
                <Label htmlFor="name">Last Name</Label><br/>

                <Input
                    onChange={(event)=>{setPrenom(event.target.value)}}
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={prenom}
                /><br/>
                <Label htmlFor="name">Company</Label><br/>

                <Input
                    onChange={(event)=>{setCompany(event.target.value)}}
                    type="text"
                    id="Company"
                    name="Company"
                    value={Company}
                /><br/>
                <Label htmlFor="name">Email</Label><br/>

                <Input
                    onChange={(event)=>{setEmail(event.target.value)}}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                /> <br/>
                <Label htmlFor="etat">Etat</Label><br/>
                <Select
                    id="etat"
                    onChange={(event)=>{setEtat(event.target.value)}}
                    value={etat}
                    name="etat">
                    <option value="">choose an option</option>
                    <option value="in progress">in progress</option>
                    <option value="old">old(ex client)</option>
                </Select>
                <Label htmlFor="nomProjet">Project Name</Label><br/>

                <Input
                    onChange={(event)=>{setNomprojet(event.target.value)}}
                    type="text"
                    id="nomProjet"
                    name="nomProjet"
                    value={nomprojet}/>

                <Label htmlFor="name">Domain</Label><br/>

                <Input
                    onChange={(event)=>{setDomaine(event.target.value)}}
                    type="text"
                    id="domain"
                    name="domain"
                    value={domaine}/>

            </form>

        </div>
        <div className="modal-footer">

            <button className="button" onClick={handleSave}>Submit</button>
        </div>
    </div>
</div>*/