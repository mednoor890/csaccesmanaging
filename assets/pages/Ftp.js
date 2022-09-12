import React from 'react';
import {Sidebar} from "../components/Sidebar";
import FtpAdd from "../components/Ftp/FtpAdd";
import FtpBody from "../components/Ftp/FtpBody";

function Ftp() {
    return (
        <>
            <Sidebar/>
<div>
    <FtpAdd/>
</div>
            <FtpBody/>
        </>
    );
}

export default Ftp;