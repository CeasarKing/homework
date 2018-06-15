import React from "react"

import { Input,Icon,Checkbox,Row,Col,Button,Radio} from 'antd';
import {Link} from "react-router-dom"

class Login extends React.Component {

    state={
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
                           placeholder={"请输入账号"} /><br/>

                    <span style={{float:"left",marginTop:"10px"}}>{formStyle.pwSpan}</span>

                    <Input style={{
                        width:"220px",
                        marginLeft:"5px",
                        marginTop:"10px"}}
                           prefix={<Icon type={"lock"}  color={"'rgba(0,0,0,.25)'"}/>}
                           size={"small"}
                           placeholder={"请输入密码"} /><br/>
                </div>

                <Row style={{marginTop:"5px"}}>
                    <Col span={12}><Checkbox >记住我</Checkbox></Col>
                    <Col span={12}><Link to={"/foget"}>忘记密码</Link></Col>
                </Row>

                <Row style={{marginTop:"5px"}}>
                    <Col span={10} offset={2}>
                        <Button size={"small"} type={formStyle.btn1}>
                            <Link to={"/login"}>登陆</Link></Button>
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