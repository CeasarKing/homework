
import React from "react"
import {Divider} from "antd"

import NomalHeader from "../student/NomalHeader"
import CustomerInfo from "./CustomerInfo";
import ShoppingCartItem from "./ShoppingCartItem";

import createHistory from "history/createBrowserHistory"

export default class ShoppingCartBody extends React.Component{

    constructor(props){
        super();

        const params= props.location.state;

        //得到购物车的书的列表
        const preBooks = (params.books === undefined||
            params.books==null)?[]:params.books;
        const books=[];
        for (let key in preBooks){
            books.push(preBooks[key])
        }

        this.state={
            divStyle:undefined,
            user:params.user,
            books:books,
            address:"",
            isInStrore:false
        };
    }


    gethw=(h,l)=>{
        console.log(h,l);
        this.setState({
            divStyle:{
                width:h,
                marginLeft:l
            }
        })
    };

    handleFormSubmit=(order)=>{

        order.userId = this.state.user.id;
        order.address = this.state.address;

        console.log(order);

        const history = createHistory({forceRefresh:true});
        history.push({
            pathname:"/success",
            state:{
                order:order
            }
        })

    };


    render(){
        return(<div style={this.state.divStyle===undefined?{}:this.state.divStyle}>
            <NomalHeader gethw={this.gethw} />
            <h1>提交书篮</h1>
            <Divider/>
            <span>租借人信息</span><br/>
            <CustomerInfo user={this.state.user} address={this.state.address}
                          onAddressChange={(e)=>this.setState({address:e})}
                          onVisiteChange={(e)=>{this.setState({isInStrore:e})}}
            />

            <span>我的书篮</span><br/>

            <ShoppingCartItem books={this.state.books} inStore={this.state.isInStrore} onFormSubmit={this.handleFormSubmit}/>

        </div>)
    }

}