import React from 'react';
import {Sidebar} from "../components/Sidebar";
import DomainAdd from "../components/Domain/DomainAdd";
import DomainBody from "../components/Domain/DomainBody";

function Domain(props) {

    return (
        <>
    <Sidebar/>
            <div>

                <DomainAdd />

            </div>
            < DomainBody />

</>

    );
}

export default Domain;