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
            books:booksData.books
        };
    }

    //得到数据
    preGetData=()=>{
        let resData=null
        $.ajax({
            url:"http://localhost:8080/infos",
            data:{
                limit:50,
                needTags:true
            },
            method:"get",
            async:false,
            success: (data)=> {
                const dataObj = $.parseJSON(data);
                resData=dataObj
            }
        });
        return resData;
    };

    gethw=(h,l)=>{
        this.setState({
            divStyle:{
                width:h,
                marginLeft:l
            }
        })
    };

    onClickCategoryHeight=(height)=>{
        this.setState({
            scrollH:height
        })
    };

    onClickCategoryItem=(val)=>{

        console.log(val)

        $.ajax({
            url:"http://localhost:8080/infos",
            method:"get",
            data:{
                cateJsonStr:val,
                limit:50
            },
            success: (resp) =>{
                this.setState({
                    books:JSON.parse(resp).books
                })
            }

        })
    };

    //当左边的分类list被点击的回掉函数
    onSelectCategory=(selectArr)=>{
        let count=0;
        const data = this.state.booksData.books;
        let newData = []

        const tagIds=JSON.stringify(selectArr)
        $.ajax("http://localhost:8080/infos",{
            method:"get",
            data:{
                tagIds:tagIds,
                limit:50,
                needTags:false
            },
            success:(resp)=>{
                this.setState({
                    books:JSON.parse(resp).books
                })
            }
        })
    };

    //当点击搜索的时候的回调函数
    onInputSearch=(search)=>{
        $.ajax({
            url:"http://localhost:8080/infos",
            method:"get",
            data:{
                bookName:search
            },
            success:(resp)=>{
                this.setState({
                    books:JSON.parse(resp).books
                })
            }
        })
    };

    render(){

        return(
            <div style={this.state.divStyle===undefined?{}:this.state.divStyle}>
                <NormalHeader gethw={this.gethw}/>
                <SearchInput onSearch={this.onInputSearch}/>

                <Layout style={{background:"#fff"}}>

                    <Header style={{background:"#Fff"}}>
                        <CategorySearch onClickItem={this.onClickCategoryItem} onList={this.onClickCategoryHeight}/>
                    </Header>

                    <Content style={{marginTop:this.state.scrollH}}>
                        <Layout >
                            <Sider theme={"light"} style={{background:"#fff"}}>
                                    {//--左边的分类列表-->
                                         }
                                <Affix> <CategoryList tags={this.state.booksData.tags} onSelect={this.onSelectCategory}/> </Affix>
                            </Sider>
                            <Content style={{background:"#Fff"}}>
                                    {//--右边的显示列表-->
                                         }
                                <div >
                                    <ShowBookList books={this.state.books} />
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>

            </div>
        )
    }

}