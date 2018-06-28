import React from "react"

import {Modal,Button,Layout,Row,Col,Divider,Rate,Icon} from "antd"

const {Content,Sider,Footer} = Layout

export default class BookIntroModal extends React.Component{

    state={
        visible:this.props.visible,
        item:null,
        averageRank:0,
        allRanks:[]
    };

    componentWillReceiveProps(newProps){

        this.setState({
            visible:newProps.visible,
            item:newProps.item,
            allRanks:newProps.allRanks,
            averageRank:newProps.averageRank
        })

    }

    handleOk=()=>{
        console.log("ok");
        this.props.onOk()
    };

    handleCancel=()=>{
        console.log("cancel");
        this.props.onCancel()
    };

    render(){
        const item=this.state.item;

        console.log(item)

        if (item==null){
            return<div></div>
        } else {
            return(<Modal  width={600}
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                           visible={this.state.visible}
                           title={item!=null?item.bookName:"没有数据哦"}
                           footer={[
                               <Button key={"cancel"} type={"primary"} onClick={this.handleCancel}><a><Icon type={"shopping-cart"}/>加入购入车</a></Button>,
                               <Button key={"ok"} type={"primary"} onClick={this.handleOk}><a><Icon type="check-square-o" />直接购买</a></Button>]}>
                    <Layout>
                        <Layout  style={{background:"#fff"}}>
                            <Sider
                                style={{background:"#fff"}}
                                theme={"light"}>
                                <img
                                    height={330}
                                    width={200}
                                    alt={item.bookName}
                                    src={"http://localhost:8080/img/"+item.bId}/>
                            </Sider>

                            <Content
                                style={{background:"#fff",marginLeft:"20px"}}>
                                <Row>
                                    <Col><h3>书名:{item.bookName}</h3></Col>
                                    <Col><h3>作者:{item.author}</h3></Col>
                                    <Col><h3>出版社:{item.publicWork}</h3></Col>
                                    <Col><h3>出版时间:{item.publicTime}</h3></Col>
                                    <Col><h3>评分:{item.allRanks.map((val,index)=>(<div key={index}>
                                        <span>{index+1}星：<Rate value={index+1} disabled={true}/></span><span>{val+"%"}</span>
                                    </div>))}</h3></Col>
                                    <Col><h3>总评分：<span style={{fontSize:"20px"}}>{item.averageRank}</span>
                                        <span style={{marginLeft:"20px"}}><Icon type={"like"}/><Icon style={{marginLeft:"10px"}} type={"dislike"}/></span></h3></Col>
                                </Row>
                            </Content>
                        </Layout>

                        <Footer style={{background:"#fff"}}>
                            <Row>
                                <Divider />
                                <h2>内容简介:</h2><br/>
                                {item.bookIntro.map((val,index)=>(<Col key={"b"+index}><span style={{textIndent:"20px"}}>{val}</span></Col>))}
                            </Row>
                            <Row>
                                <Divider/>
                                <h2>作者简介:</h2><br/>
                                {item.authorIntro.map((val,index)=>(<Col key={"a"+index}><span style={{textIndent:"20px"}}>{val}</span></Col>))}
                            </Row>
                        </Footer>

                    </Layout>

                </Modal>
            )
        }
    }

}