import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";

function DbEdit(props) {
    const [id, setId] = useState(useParams().id)
    const [HostUrl, setHostUrl] = useState('');
    const [dbName, setDbName] = useState('');
    const [login,setLogin] = useState('');
    const [pw, setPw] = useState('');

    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/api/Db/${id}`)
            .then(function (response) {
                let db= response.data
                setHostUrl(db.HostUrl)
                setDbName(db.dbName);
                setLogin(db.login);
                setPw(db.pw);
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
        axios.patch(`/api/Db/${id}`, {
            HostUrl: HostUrl,
            dbName : dbName,
            login:login,
            pw:pw,

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
                            to="/database">View All DB Accesses
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Host Url</label>
                                <input
                                    onChange={(event)=>{setHostUrl(event.target.value)}}
                                    value={HostUrl}
                                    type="text"
                                    className="form-control"
                                    id="hostUrl"
                                    name="hostUrl"/>
                            </div>
                            <div className="form-group">
                                <label >DB Name </label>
                                <input
                                    value={dbName}
                                    onChange={(event)=>{setDbName(event.target.value)}}
                                    className="form-control"
                                    id="dbName"
                                    name="dbName"/>
                            </div>
                            <div>
                                <label htmlFor="name">Login</label>

                                <input
                                    value={login}

                                    onChange={(event)=>{setLogin(event.target.value)}}
                                    className="form-control"
                                    id="pw"
                                    name="pw"/>
                            </div>
                            <div>
                                <label htmlFor="name">Password</label>

                                <input
                                    value={pw}
                                    type="password"
                                    onChange={(event)=>{setPw(event.target.value)}}
                                    className="form-control"
                                    id="pw"
                                    name="pw"/>
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

export default DbEdit;