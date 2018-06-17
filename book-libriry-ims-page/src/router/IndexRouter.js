import React from "react"
import {BrowserRouter as Router,Route}from "react-router-dom"
import Login from "../component/login/LoginBody";
import StudentHomeBody from "../component/student/StudentHomeBody"
import BrowHistoryBody from "../component/hist/BrowHistoryBody"
import AdminBody from "../component/admin/AdminBody"
import BookAdder from "../component/admin/BookAdder";
import BookAdmin from "../component/admin/BookAdmin";

const IndexRouter=()=>(
    <Router>
        <div>
            <Route exact path={"/"} component={Login}/>
            <Route path={"/stu"} component={StudentHomeBody}/>
            <Route path={"/his"} component={BrowHistoryBody}/>
            <Route path={"/admin"} component={AdminBody}>
            </Route>
        </div>
    </Router>
);

export default IndexRouter