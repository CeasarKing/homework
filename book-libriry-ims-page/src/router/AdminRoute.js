import BookAdder from "../component/admin/BookAdder";
import BookAdmin from "../component/admin/BookAdmin";
import React from "react"
import {BrowserRouter as Router,Route}from "react-router-dom"
import BookDeller from "../component/admin/BookDeller";

const AdminRoute =()=>(
    <div>
        <Route exact path={"/admin/"} component={BookAdmin}/>
        <Route path={"/admin/addb"} component={BookAdder}/>
        <Route path={"/admin/delb"} component={BookDeller}/>
    </div>
)

export default AdminRoute