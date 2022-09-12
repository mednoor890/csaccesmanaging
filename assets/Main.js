import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Login from "./pages/Login"
import Site from "./pages/Site";
import Dashboard from "./pages/Dashboard";
import Domain from "./pages/Domain";
import ClientShow from "./pages/ClientShow";
import ClientEdit from "./pages/ClientEdit";
import DataBase from "./pages/DataBase";
import Ftp from "./pages/Ftp";
import DomainShow from "./components/Domain/DomainShow";
import DomainEdit from "./components/Domain/DomainEdit";
import DbEdit from "./components/Db/DbEdit";
import DbShow from "./components/Db/DbShow";
import SiteEdit from "./components/Site/siteEdit";
import SiteShow from "./components/Site/siteShow";
import FtpEdit from "./components/Ftp/FtpEdit";
import FtpShow from "./components/Ftp/FtpShow";

function Main() {
    return (
        <Router>
            <Routes>
                <Route  path="/"  element={<Dashboard/>} />
                <Route path="/show/:id" element={<ClientShow/>} />
                <Route path="/edit/:id" element={<ClientEdit/>} />
                <Route  path="/site"  element={<Site/>} />
                <Route path="/site/edit/:id" element={<SiteEdit/>} />
                <Route path="/site/:id" element ={<SiteShow/>}/>
                <Route path="/database" element={<DataBase/>}/>
                <Route path="/database/edit/:id" element={<DbEdit/>}/>
                <Route path="/database/show/:id" element={<DbShow/>}/>
                <Route path="/ftp" element={<Ftp/>}/>
                <Route path="/ftp/edit/:id" element={<FtpEdit/>}/>
                <Route path="/ftp/show/:id" element={<FtpShow/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/domains" element={<Domain/>} />
                <Route path="/domain/:id" element={<DomainShow/>}/>
                <Route path="/domain/edit/:id" element={<DomainEdit/>}/>

            </Routes>
        </Router>
    );
}

export default Main;
const container = document.getElementById('app');
const root = createRoot(container);
if (document.getElementById('app')) {
    root.render(<Main/>);
}