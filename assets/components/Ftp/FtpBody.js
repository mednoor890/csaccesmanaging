import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Text} from "../Body";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

function FtpBody() {
    const [FtpList, setFtpList]=useState([])
    const fetchFtpList=()=>{
        axios.get(`/api/ftp`)
            .then(function (response){
                setFtpList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    useEffect(()=>{

        fetchFtpList()
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
                axios.delete(`/api/ftp/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ftp access deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchFtpList()
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
            <Text>Access Manager(FTP Credentials)</Text>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Host Url(domain name)</th>
                    <th>Login</th>
                    <th>Password</th>
                    <th width="240px">Action</th>
                </tr>
                </thead>
                <tbody>

                {FtpList.map((ftp,key)=>{

                    return (
                        <tr key={key}>
                            <td>{ftp.id}</td>
                            <td>{ftp.hostUrl}</td>
                            <td>{ftp.login}</td>
                            <td>{ftp.password}</td>


                            <td>
                                <Link
                                    to={`/ftp/show/${ftp.id}`}
                                    className="btn btn-outline-info mx-1">
                                    Show
                                </Link>
                                <Link
                                    className="btn btn-outline-success mx-1"
                                    to={`/ftp/edit/${ftp.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={()=>handleDelete(ftp.id)}
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

export default FtpBody;