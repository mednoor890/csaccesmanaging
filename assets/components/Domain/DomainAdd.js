import React from 'react';
import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";
function DomainAdd() {

     const fetchProjectList=()=>{
        axios.get('api/clients')
            .then(function (response){
                setClientList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    const  [clientList, setClientList] = useState([])
    useEffect(()=>{

        fetchProjectList()
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
const [clientProprietaire,setClientProprietaire] =useState('')
    const [DomainName,setDomainName] = useState('');
    const [hebergeur,setHebergeur]=useState('');
    const [dateAct,setdateAct]=useState('');
    const [dateFin,setdateFin]=useState('');
    //const [Statut,setStatut]=useState('');
    const [isSaving,setIsSaving] = useState(false)
    const handleSave =() => {
        setIsSaving(true);


        let formDatar=new FormData()
        formDatar.append("clientProprietaire",clientProprietaire)
        formDatar.append("hebergeur",hebergeur)
        formDatar.append("DomainName",DomainName)
        //formDatar.append("statut",Statut)
        formDatar.append("dateAct",dateAct)
        formDatar.append("dateFin",dateFin)

        //formData.append("domaine",domaine)
        axios.post('/api/domain',formDatar)
            .then(function (response){
                Swal.fire({
                    icon:'success',
                    title:'Domain Added successfully',
                    timer:1500,
                    showConfirmButton: false,

                })
                setIsSaving(false);
                setClientProprietaire('')
                setHebergeur('')
                setdateAct('')
                setDateFin('')
                setDomainName('')
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
let date= new Date();
    date.setDate(date.getDate()+1);
    const minDateValue = date.toISOString()
    return (
        <>
            <Button variant="primary" style={{marginLeft:"90%"}} onClick={ () =>setShow(true)}> Add Domain</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Domain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form   noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Owner Client</Form.Label>
                            <Form.Select
                                onChange={(event)=>{setClientProprietaire(event.target.value)}}
                            >
                                <option>Please select a client</option>
                                {clientList.map((client, key)=>{

                                    return (

                                        <option key={key} value={client.nom + client.prenom}>  {client.nom} {client.prenom} </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>



                        <Form.Group
                            className="mb-3"
                            controlId="validationCustom02">
                            <Form.Label>Host Name(goDaddy,ovh...)</Form.Label>
                            <Form.Control type="text" placeholder="enter the name of the host"
                                          onChange={(event)=>{setHebergeur(event.target.value)}}
                                          required
                                          value={hebergeur}
                                          autoFocus />
                        </Form.Group>







                        <Form.Group
                            className="mb-3"
                            controlId="validationCustom04"                >
                            <Form.Label>Activation Date</Form.Label>
                            <Form.Control type="date"
                                          onChange={(event)=>{setdateAct(event.target.value)}}
                                          minDate={minDateValue}
                                          value={dateAct}
                                          autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="validationCustom04"                >
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date"
                                          onChange={(event)=>{setdateFin(event.target.value)}}
                                          required
                                          value={dateFin}
                                          autoFocus />
                        </Form.Group>


                        <Form.Group
                            className="mb-3"
                            controlId="validationCustom03">
                            <Form.Label> Domain name </Form.Label>

                            <Form.Control type="text" placeholder="enter your domain name"
                                          onChange={(event)=>{setDomainName(event.target.value)}}
                                          required
                                          value={DomainName}
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

export default DomainAdd;