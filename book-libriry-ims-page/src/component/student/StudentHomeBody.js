import React from "react"

import {Layout,Affix,notification} from "antd"

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
        const user =this.preGetUser();
        const booksData = this.preGetData();

        this.state={
            scrollH:"200px",
            divStyle:undefined,
            booksData:booksData,
            books:booksData.books,
            user:user,
            badgeCount:0,
            shopingItems:{}
        };
    }
    //得到数据
    preGetData=()=>{
        let resData=null;
        $.ajax({
            url:"http://192.168.1.101:8080/infos",
            data:{
                limit:50,
                needTags:true
            },
            xhrFields:{
                withCredentials:true
            },
            method:"get",
            async:false,
            success: (data)=> {
                const dataObj = $.parseJSON(data);
                resData=dataObj
            },
            error:(data)=>{
                console.log(data)
            }
        });
        return resData;
    };

    preGetUser=()=>{
        let user = null;
        $.ajax({
            url:"http://192.168.1.101:8080/get/user",
            method:"get",
            xhrFields:{
              withCredentials:true
            },
            async:false,
            success:function (resp) {
                user=JSON.parse(resp)
            },
        });
        return user;
    };

    gethw=(h,l)=>{
        this.setState({
            divStyle:{
                width:h,
                marginLeft:l
            }
        })
    };

    //处理查找分类隐藏于显示的高度变化
    onClickCategoryHeight=(height)=>{
        this.setState({
            scrollH:height
        })
    };
    //点击分类的响应函数
    onClickCategoryItem=(val)=>{

        console.log(val)

        $.ajax({
            url:"http://192.168.1.101:8080/infos",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
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
        $.ajax("http://192.168.1.101:8080/infos",{
            method:"get",
            xhrFields:{
                withCredentials:true
            },
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
            url:"http://192.168.1.101:8080/infos",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
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
    //当点击添加购物车的时候
    onClickAddCart=(book)=>{

        if (this.state.shopingItems[book.bId] === undefined){
            const count=this.state.badgeCount + 1;
            this.setState({
                badgeCount : count
            });
            this.state.shopingItems[book.bId] = book

            const notifyMsg="你已经将 " + book.bookName + " 成功添加到书篮中了"
            notification.open({
                message:"添加成功",
                description:notifyMsg
            })

        }else {
            notification.open({
                message:"添加失败",
                description:"只能添加一本,请不要重复添加"
            })
        }

    };
    //当点击直接购买的时候
    onClickShopping=(book)=>{
        console.log(book)
    };

    render(){
        return(
            <div style={this.state.divStyle===undefined?{}:this.state.divStyle}>
                <NormalHeader gethw={this.gethw} user={this.state.user} count={this.state.badgeCount}/>

                <SearchInput onSearch={this.onInputSearch}/>

                <Layout style={{background:"#fff"}}>

                    <Header style={{background:"#fff"}}>
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
                                    <ShowBookList onOk={this.onClickShopping} onAddCart={this.onClickAddCart} books={this.state.books} />
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>

            </div>
        )
    }

}