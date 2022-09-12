import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";

function DomainEdit(props) {
    const [id, setId] = useState(useParams().id)
    const [DomainName, setDomainName] = useState('');
    const [clientProprietaire, setClientProprietaire] = useState('');
    const [dateCre,setDateCre] = useState('');
    const [dateFin, setDateFin] = useState('');
    const[hebergeur,setHebergeur] = useState('');

    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/api/domain/${id}`)
            .then(function (response) {
                let domain = response.data
                setDomainName(domain.nom);
                setClientProprietaire(domain.clientProprietaire);
                setDateCre(domain.date_cre);
                setDateFin(domain.date_fin);
                setHebergeur(domain.hebergeur);

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
        axios.patch(`/api/domain/${id}`, {
            nom: DomainName,
            clientProprietaire : clientProprietaire,
            date_cre:dateCre,
            date_fin:dateFin,
            hebergeur:hebergeur,

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
                <h2 className="text-center mt-5 mb-3">Edit Domain</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/domains">View All Domains
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Domain Name</label>
                                <input
                                    onChange={(event)=>{setDomainName(event.target.value)}}
                                    value={DomainName}
                                    type="text"
                                    className="form-control"
                                    id="nom"
                                    name="nom"/>
                            </div>
                            <div className="form-group">
                                <label >Owner </label>
                                <input
                                    value={clientProprietaire}
                                    onChange={(event)=>{setClientProprietaire(event.target.value)}}
                                    className="form-control"
                                    id="clientProprietaire"
                                    name="clientProprietaire"/>
                            </div>
                            <div>
                                <label htmlFor="name">Activation date</label>

                                <input
                                    value={dateCre}
                                    type="date"
                                    onChange={(event)=>{setDateCre(event.target.value)}}
                                    className="form-control"
                                    id="dateCre"
                                    name="dateCre"/>
                            </div>
                            <div>
                                <label htmlFor="name">Expiration date</label>
                                <input
                                    value={dateFin}
                                    onChange={(event)=>{setDateFin(event.target.value)}}
                                    className="form-control"
                                    id="dateFin"
                                    type="date"
                                    name="dateFin"/>
                            </div>
                            <div>
                                <label htmlFor="name">Host</label>
                                <input
                                    className="form-control"
                                             onChange={(event)=>{setHebergeur(event.target.value)}}
                                             required
                                             value={hebergeur}
                                />


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

export default DomainEdit;