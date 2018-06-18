import React from "react"

import {Layout,Affix} from "antd"

import NormalHeader from "./NomalHeader"
import SearchInput from "./SearchInput"
import CategoryList from "./CategoryList";
import ShowBookList from "./ShowBookList";
import CategorySearch from "./CategorySearch";
import $ from "jquery";

const {Sider,Content,Header}=Layout;

export default class StudentHomeBody extends React.Component{

    constructor(props){
        super();
        const booksData = this.preGetData();

        this.state={
            scrollH:"200px",
            divStyle:undefined,
            booksData:booksData,
            books:booksData.books.slice(0,50)
        };
    }

    //得到数据
    preGetData=()=>{
        let resData=null
        $.ajax({
            url:"http://localhost:8080/infos",
            method:"get",
            async:false,
            success: (data)=> {
                const dataObj = $.parseJSON(data);
                resData=dataObj
            }
        });
        return resData;
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

    onCategorySelection=(selectArr)=>{
        let count=0;
        const data = this.state.booksData.books;
        let newData = []
        for (let i =0;i<data.length && count<50;i++){
            let tags = data[i].tags;
            for (let j in tags){
                const id = tags[j];
                let flag=false
                for (let k in selectArr){
                    if (id==selectArr[k]){
                        newData.push(data[i])
                        count++;
                        flag=true;
                        break
                    }
                }
                if (flag)
                    break
            }
        }

        this.setState({
            books:newData
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
                                    {//--左边的分类列表-->
                                         }
                                <Affix> <CategoryList tags={this.state.booksData.tags} onSelect={this.onCategorySelection}/> </Affix>
                            </Sider>
                            <Content style={{background:"#Fff"}}>
                                    {//--右边的显示列表-->
                                         }
                                <div >
                                    <ShowBookList books={this.state.books}/>
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>

            </div>
        )
    }

}