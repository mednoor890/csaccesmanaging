import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function FtpShow() {
    const [id, setId] = useState(useParams().id)
    const [ftp, setFtp] = useState({ HostUrl:'',login:'',pw:""})
    useEffect(() => {
        axios.get(`/api/ftp/${id}`)
            .then(function (response) {
                setFtp(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Ftp Access</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/ftp"> View All Ftp's Accesses
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">HostUrl:</b>
                        <p>{ftp.HostUrl}</p>

                        <b className="text-muted">Login:</b>
                        <p>{ftp.login}</p>
                        <b className="text-muted">Password:</b>
                        <p>{ftp.password}</p>


                    </div>
                </div>
            </div>
        </>
    );
}

export default FtpShow;