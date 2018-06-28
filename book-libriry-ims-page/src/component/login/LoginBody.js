import React from "react"

import { Input,Icon,Checkbox,Row,Col,Button,Radio} from 'antd';
import {Link} from "react-router-dom"
import $ from "jquery"

class Login extends React.Component {

    state={
        username:"",
        password:"",
        formStyles:[
            {
                userSpan:"账号",
                pwSpan:"密码",
                btn1:"primary",
                btn2:"visible"
            },
            {
                userSpan:"名头",
                pwSpan:"暗号",
                btn1:"danger",
                btn2:"hidden"
            }
        ],
        formStylePos:0
    };

    handleChange=()=>{
        const pos=this.state.formStylePos;
        if (pos===0){
            this.setState({
                formStylePos:pos+1
            })
        } else {
            this.setState({
                formStylePos:pos-1
            })
        }
    };

    componentWillMount(){
        console.log("123")
        $.ajax({
            url:"http://localhost:8080/login",
            method:"post",
            xhrFields: {
                withCredentials: true
            },
            data:{
                username:"111",
                password:"123"
            },
            success:function (resp) {
                console.log(resp)
            }
        })
    };

    handleClickLogin=()=>{
        const un=this.state.username.trim();
        const pw=this.state.password.trim();

        if (un!=="" || pw!==""){
            $.ajax({
                url:"http://localhost:8080/login",
                method:"post",
                xhrFields:{
                  withCredentials:true
                },
                data:{
                    username:un,
                    password:pw
                },
                success:function (resp) {
                    console.log(resp)
                }
            })
        }

    };

    render() {

        const formStyle=this.state.formStyles[this.state.formStylePos];

        return (
            <div style={{width:"300px",marginLeft:"100px",marginTop:"100px"}}>

                <h2 style={{marginLeft:"20px"}}>欢迎登陆图书管理系统</h2>

                <Radio.Group onChange={this.handleChange} style={{marginLeft:"60px"}} size={"small"} defaultValue={"student"}>
                    <Radio value={"student"}>学生</Radio>
                    <Radio value={"admin"}>管理员</Radio>
                </Radio.Group>

                <div style={{marginTop:"10px"}}>
                    <span style={{float:"left",marginTop:"3px"}}>{formStyle.userSpan}</span>

                    <Input style={{
                        width:"220px",
                        marginLeft:"5px",}}
                           prefix={<Icon type={"user"} color={"'rgba(0,0,0,.25)'"}/>}
                           size={"small"}
                           placeholder={"请输入账号"}
                           onChange = {(e)=>{this.setState({username:e.target.value})}}
                    /><br/>

                    <span style={{float:"left",marginTop:"10px"}}>{formStyle.pwSpan}</span>

                    <Input style={{
                        width:"220px",
                        marginLeft:"5px",
                        marginTop:"10px"}}
                           prefix={<Icon type={"lock"}  color={"'rgba(0,0,0,.25)'"}/>}
                           size={"small"}
                           placeholder={"请输入密码"}
                           onChange={(e)=>{this.setState({password:e.target.value})}}
                    /><br/>
                </div>

                <Row style={{marginTop:"5px"}}>
                    <Col span={12}><Checkbox>记住我</Checkbox></Col>
                    <Col span={12}><Link to={"/foget"}>忘记密码</Link></Col>
                </Row>

                <Row style={{marginTop:"5px"}}>
                    <Col span={10} offset={2}>
                        <Button onClick={this.handleClickLogin} size={"small"} type={formStyle.btn1}>
                            登陆</Button>
                    </Col>
                    <Col offset={6}>
                        <Button size={"small"} style={{visibility:formStyle.btn2,color:"#3EA2FC",borderColor:"#3EA2FC"}}>
                            <Link to={"/register"}>注册</Link></Button>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default Login