import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {IconContext} from "react-icons";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../components/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Swal from "sweetalert2";
import ClientAdd from "../components/ClientAdd";
import Body from "../components/Body";
import {Button} from "react-bootstrap";
import {Sidebar} from "../components/Sidebar";






function Dashboard() {


    return (
        <>
            <Sidebar/>
<div>

<ClientAdd />


</div>
< Body />
        </>
        );
}

export default Dashboard;