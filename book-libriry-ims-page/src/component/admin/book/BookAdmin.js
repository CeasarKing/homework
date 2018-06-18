import React from "react"
import {Table,Dropdown,Input,Button,Icon,Row,Col} from "antd"

const data=[
    {
        index: 1,
        isbn:"22352353",
        img: "https://img1.doubanio.com/view/subject/m/public/s29725877.jpg",
        name: "她不是我妈妈",
        author: "[法] 米歇尔·普西",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-05-01",
        returnDate: "2018-07-01",
        price: 20.1
    },
    {
        index: 2,
        isbn:"235235",
        img: "https://img3.doubanio.com/view/subject/m/public/s29754502.jpg",
        name: "那不勒斯的萤火",
        author: "[意]马西米利亚",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-01-04",
        returnDate: "2018-02-05",
        price: 25.1
    },
    {
        index: 3,
        isbn:"23534645",
        img: "https://img3.doubanio.com/view/subject/m/public/s29768630.jpg",
        name: "国家宝藏",
        author: "于蕾，吕逸涛",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-02-04",
        returnDate: "2018-05-07",
        price: 21.1
    },
    {
        index: 4,
        isbn:"13423",
        img: "https://img1.doubanio.com/view/subject/m/public/s29781198.jpg",
        name: "最后一公里的哲学",
        author: "张立民",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-01-04",
        returnDate: "2018-05-06",
        price: 26.1
    },
    {
        index: 5,
        isbn:"4567532",
        img: "https://img3.doubanio.com/view/subject/m/public/s29781195.jpg",
        name: "BBC全新4K海洋百科：蓝色星球",
        author: "[英]詹姆斯•",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-06-01",
        returnDate: "2018-09-21",
        price: 25.6
    },
    {
        index: 6,
        isbn:"2352342",
        img: "https://img1.doubanio.com/view/subject/m/public/s29757479.jpg",
        name: "神奇女侠",
        author: "[美] 威廉·莫尔顿·",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-01-01",
        returnDate: "2018-05-03",
        price: 22.5
    },
    {
        index: 7,
        isbn:"4575674",
        img: "https://img3.doubanio.com/view/subject/m/public/s29752394.jpg",
        name: "会赚钱的妈妈",
        author: "[美] 克丽丝特尔·",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-02-01",
        returnDate: "2018-05-07",
        price: 278.1
    },
    {
        index: 8,
        isbn:"1253252",
        img: "https://img3.doubanio.com/view/subject/m/public/s29776913.jpg",
        name: "莫斯科绅士",
        author: "[美]埃默·托尔斯",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-01-03",
        returnDate: "2018-05-06",
        price: 21.1
    },
    {
        index: 9,
        isbn:"1252323",
        img: "https://img3.doubanio.com/view/subject/m/public/s29770773.jpg",
        name: "风格感觉",
        author: "[美] 史蒂芬·平克",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-01-01",
        returnDate: "2018-05-02",
        price: 27.1
    },
    {
        index: 10,
        isbn:"112451",
        img: "https://img3.doubanio.com/view/subject/m/public/s29752085.jpg",
        name: "人类之子",
        author: "[英] P•D•詹姆斯",
        putDate:"2008-4-7",
        state:0,
        lenderId:"23545546",
        lendDate: "2018-06-01",
        returnDate: "2018-10-02",
        price: 29.1
    },
]

export default class BookAdmin extends React.Component{

    state={
        data:data,
        dataTemp:data,
        nameSearchText:"",
        authorInputText:"",
        nameInputVis:false,
        authorInputVis:false,
    };

    checkDateFormat=(dataStr)=>{

        let date = new Date(Date.parse(dataStr));

        if (date == "1970-01-01 08:00")
            return "--";
        else
            return date;
    };
    getThatTime=(dateTag)=>{
        let date=new Date()

        switch (dateTag){
            case "0":break;
            case "3":date.setDate(date.getDate()-1);break
            case "10":date.setDate(date.getDate()-10);break
            case "30":date.setDate(0);break
            case "90":date.setMonth(date.getMonth()-2);date.setDate(0);break
            case "365":date.setFullYear(date.getFullYear()-1);break
            case "3650":date.setFullYear(1975);break
        }

        date.setMinutes(0)
        date.setSeconds(0)
        date.setHours(0)

        return date
    }
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
        const temp = data.filter(val=> val.name==this.state.nameSearchText)
        this.setState({
            nameInputVis:false,
            dataTemp:temp
        })
    };

    onAuthorSearchSubmit=()=>{
        const temp=data.filter(val=> val.author==this.state.authorInputText)
        this.setState({
            authorInputVis:false,
            dataTemp:temp
        })
    };

    render(){

        const dropDownClass={
            padding: 8,
            borderRadius: 6,
            background: "#fff",
            boxShadow: "0 1px 6px rgba(0, 0, 0, .2)",
            width:300
        }

        const columns=[
            {
                title:"Id",
                dataIndex:"index",
                key:"id",
                sorter:(a,b)=>a.index-b.index
            },
            {
                title:"ISBN",
                dataIndex:"isbn",
                key:"isbn"
            },
            {
                title:"书名",
                dataIndex:"name",
                key:"key",
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
                sorter:(a,b)=>a.price-b.price
            },
            {
                title:"入库时间",
                dataIndex:"putDate",
                key:"pDate",
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
                render:(text=>(<span>{text===1?"在库":"借出"}</span>)),
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
                key:"lId"
            },
            {
                title:"借出时间",
                dataIndex:"lendDate",
                key:"lDate",
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
                }
            },
            {
                title:"操作",
                dataIndex:"action",
                key:"action",
                render:(item=>(<a>操作</a>))
            }
        ]

        return(
            <Table size={"small"} dataSource={this.state.dataTemp} columns={columns} />
        )
    }

}