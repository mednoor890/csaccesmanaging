import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Text} from "../Body";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

function DbBody(props) {
    const [DbList, setDbList]=useState([])
    const fetchDbList=()=>{
        axios.get('/api/Db')
            .then(function (response){
                setDbList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    useEffect(()=>{

        fetchDbList()
    },[])
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/Db/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'domain deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchDbList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <>
            <Text>Access Manager(DB Credentials)</Text>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Host Url(domain name)</th>
                    <th>Database Name</th>

                    <th>Login</th>
                    <th>Password</th>
                    <th width="240px">Action</th>
                </tr>
                </thead>
                <tbody>

                {DbList.map((db,key)=>{

                    return (
                        <tr key={key}>
                            <td>{db.HostUrl}</td>
                            <td>{db.dbName}</td>
                            <td>{db.login}</td>
                            <td>{db.pw}</td>


                            <td>
                                <Link
                                    to={`/database/show/${db.id}`}
                                    className="btn btn-outline-info mx-1">
                                    Show
                                </Link>
                                <Link
                                    className="btn btn-outline-success mx-1"
                                    to={`/database/edit/${db.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={()=>handleDelete(db.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

        </>
    );
}

export default DbBody;