import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function ClientShow(props) {
    const [id, setId] = useState(useParams().id)
    const [project, setProject] = useState({nom:'', prenom:'',Company:'',nomProjet:"",email:"",etat:"",domaine:""})
    useEffect(() => {
        axios.get(`/api/clients/${id}`)
            .then(function (response) {
                setProject(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Clients</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Clients
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{project.nom}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{project.prenom}</p>
                        <b className="text-muted">Company:</b>
                        <p>{project.Company}</p>
                        <b className="text-muted">Email:</b>
                        <p>{project.email}</p>
                        <b className="text-muted">Project Name:</b>
                        <p>{project.nomProjet}</p>
                        <b className="text-muted">State:</b>
                        <p>{project.etat}</p>
                        <b className="text-muted">Domains:</b>
                        <p>{project.domaine}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientShow;