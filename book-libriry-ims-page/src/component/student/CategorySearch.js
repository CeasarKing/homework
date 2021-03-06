import React from "react"
import {Collapse,List}from "antd"

const {Panel}=Collapse

export default class CategorySearch extends React.Component{

    state={
        show:true,
        cateData:[
            {
                name:"类型",
                data:["现代文学","古典文学","自然科学","社科","推理","奇幻","报刊杂志","其他"]
            },
            {
                name:"出版年份",
                data:["2018","2017","2016","2015","2014","2013","2012","2011","2010","更早"]
            },
            {
                name:"出版社",
                data:["上海人民出版社","人民文学出版社","清华出版社","机械工业出版社","电子工业出版社","其他"]
            },
            {
                name:"产地",
                data:["中国","美国","日本","英国","其他"]
            },
        ],

    };

    handleOnChange=()=>{
        const show=this.state.show;
        this.setState({
            show:!show
        },()=>{
            if (!show){
                this.props.onList(200)
            } else {
                this.props.onList(0)
            }
        });
    };

    handleOnItemClick=(type,val)=>{
        switch (type){
            case "类型":type="category";break
            case "出版年份":type="publishTime";break
            case "出版社":type="publishWork";break
            case "产地":type="publishLocal";break
            default:return
        }
        let jsonStr="{"+type+":"+val+"}";
        this.props.onClickItem(jsonStr)
    };

    render(){

        return(<Collapse
            onChange={this.handleOnChange}
            defaultActiveKey={"1"}
            bordered={false}>
            <Panel header={<a>{this.state.show?"收起分类":"显示分类"}</a>} key={"1"}>
                <List
                    split={false}
                    itemLayout={"horizontal"}
                    dataSource={this.state.cateData}
                    renderItem={(key) => {
                        return (
                            <List.Item>{key.name}：
                                <List
                                    split={false}
                                    style={{marginLeft:"10px"}}
                                    itemLayout={"vertical"}
                                    dataSource={key.data}
                                    grid={{gutter:16}}
                                    renderItem={
                                        item=>(
                                            <a onClick={this.handleOnItemClick.bind(this,key.name,item)}>{item}</a>
                                        )
                                    }
                                  />
                            </List.Item>
                        )}
                    }
                />
            </Panel>
        </Collapse>)
    }

}