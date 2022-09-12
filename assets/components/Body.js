import React ,{useEffect, useState}from 'react';
import axios from "axios";
import styled from "styled-components"
import Table from 'react-bootstrap/Table'
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
export const Text=styled.h1`
color:white;
text-align:center;
`
function Body()
{

    const  [clientList, setClientList] = useState([])
    useEffect(()=>{

        fetchProjectList()
    },[])

     const fetchProjectList=()=>{
        axios.get('api/clients')
            .then(function (response){
                setClientList(response.data)
            })
            .catch(function (error){
                console.log(error)
            })
    }
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
                axios.delete(`/api/clients/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'client deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
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

                <Text>Access Manager</Text>



                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>Domain(s)</th>


                                <th width="240px">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {clientList.map((client, key)=>{

                                return (
                                    <tr key={key}>
                                        <td>{client.id}</td>
                                        <td>{client.nom}</td>
                                        <td>{client.prenom}</td>
                                        <td>{client.Company}</td>
                                        <td>{client.email}</td>
                                        <td>{client.etat}</td>
                                        <td>{client.domaine}</td>
                                        <td>
                                            <Link
                                                to={`/show/${client.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Show
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${client.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger mx-1"
                                                onClick={()=>handleDelete(client.id)}
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

            )
}
export default Body;