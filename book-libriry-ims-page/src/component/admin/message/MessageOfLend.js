import React from "react"
import {Card,List,Row,Col,Select,Icon} from "antd"
import AjaxUtils from "../../../utils/AjaxUtils";

export default class MessageOfLend extends React.Component{

    constructor(props){
        super();
        const data = this.prepareData();
        this.state={
            data:data
        }
    }

    prepareData = ()=>{

        const messages = AjaxUtils.getAllLendMessage();

        const orders = messages.orders;
        const students = messages.students;

        const data=[];

        for (let i=0; i<orders.length;i++){
            const order = orders[i];
            const student = students[i];

            const lendeds = [];
            const hasBooks = student.hasBooks;
            for (let i =0 ;i<hasBooks.length ;i++){
                lendeds.push({bid:hasBooks[i].bid,name:hasBooks[i].bookName})
            }

            const requests = [];
            const requestBooks = order.books;

            let prices = 0;
            for (let i=0;i<requestBooks.length;i++){
                requests.push({bid:requestBooks[i].bId , name:requestBooks[i].bookName});
                prices += parseFloat(requestBooks[i].price)
            }

            data.push({
                id:order.orderId,
                sname:student.name,
                over:120,
                lendeds:lendeds,
                requests:requests,
                oneDayOfPirces:(prices/(requestBooks.length*100)).toFixed(2)
            })

        }
        return data
    };

    deleteMessageById = (oid)=>{
      const data=this.state.data;
      for (let i=0;i<data.length;i++){
          if (data[i].id === oid){
              data.splice(i,1);
              this.setState({data:data});
              break
          }
      }
    };

    handleOk = (oid)=>{
        console.log(this.state.data);
        console.log(oid);
        this.deleteMessageById(oid)
    };

    handleNo = (oid)=>{
        console.log(this.state.data);
        console.log(oid);
        this.deleteMessageById(oid)
    };

    render(){
        return(<div>
            <List
                grid={{gutter:100,column:4}}
                dataSource={this.state.data}
                renderItem={item=>(
                    <List.Item>
                        <Card title={<span>用户名:{item.sname}</span>}
                              actions={
                                  [<a onClick={this.handleOk.bind(this,item.id)}><Icon type={"check"}/>确认</a>,
                                      <a onClick={this.handleNo.bind(this,item.id)}><Icon type={"close"}/>拒绝</a>]}
                        >
                            <Row>
                                <Col>已借：<Select  size={"small"}
                                                   defaultValue={item.lendeds[0].name} style={{width:"200px"}}
                                >
                                    {item.lendeds.map(v=>(
                                        <Select.Option value={v.name}>
                                        {v.name}({v.bid})
                                    </Select.Option>))}
                                </Select></Col>
                                <Col>
                                    请求：<Select  size={"small"} defaultValue={"请求的书条目"} style={{width:"200px"}}>
                                    {item.requests.map(v=>(
                                        <Select.Option value={v.name}>
                                            {v.name}({v.bid})
                                        </Select.Option>))}
                                </Select></Col>
                                <Col>
                                    余额：{item.over} {item.over<=10?<span style={{color:"red",fontSize:"10px"}}>提醒用户充值了</span>:""}
                                </Col>
                                <Col>
                                    每日：{item.oneDayOfPirces}元
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </div>)
    }
}