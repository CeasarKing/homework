import React from "react"
import {List,Popover}from "antd"
import BookChild from "./BookChild";
import BookPopover from "./BookPopover"
import BookIntroModal from "./BookIntroModal";
import $ from "jquery"

const intro=[
    "大学刚毕业的热血青年张云松，怀着对事业的一腔热血，进入了一家广告公司工作。然而，从未接触过的领域、公司复杂的人际关系、微薄的薪水和生活的重压，一点点蚕食着他的少年意气，只有在出差前往小镇望花镇的时候，他才能收获一些难得的平静。\n",
    "望花镇离市区不远，全镇的支柱企业望花酒厂是张云松所在广告公司的大客户，半个镇子的人都在酒厂工作。在这里，张云松遇到了赵娟，一个曾经也怀有梦想，却无奈家庭压力不得不进入酒厂工作的女孩。赵娟的细心、温柔，让张云松对她多了一份情愫，而张云松所处的环境，也让赵娟再次燃起了对离开镇子、出去闯一闯的渴望。两个人走得越来越近，但现实的残酷，却一再打击着他们……"
    ]

export default class ShowBookList extends React.Component{

    constructor(props){
        super()
        const data=this.prepareData(props.books);
        const popOver=[]
        for (let i = 0;i<data.length;i++){
            popOver.push(false)
        }

        this.state={
            books:data,
            modalVisible:false,
            modalItem:null,
            popOverVisible:popOver
        }
    }

    componentWillReceiveProps(nextProps){
        const data=this.prepareData(nextProps.books)
        this.setState({
            books:data
        })
    }

    prepareData(books){
        const theSomeBooks=books;
        let retBooks=[];
        theSomeBooks.forEach(v=>{
            let book={
                index:v.bId,
                img:v.imgSrc,
                name:v.bookName,
                author:v.author,
                intro:v.bookIntro,
                publish:v.publicWork,
                publicTime:v.publicTime
            };
            retBooks.push(book)
        });
        return retBooks
    }

    handleClickItem=(bname)=>{

        console.log("click");

        let modalItem = null;
        $.ajax({
            url: window.serverHost + "/one",
            data:{
                bookName:bname
            },
            xhrFields:{
              withCredentials:true
            },
            async:false,
            success:(resp)=>{
                modalItem = JSON.parse(resp)
            }
        });


        const popOver=this.state.popOverVisible;
        for (let i=0;i<popOver.length;i++)
            popOver[i]=false

        this.setState({
            modalVisible:true,
            modalItem:modalItem,
            popOverVisible:popOver
        })
    };

    handleOk=(book)=>{
        this.props.onOk(this.state.modalItem)
    };

    handleCancel=()=>{
        this.setState({
            modalVisible:false
        });

    };

    handleAddCart=()=>{
        this.props.onAddCart(this.state.modalItem)
    };

    handlePopMouseEnterOrOut=(key)=>{
        const popOverVisible=this.state.popOverVisible;
        popOverVisible[key]=!popOverVisible[key];
        this.setState({
            popOverVisible:popOverVisible
        })
    };

    render(){
        let itemPos=-1;
        return(
            <div>
                <List
                    grid={{gutter:0,column:5}}
                    dataSource={this.state.books}
                    renderItem={(item,index)=>{
                        if (itemPos===5)
                            itemPos=0;
                        else
                            itemPos++;

                        return(<Popover content={<BookPopover book={item}/>}
                                        trigger={"hover"}
                                        mouseEnterDelay={1}
                                        placement={itemPos>2?"left":"right"}
                        >
                            <List.Item onClick={this.handleClickItem.bind(this,item.name)}
                                       key={item.index}
                            >
                                <BookChild  book={item}/>
                            </List.Item>
                        </Popover>)}}>

                </List>
                <BookIntroModal item={this.state.modalItem} onAddCart={this.handleAddCart} onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.modalVisible}/>
            </div>
        )
    }
}