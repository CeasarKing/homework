import React from "react"
import {BrowserRouter as Router,Route}from "react-router-dom"
import Login from "../component/login/LoginBody";
import StudentHomeBody from "../component/student/StudentHomeBody"
import BrowHistoryBody from "../component/hist/BrowHistoryBody"
import AdminBody from "../component/admin/AdminBody"
import ShoppingCartBody from "../component/shopping/ShoppingCartBody";


const IndexRouter=()=>(
    <Router>
        <div>
            <Route exact path={"/"} component={Login}/>
            <Route path={"/stu"} component={StudentHomeBody}/>
            <Route path={"/his"} component={BrowHistoryBody}/>
            <Route path={"/admin"} component={AdminBody}></Route>
            <Route path={"/cart"} component={ShoppingCartBody}/>
        </div>
    </Router>
);

export default IndexRouter