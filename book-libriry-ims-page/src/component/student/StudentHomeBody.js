import React from "react"

import {Layout,Affix} from "antd"

import NormalHeader from "./NomalHeader"
import SearchInput from "./SearchInput"
import CategoryList from "./CategoryList";
import ShowBookList from "./ShowBookList";
import CategorySearch from "./CategorySearch";

const {Sider,Content,Header}=Layout;

export default class StudentHomeBody extends React.Component{

    state={
        scrollH:"200px",
        divStyle:undefined
    };

    onClickCategory=(height)=>{
        this.setState({
            scrollH:height
        })
    };

    gethw=(h,l)=>{
        this.setState({
            divStyle:{
                width:h,
                marginLeft:l
            }
        })
    };

    render(){

        return(
            <div style={this.state.divStyle===undefined?{}:this.state.divStyle}>
                <NormalHeader gethw={this.gethw}/>
                <SearchInput/>

                <Layout style={{background:"#fff"}}>

                    <Header style={{background:"#Fff"}}>
                        <CategorySearch onList={this.onClickCategory}/>
                    </Header>

                    <Content style={{marginTop:this.state.scrollH}}>
                        <Layout >
                            <Sider theme={"light"} style={{background:"#fff"}}>
                                <Affix> <CategoryList/> </Affix>
                            </Sider>
                            <Content style={{background:"#Fff"}}>
                                <div >
                                    <ShowBookList/>
                                </div>
                            </Content>
                        </Layout>
                    </Content>


                </Layout>

            </div>
        )
    }

}