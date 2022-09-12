import React, {useEffect} from 'react';
import axios from "axios";
import {Sidebar} from "../components/Sidebar";
import Add from "../components/Site/Add";
import SiteB from "../components/Site/siteB";

function Site() {


    return (
        <>

<Sidebar/>
<div>
    <Add/>
</div>
<SiteB/>

        </>
    );
}

export default Site;