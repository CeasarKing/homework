
import React from "react"
import {Row,Col,Input} from "antd"

const {TextArea}=Input;

export default class CustomerInfo extends React.Component{

    state={
        user:{
            name:"小明",
            cardId:"123456789",
            hasBooks:[],
            record:100,
            address:"大街"
        },
        address:"大街"
    };

    handleAddressChange=(e)=>{
        const val=e.target.value;
        console.log(val);
        this.setState({
            address:val
        })
    };

    handleAddressEnter=(e)=>{
        const val=e.target.value;
        this.setState({
            address:val
        },()=>this.state.user.address=val)
    };

    render(){
        const user = this.state.user;
        return(
            <Row style={{marginTop:"20px",marginLeft:"-15px",height:"160px"}}>

                <Col span={6}><img src={"/imgs/head.jpg"} width={120} height={140}/></Col>

                <Col span={6}><Row>
                    <Col style={{fontSize:"20px"}}> 姓名:{user.name}</Col>
                    <Col style={{fontSize:"15px",marginTop:10}}> card-id:{user.cardId}</Col>
                    <Col style={{fontSize:"15px",marginTop:10}}> 余额:{user.record}元
                        <a style={{marginLeft:"10px"}}>充值</a></Col>
                    <Col style={{fontSize:"15px",marginTop:10}}> 你已经借了<span style={{color:"red"}}>
                        {user.hasBooks===undefined?0:user.hasBooks.length}</span>本书了~</Col>
                </Row></Col>

                <Col span={6}>
                    <Row>
                        <Col>家住地址：</Col>
                        <Col style={{marginTop:"10px"}}>
                            <TextArea style={{height:"70px"}} onPressEnter={this.handleAddressEnter} onChange={this.handleAddressChange} value={this.state.address}/>
                        </Col>
                        <Col style={{color:"Red",fontSize:"10px"}}>(用于提供网上订购以及上门归还等服务)</Col>
                    </Row>
                </Col>

            </Row>
        )
    }

}