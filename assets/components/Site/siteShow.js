import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function siteShow() {
    const [id, setId] = useState(useParams().id)
    const [site, setSite] = useState({ HostUrl:'',login:'',pw:""})
    useEffect(() => {
        axios.get(`/api/site/${id}`)
            .then(function (response) {
                setSite(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Sites Access</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/site"> View All Sites Accesses
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">HostUrl:</b>
                        <p>{site.HostUrl}</p>

                        <b className="text-muted">Login:</b>
                        <p>{site.login}</p>
                        <b className="text-muted">Password:</b>
                        <p>{site.password}</p>


                    </div>
                </div>
            </div>
        </>
    );
}

export default siteShow;