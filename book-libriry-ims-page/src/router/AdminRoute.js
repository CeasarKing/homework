import BookAdder from "../component/admin/book/BookAdder";
import BookAdmin from "../component/admin/book/BookAdmin";
import React from "react"
import {Route} from "react-router-dom"
import BookDeller from "../component/admin/book/BookDeller";
import StudentAdmin from "../component/admin/student/StudentAdmin";
import StudentAdder from "../component/admin/student/StudentAdder"
import StudentDeller from "../component/admin/student/StudentDeller"
import MessageOfLend from "../component/admin/message/MessageOfLend";

const AdminRoute =()=>(
    <div>
        <Route exact path={"/admin/"} component={BookAdmin}/>
        <Route path={"/admin/addb"} component={BookAdder}/>
        <Route path={"/admin/delb"} component={BookDeller}/>
        <Route path={"/admin/searu"} component={StudentAdmin}/>
        <Route path={"/admin/addu"} component={StudentAdder}/>
        <Route path={"/admin/delu"} component={StudentDeller}/>
        <Route path={"/admin/led"} component={MessageOfLend}/>
            <Route path={"/admin/ret"}/>
    </div>
)

export default AdminRoute