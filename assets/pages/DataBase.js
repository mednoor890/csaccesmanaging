import React from 'react'
import {Sidebar} from "../components/Sidebar";
import Db from "../components/Db/Db";
import DbBody from "../components/Db/DbBody";
function DataBase() {
    return (
        <>
            <Sidebar/>
<div>

    <Db />
</div>
            <DbBody/>
        </>
    );
}

export default DataBase;