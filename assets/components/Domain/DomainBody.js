import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Text} from "../Body";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

function DomainBody(props) {
    const [DomainList, setDomainList]=useState([])
    const fetchDomainList=()=>{
        axios.get('api/domain')
            .then(function (response){
                setDomainList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    useEffect(()=>{

        fetchDomainList()
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
                axios.delete(`/api/domain/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'domain deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchDomainList()
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
             <Text>Access Manager(Domains)</Text>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Owner User</th>
                    <th>Host Company</th>

                    <th>Domain Name</th>
                    <th>Activation Date</th>
                    <th>End Date</th>




                    <th width="240px">Action</th>
                </tr>
                </thead>
                <tbody>

                {DomainList.map((domain, key)=>{

                    return (
                        <tr key={key}>
                            <td>{domain.clientProprietaire}</td>
                            <td>{domain.hebergeur}</td>
                            <td>{domain.nom}</td>
                            <td>{domain.date_cre}</td>
                            <td>{domain.date_fin}</td>

                            <td>
                                <Link
                                    to={`/domain/${domain.id}`}
                                    className="btn btn-outline-info mx-1">
                                    Show
                                </Link>
                                <Link
                                    className="btn btn-outline-success mx-1"
                                    to={`/domain/edit/${domain.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={()=>handleDelete(domain.id)}
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

export default DomainBody;