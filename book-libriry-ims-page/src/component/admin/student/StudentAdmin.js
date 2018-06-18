import React from "react"

import {Table,Select,Input,Button,Icon,Row,Col,Tooltip}from "antd"

const {Option}=Select;
const {Group}=Input

export default class StudentAdmin extends React.Component{

    state={
        data:[
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"2352342",name:"神奇女侠"},{id:"4575674",name:"会赚钱的妈妈"}]},
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"2352342",name:"神奇女侠"},{id:"4575674",name:"会赚钱的妈妈"}]},
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"2352342",name:"神奇女侠"},{id:"4575674",name:"会赚钱的妈妈"}]},
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"1253252",name:"莫斯科绅士"},{id:"4575674",name:"会赚钱的妈妈"}]},
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"1253252",name:"莫斯科绅士"},{id:"4575674",name:"会赚钱的妈妈"}]},
            {id:"12457854",name:"张三",card:"5116021962685871",age:12,gender:1,maxLend:5,hasGet:[{id:"1253252",name:"莫斯科绅士"},{id:"4575674",name:"会赚钱的妈妈"}]},
        ],
        dataTemp:undefined,
        nameInputVis:false,
        cardInputVis:false,
        nameInputText:"",
        cardInputText:"",

        nameSearchText:"查出包含输入的姓名",
    };

    tableChange=()=>{

    };

    nameChange=(e)=>{
        this.setState({
            nameInputText:e.target.value
        })
    };

    nameSubmit=()=>{
        console.log(this.state.nameInputText)
        this.setState({
            nameInputVis:false
        })
    };

    cardChange=(e)=>{
        this.setState({
            cardInputText:e.target.value
        })
    };

    cardSubmit=()=>{
        console.log(this.state.cardInputText)
        this.setState({
            cardInputVis:false
        })
    };

    handleSearchSelectChange=(e)=>{
        if (e=="uname"){
            this.setState({
                nameSearchText:"查出包含输入的姓名"
            })
        }else if (e=="bname"){
            this.setState({
                nameSearchText:"查出借过输入书名的同学"
            })
        }
    };


    render(){

        if (this.state.dataTemp==undefined){
            const data=this.state.data;
            this.setState({
                dataTemp:data
            })
        }

        const columns=[
            {
                key:"id",
                title:"id",
                dataIndex:"id",
                sorter:(a,b)=>a-b
            },
            {
                key:"name",
                title:"姓名",
                dataIndex:"name",
                filterDropdown:(
                  <div style={{width:"200px"}}>
                      <Tooltip placement={"bottom"} title={"尽可能查出更精确的结果"}>
                          <Input value={this.state.nameInputText} size={"small"} style={{width:"150px"}}
                                 placeholder={"输入姓名"} onChange={this.nameChange} onPressEnter={this.nameSubmit}/>
                      </Tooltip>
                      <Button type={"primary"}  size={"small"} onClick={this.nameSubmit}>查找</Button>
                  </div>
                ),
                filterIcon:<Icon type={"search"}></Icon>,
                filterDropdownVisible:this.state.nameInputVis,
                onFilterDropdownVisibleChange:(vis)=>{
                    this.setState({
                        nameInputVis:vis
                    })
                }
            },
            {
                key:"card",
                dataIndex:"card",
                title:"身份证号码",
                filterDropdown:(
                    <div style={{width:"200px"}}>
                        <Tooltip placement={"bottom"} title={"尽可能查出更精确的结果"}>
                            <Input value={this.state.nameInputText} size={"small"} style={{width:"150px"}}
                                   placeholder="输入身份证号" onChange={this.cardChange} onPressEnter={this.cardSubmit}/>
                        </Tooltip>
                        <Button type={"primary"}  size={"small"} onClick={this.cardSubmit}>查找</Button>
                    </div>
                ),
                filterIcon:<Icon type={"search"}></Icon>,
                filterDropdownVisible:this.state.cardInputVis,
                onFilterDropdownVisibleChange:(vis)=>{
                    this.setState({
                        cardInputVis:vis
                    })
                }
            },
            {
                key:"age",
                dataIndex:"age",
                title:"年龄",
                sorter:(a,b)=>a-b
            },
            {
                key: "gender",
                dataIndex: "gender",
                title: "性别",
                render: item => <span>{item == 0 ? "女" : "男"}</span>,
                filterMultiple:false,
                filters: [
                    {text: "男", value: 1},
                    {text: "女", value: 0}],
                onFilter: (item, record) => item == record.gender,
            },
            {
                key:"maxLend",
                dataIndex:"maxLend",
                title:"最大借阅量"
            },
            {
                key:"hasGet",
                dataIndex:"hasGet",
                title:"已经借阅的",
                render:item=>(
                    <Select defaultValue={item[0].id}>
                        {
                            item.map((k,i)=>(
                                <Option key={k.id} value={k.id}>
                                    {k.name}(id:{k.id})
                                </Option>
                            ))
                        }
                    </Select>
                )
            },
            {
                key:"action",
                dataIndex:"action",
                title:"操作",
                render:item=>(
                    <Select style={{width:"80px"}} defaultValue={"操作"}>
                        <Option value={"alert"}>
                            提醒还书
                        </Option>
                        <Option value={"peek"}>
                            查看记录
                        </Option>
                    </Select>
                )
            }
        ];

        const tableTag=<Table dataSource={this.state.data} columns={columns}  size={"small"}  onChange={this.tableChange} />

        const inputTag=<Row>
                <Col>
                    <Group compact>
                        <Select style={{width:"5%"}} size={"small"} defaultValue={"uname"} onChange={this.handleSearchSelectChange}>
                            <Option value={"uname"}>
                                姓名
                            </Option>
                            <Option value={"bname"}>
                                书名
                            </Option>
                        </Select>
                        <Tooltip placement={"bottom"} title={"尽可能查出更多的结果"}>
                            <Input style={{width:"15%"}} size={"small"} placeholder={this.state.nameSearchText}/>
                        </Tooltip>

                        <Button type={"primary"}  size={"small"}>查找</Button>

                    </Group>
                </Col>
            </Row>

        return <div>
            {inputTag}<br/>
            {tableTag}
        </div>
    }

}