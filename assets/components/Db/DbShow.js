import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function DbShow(props) {
    const [id, setId] = useState(useParams().id)
    const [db, setDb] = useState({dbName:'', HostUrl:'',login:'',pw:""})
    useEffect(() => {
        axios.get(`/api/Db/${id}`)
            .then(function (response) {
                setDb(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show DB Access</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/database"> View All DB Accesses
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">HostUrl:</b>
                        <p>{db.HostUrl}</p>
                        <b className="text-muted">DB Name:</b>
                        <p>{db.dbName}</p>
                        <b className="text-muted">Login:</b>
                        <p>{db.login}</p>
                        <b className="text-muted">Password:</b>
                        <p>{db.pw}</p>


                    </div>
                </div>
            </div>
        </>
    );
}

export default DbShow;