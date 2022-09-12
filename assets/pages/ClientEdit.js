import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";

function ClientEdit(props) {
    const [id, setId] = useState(useParams().id)
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [Company,setCompany] = useState('');
    const [email, setEmail] = useState('');
    const[etat,setEtat] = useState('');
    const[nomProjet,setNomProjet] = useState('');
    const [domaine,setDomaine] = useState('');
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/api/clients/${id}`)
            .then(function (response) {
                let client = response.data
                setNom(client.nom);
                setPrenom(client.prenom);
                setCompany(client.Company);
                setEmail(client.email);
                setEtat(client.etat);
                setDomaine(client.domaine);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/clients/${id}`, {
            nom: nom,
           prenom : prenom,
            Company:Company,
            email:email,
            etat:etat,
            domaine:domaine
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }
    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Client</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">View All Clients
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input
                                    onChange={(event)=>{setNom(event.target.value)}}
                                    value={nom}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Last Name</label>
                                <input
                                    value={prenom}
                                    onChange={(event)=>{setPrenom(event.target.value)}}
                                    className="form-control"
                                    id="prenom"
                                    name="prenom"/>
                                <label htmlFor="name">Company</label>

                                <input
                                    value={Company}
                                    onChange={(event)=>{setCompany(event.target.value)}}
                                    className="form-control"
                                    id="Company"
                                    name="Company"/>
                                <label htmlFor="name">Email</label>
                                <input
                                    value={email}
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                    className="form-control"
                                    id="email"
                                    name="email"/>
                                <label htmlFor="name">State</label>
                                <Form.Select aria-label="Default select example"
                                onChange={(event)=>{setEtat(event.target.value)}}
                                required
                                value={etat}
                                >
                                <Form.Label>state of client</Form.Label>

                                <option>Open this select menu to add state</option>
                                <option value="In progress">In progress</option>
                                <option value="Old">Old</option>
                            </Form.Select>

                                <label htmlFor="name">Domains</label>
                                <input
                                    value={domaine}
                                    onChange={(event)=>{setDomaine(event.target.value)}}
                                    className="form-control"
                                    id="domaine"
                                    name="domaine"/>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientEdit;