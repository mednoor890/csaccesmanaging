import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Text} from "../Body";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

function siteB() {
    const [SiteList, setSiteList]=useState([])
    const fetchSiteList=()=>{
        axios.get('/api/site')
            .then(function (response){
                setSiteList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
    useEffect(()=>{

        fetchSiteList()
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
                axios.delete(`/api/site/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'domain deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchSiteList()
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
            <Text>Access Manager(Site Credentials)</Text>
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

                {SiteList.map((site,key)=>{

                    return (
                        <tr key={key}>
                            <td>{site.id}</td>
                            <td>{site.hostUrl}</td>
                            <td>{site.login}</td>
                            <td>{site.password}</td>


                            <td>
                                <Link
                                    to={`/site/${site.id}`}
                                    className="btn btn-outline-info mx-1">
                                    Show
                                </Link>
                                <Link
                                    className="btn btn-outline-success mx-1"
                                    to={`/site/edit/${site.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={()=>handleDelete(site.id)}
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

export default siteB;