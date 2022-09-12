import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function ClientShow(props) {
    const [id, setId] = useState(useParams().id)
    const [domain, setDomain] = useState({clientProprietaire:'', hebergeur:'',date_cre:'',date_fin:"",nom:""})
    useEffect(() => {
        axios.get(`/api/domain/${id}`)
            .then(function (response) {
                setDomain(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Domains</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/domains"> View All Domains
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Owner Client:</b>
                        <p>{domain.clientProprietaire}</p>
                        <b className="text-muted">Host</b>
                        <p>{domain.hebergeur}</p>
                        <b className="text-muted">Activation Date:</b>
                        <p>{domain.date_cre}</p>
                        <b className="text-muted">Expiration Date:</b>
                        <p>{domain.date_fin}</p>
                        <b className="text-muted">Domain Name:</b>
                        <p>{domain.nom}</p>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientShow;