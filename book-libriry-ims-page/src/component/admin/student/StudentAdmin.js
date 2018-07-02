import React from "react"

import {Table,Select,Input,Button,Icon,Row,Col,Tooltip,Dropdown,Menu}from "antd"
import AjaxUtils from "../../../utils/AjaxUtils";

const {Option}=Select;
const {Group}=Input;

export default class StudentAdmin extends React.Component{

    constructor(props){
        super();
        const data = AjaxUtils.getAllStudents();
        console.log(data);
        this.state = {
            data:data,
            dataTemp:data,
            nameInputVis:false,
            cardInputVis:false,
            nameInputText:"",
            cardInputText:"",

            nameSearchText:"查出包含输入的姓名",
        };
    }

    tableChange=()=>{

    };

    nameChange=(e)=>{
        this.setState({
            nameInputText:e.target.value
        })
    };

    nameSubmit=()=>{
        const temp = this.state.data.filter(item=>item.name == this.state.nameInputText);
        console.log(temp)
        this.setState({
            dataTemp:temp,
            nameInputVis:false
        })
    };

    cardChange=(e)=>{
        this.setState({
            cardInputText:e.target.value
        })
    };

    cardSubmit=()=>{
        const temp = this.state.data.filter(item=>item.card == this.state.cardInputText);
        this.setState({
            dataTemp:temp,
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

    handleClickAlert=(uid)=>{

    };

    handleClickCheck=(uid)=>{

    };

    handleClickDeleteUser=(uid)=>{
        const data = this.state.data;
        for (let i=0;i<data.length ;i++){
            if (data[i].id === uid){
                data.splice(i,1);
                this.setState({data:data});
                break
            }
        }
    };

    render(){

        if (this.state.dataTemp===undefined){
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
                            <Input value={this.state.cardInputText} size={"small"} style={{width:"150px"}}
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
                render: item => <span>{item === 0 ? "女" : "男"}</span>,
                filterMultiple:false,
                filters: [
                    {text: "男", value: 1},
                    {text: "女", value: 0}],
                onFilter: (item, record) => item === record.gender,
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
                    <Select defaultValue={item[0].bId}>
                        {
                            item.map((k,i)=>(
                                <Option key={k.bId} value={k.bId}>
                                    {k.bookName}(id:{k.bId})
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
                render:(item,record)=>(
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item><a target={"_blank"}
                                              onClick={this.handleClickAlert.bind(this,record.id)}>提醒还书</a></Menu.Item>
                                <Menu.Item><a target={"_blank"}
                                              onClick={this.handleClickCheck.bind(this,record.id)}>查看借阅</a></Menu.Item>
                                <Menu.Item><a target={"_blank"}
                                              onClick={this.handleClickDeleteUser.bind(this,record.id)}>删除用户</a></Menu.Item>
                            </Menu>}>
                            <a className={"ant-dropdown-link"}>
                                操作<Icon type={"down"}></Icon>
                            </a>
                        </Dropdown>
                    )
            }
        ];

        const tableTag=<Table dataSource={this.state.dataTemp} columns={columns}  size={"small"}  onChange={this.tableChange} />

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