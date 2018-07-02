import React from "react"
import {Table,Dropdown,Input,Button,Icon,Row,Col,Menu,Form,InputNumber,Popconfirm} from "antd"

import AjaxUtils from "../../../utils/AjaxUtils"

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default class BookAdmin extends React.Component{

    constructor(props){
        super();

        const books = this.preGetBooks();
        this.state={
            data:books,
            dataTemp:books,
            nameSearchText:"",
            authorInputText:"",
            nameInputVis:false,
            authorInputVis:false,
            editingKey:""
        }
    }

    //第一次默认的图书的加载
    preGetBooks=()=>{
        return AjaxUtils.getAllLendBooks()
    };

    checkDateFormat=(dataStr)=>{

        let date = new Date(Date.parse(dataStr));

        if (date == "1970-01-01 08:00")
            return "--";
        else
            return date;
    };
    getThatTime=(dateTag)=>{
        let date=new Date();

        switch (dateTag){
            case "0":break;
            case "3":date.setDate(date.getDate()-1);break;
            case "10":date.setDate(date.getDate()-10);break;
            case "30":date.setDate(0);break;
            case "90":date.setMonth(date.getMonth()-2);date.setDate(0);break;
            case "365":date.setFullYear(date.getFullYear()-1);break;
            case "3650":date.setFullYear(1975);break
        }

        date.setMinutes(0);
        date.setSeconds(0);
        date.setHours(0);

        return date
    };
    timeFilters=[
        {text:"今天",value:0},
        {text:"三天内",value:3},
        {text:"十天内",value:10},
        {text:"一个月",value:30},
        {text:"三个月内",value:90},
        {text:"一年之内",value:365},
        {text:"更早之前",value:3650}
    ];

    onNameSearchChange=(e)=>{
        this.setState({
           nameSearchText:e.target.value
        })
    };

    onAuthorSearchChange=(e)=>{
        this.setState({
            authorInputText:e.target.value
        })
    };

    onNameSearchSubmit=()=>{
        const temp = this.state.data.filter(val=> val.name==this.state.nameSearchText)
        this.setState({
            nameInputVis:false,
            dataTemp:temp
        })
    };

    onAuthorSearchSubmit=()=>{
        const temp=this.state.data.filter(val=> val.author==this.state.authorInputText)
        this.setState({
            authorInputVis:false,
            dataTemp:temp
        })
    };

    //修改时保存一条记录
    onModifySave=(form,key)=>{
        form.validateFields((error,row)=>{
            if (!error){
                const newData=[...this.state.dataTemp];
                const index = newData.findIndex(item=>item.index===key);

                if (index>-1){
                    row.img=newData[index].img;
                    newData[index]=row;
                    this.setState({
                        editingKey:"",
                        dataTemp:newData
                    })
                }
            }
        })
    };

    //删除一个元素
    onDelete=(bid)=>{
        const newDate = [...this.state.dataTemp]
        for (let i=0;i<newDate.length;i++){
            if (newDate[i].index === bid){
                newDate.splice(i,1);
                this.setState({dataTemp:newDate})
                break
            }
        }
    };

    render(){

        const dropDownClass={
            padding: 8,
            borderRadius: 6,
            background: "#fff",
            boxShadow: "0 1px 6px rgba(0, 0, 0, .2)",
            width:300
        };

        let columns=[
            {
                title:"Id",
                dataIndex:"index",
                key:"id",
                editable:true,
                sorter:(a,b)=>a.index-b.index,
            },
            {
                title:"ISBN",
                dataIndex:"isbn",
                editable:true,
                key:"isbn"
            },
            {
                title:"书名",
                dataIndex:"name",
                key:"key",
                editable:true,
                filterDropdown:(
                    <div style={dropDownClass}>
                        <Row>
                            <Col span={18}>
                                <Input
                                    ref={r=>this.nameInput = r}
                                    value={this.state.nameSearchText}
                                    placeholder={"输入书名"}
                                    onChange={this.onNameSearchChange}
                                    onPressEnter={this.onNameSearchSubmit}
                                />
                            </Col>
                            <Col>
                                <Button type={"primary"} onClick={this.onNameSearchSubmit}>确定</Button>
                            </Col>
                        </Row>
                    </div>
                ),
                filterIcon:<Icon type={"search"}></Icon>,
                filterDropdownVisible:this.state.nameInputVis,
                onFilterDropdownVisibleChange:(vis)=>{
                    this.setState({
                        nameInputVis:vis
                    },()=>{
                        if (this.nameInput && vis)
                            this.nameInput.focus()
                    })
                },
            },
            {
                title:"作者",
                dataIndex:"author",
                key:"author",
                editable:true,
                filterDropdown:(
                    <div style={dropDownClass}>
                        <Row>
                            <Col span={18}>
                                <Input
                                    ref={r=>this.authorInput = r}
                                    value={this.state.authorInputText}
                                    placeholder={"输入作者"}
                                    onChange={this.onAuthorSearchChange}
                                    onPressEnter={this.onAuthorSearchSubmit}
                                />
                            </Col>
                            <Col>
                                <Button type={"primary"} onClick={this.onAuthorSearchSubmit}>确定</Button>
                            </Col>
                        </Row>
                    </div>
                ),
                filterIcon:<Icon type={"search"}></Icon>,
                filterDropdownVisible:this.state.authorInputVis,
                onFilterDropdownVisibleChange:(vis)=>{
                    this.setState({
                        authorInputVis:vis
                    },()=>{
                        if (this.authorInput && vis)
                            this.authorInput.focus()
                    })
                }
            },
            {
                title:"价格",
                dataIndex:"price",
                key:"price",
                editable:true,
                sorter:(a,b)=>a.price-b.price
            },
            {
                title:"入库时间",
                dataIndex:"putDate",
                key:"pDate",
                editable:true,
                sorter:(a,b)=>{
                    const da=this.checkDateFormat(a.putDate)
                    const db=this.checkDateFormat(b.putDate)
                    return da-db
                },

                filterMultiple:false,
                filters:this.timeFilters,
                onFilter:(value,record)=>{
                    let putTime = this.checkDateFormat(record.putDate);
                    let thatTime = this.getThatTime(value);
                    return putTime-thatTime>0
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                key:"state",
                editable:true,
                render:(text=>(<span>{text==1?"在库":"借出"}</span>)),
                filterMultiple:false,
                filters:[
                    {text:"已借出",value:0},
                    {text:"在库",value:1},
                ],
                onFilter:(value,record)=>{return record.state==value}
            },
            {
                title:"借出人id",
                dataIndex:"lenderId",
                key:"lId",
                editable:true,
                render:(text)=>(text===-1?"":text)
            },
            {
                title:"借出时间",
                dataIndex:"lendDate",
                key:"lDate",
                editable:true,
                sorter:(a,b)=>{
                    const da=this.checkDateFormat(a.lendDate)
                    const db=this.checkDateFormat(b.lendDate)
                    return da-db
                },

                filterMultiple:false,
                filters:this.timeFilters,
                onFilter:(value,record)=>{
                    let putTime = this.checkDateFormat(record.lendDate);
                    let thatTime = this.getThatTime(value);
                    return putTime-thatTime>0
                }
            },
            {
                title:"归还时间",
                dataIndex:"returnDate",
                key:"rDate",
                editable:true,
                sorter:(a,b)=>{
                    const da=this.checkDateFormat(a.returnDate)
                    const db=this.checkDateFormat(b.returnDate)
                    return da-db
                },
                filterMultiple:false,
                filters:this.timeFilters,
                onFilter:(value,record)=>{
                    let putTime = this.checkDateFormat(record.returnDate);
                    let thatTime = this.getThatTime(value);
                    return putTime-thatTime>0
                },
                render:(text)=>text=="null"?"":text
            },
            {
                title:"操作",
                dataIndex:"action",
                key:"action",
                editable:false,
                render:(text,record)=>{
                    const preClick = <Dropdown overlay={
                        <Menu>
                            <Menu.Item><a target={"_blank"} onClick={()=> {this.setState({editingKey:record.index})}}>
                                编辑</a></Menu.Item>
                            <Menu.Item><a target={"_blank"}
                                          onClick={this.onDelete.bind(this,record.index)}>删除</a></Menu.Item>
                        </Menu>}>
                        <a className={"ant-dropdown-link"}>
                            操作<Icon type={"down"}></Icon>
                        </a>
                    </Dropdown>;

                    const afterClick = <span>
                                <EditableContext.Consumer>
                                    {form=>(
                                        <a onClick={()=>this.onModifySave(form,record.index)}>确定</a>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm
                                    title={"你确定要取消?"}
                                    onConfirm={()=>this.setState({editingKey:""})}
                                >
                                    <a>取消</a>
                                </Popconfirm>
                            </span>

                    return <div>
                        {record.index!==this.state.editingKey?preClick:afterClick}
                    </div>
                }
            }
        ];

        const components={
            body:{
                row:EditableFormRow,
                cell:EditableCell
            }
        };

        columns = columns.map((col)=>{
            if (!col.editable){
                return col
            }
            return {
                ...col,
                onCell:record=>{
                    return{
                        record,
                        inputType:"text",
                        dataIndex:col.dataIndex,
                        title:col.title,
                        editing: record.index===this.state.editingKey
                    }
                }
            }
        });

        return(
            <Table components={components}
                   size={"small"}
                   dataSource={this.state.dataTemp}
                   columns={columns} />
        )
    }

}