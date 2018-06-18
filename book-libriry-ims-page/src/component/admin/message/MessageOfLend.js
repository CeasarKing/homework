import React from "react"
import {Card,List,Row,Col,Select,Icon} from "antd"

export default class MessageOfLend extends React.Component{

    state={
        data:[
            {id:1,sname:"lin",over:182,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:2,sname:"lin",over:12,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:3,sname:"lin",over:341,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:4,sname:"lin",over:243,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:5,sname:"lin",over:8,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:6,sname:"lin",over:9,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
            {id:7,sname:"lin",over:10,lendeds:[{bid:"1248724",name:"haha"},{bid:"4568456",name:"hehe"}],
                requests:[{bid:"12423523",name:"hello"},{bid:"12414235",name:"wode"}]},
        ]
    };

    render(){
        return(<div>
            <List
                grid={{gutter:100,column:4}}
                dataSource={this.state.data}
                renderItem={item=>(
                    <List.Item>
                        <Card title={<span>用户名:{item.sname}</span>}
                              actions={[<a><Icon type={"check"}/>确认</a>,<a><Icon type={"close"}/>拒绝</a>]}
                        >
                            <Row>
                                <Col>已借：<Select  size={"small"} defaultValue={item.lendeds[0].name}>
                                    {item.lendeds.map(v=>(
                                        <Select.Option value={v.name}>
                                        {v.name}({v.bid})
                                    </Select.Option>))}
                                </Select></Col>
                                <Col>
                                    请求：<Select  size={"small"} defaultValue={item.requests[0].name}>
                                    {item.requests.map(v=>(
                                        <Select.Option value={v.name}>
                                            {v.name}({v.bid})
                                        </Select.Option>))}
                                </Select></Col>
                                <Col>
                                    余额：{item.over} {item.over<=10?<span style={{color:"red",fontSize:"10px"}}>提醒用户充值了</span>:""}
                                </Col>
                                <Col>
                                    每日：{item.requests.length*0.1}元
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </div>)
    }
}