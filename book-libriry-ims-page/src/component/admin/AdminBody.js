import React from "react"
import {Menu,Icon,Layout} from "antd"
import AdminRoute from "../../router/AdminRoute"

import {Link} from "react-router-dom"

const {SubMenu,Item}=Menu;
const {Content,Sider}=Layout;

export default class AdminBody extends React.Component{

    state={

    };

    handleClick=()=>{

    };

    render(){

        const optionMenu=(<Menu
            onClick={this.handleClick}
            style={{width:200}}
            mode={"inline"}
            defaultOpenKeys={["b","s","m"]}
        >
            <SubMenu key={"b"} title={<span><Icon type={"book"}/>图书</span>}>

                <Item key={"b1"}><Link to={"/admin"}><Icon type={"search"}/>查找</Link></Item>
                <Item key={"b2"}><Link to={"/admin/addb"}><Icon type="file-add" />录入</Link></Item>
                <Item key={"b3"}><Link to={"/admin/delb"}><Icon type="close-circle-o" />删除</Link></Item>

            </SubMenu>

            <SubMenu key={"s"} title={<span><Icon type="smile-o" />学生</span>}>

                <Item key={"s1"}><Link to={"/admin/searu"}> <Icon type={"search"}/>查找 </Link> </Item>
                <Item key={"s2"}><Link to={"/admin/addu"}><Icon type="usergroup-add" />登入</Link></Item>
                <Item key={"s3"}><Link to={"/admin/delu"}><Icon type="user-delete" />管理</Link></Item>

            </SubMenu>

            <SubMenu key={"m"} title={<span><Icon type={"message"}></Icon>消息</span>}>

                <Item key={"m1"}><Link to={"/admin/led"}><Icon type="export" />借出</Link></Item>
                <Item key={"m2"}><Link to={"/admin/ret"}><Icon type="save" />归还</Link></Item>
                <Item key={"m3"}><Link to={"/admin/msg"}><Icon type="question"/>留言</Link></Item>

            </SubMenu>

        </Menu>);

        return(
           <div>
            <h1 style={{textAlign:"center",marginTop:"20px"}}>图书管理系统</h1>

            <Layout style={{background:"#fff"}}>
                <Sider theme={"light"}>
                    {optionMenu}
                </Sider>

                <Content>

                    <AdminRoute/>

                </Content>
            </Layout>
        </div>
    )
    }
}