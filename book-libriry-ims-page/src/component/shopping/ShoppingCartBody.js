
import React from "react"
import {Divider} from "antd"
import NomalHeader from "../student/NomalHeader"
import CustomerInfo from "./CustomerInfo";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCartBody extends React.Component{

    state={
        divStyle:undefined
    };

    gethw=(h,l)=>{
        console.log(h,l)
        this.setState({
            divStyle:{
                width:h,
                marginLeft:l
            }
        })
    };

    render(){
        return(<div style={this.state.divStyle===undefined?{}:this.state.divStyle}>
            <NomalHeader gethw={this.gethw} />
            <h1>提交书篮</h1>
            <Divider/>
            <span>租借人信息</span><br/>
            <CustomerInfo/>

            <span>我的书篮</span><br/>

            <ShoppingCartItem/>

        </div>)
    }

}