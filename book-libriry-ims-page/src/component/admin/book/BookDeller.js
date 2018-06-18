import React from "react"
import {Input,Select,Button,Icon,Upload,Row,Col,List}from "antd"

const {Group,TextArea}=Input
const {Option}=Select

export default class BookDeller extends React.Component{

    state={
        book:{
            index:2,
            isbn:"5454874",
            img:"https://img3.doubanio.com/view/subject/m/public/s29754502.jpg",
            name:"那不勒斯的萤火",
            author:"[意]马西米利亚",
            price:45.00,
            publish:"后浪丨江西人民出版社",
            intro:[
                "大学刚毕业的热血青年张云松，怀着对事业的一腔热血，进入了一家广告公司工作。然而，从未接触过的领域、公司复杂的人际关系、微薄的薪水和生活的重压，一点点蚕食着他的少年意气，只有在出差前往小镇望花镇的时候，他才能收获一些难得的平静。\n",
                "望花镇离市区不远，全镇的支柱企业望花酒厂是张云松所在广告公司的大客户，半个镇子的人都在酒厂工作。在这里，张云松遇到了赵娟，一个曾经也怀有梦想，却无奈家庭压力不得不进入酒厂工作的女孩。赵娟的细心、温柔，让张云松对她多了一份情愫，而张云松所处的环境，也让赵娟再次燃起了对离开镇子、出去闯一闯的渴望。两个人走得越来越近，但现实的残酷，却一再打击着他们……"
            ],
            publicTime:"2008-05-8",
            states:[
                {bid:"121241",putTime:"2012-09-07",state:0,lenderId:"1548754",lenderTime:"2013-08-07",returnDate:"2013-07-06"},
                {bid:"121241",putTime:"2012-09-07",state:0,lenderId:"1548754",lenderTime:"2013-08-07",returnDate:"2013-07-06"},
                {bid:"121241",putTime:"2012-09-07",state:0,lenderId:"1548754",lenderTime:"2013-08-07",returnDate:"2013-07-06"},
                {bid:"121241",putTime:"2012-09-07",state:0,lenderId:"1548754",lenderTime:"2013-08-07",returnDate:"2013-07-06"},
            ]
        }
    }

    render(){
        const leftDiv=(<div>
            <div style={{marginLeft:"40px"}}>
                <Group compact>
                    <Select style={{width:"12%"}} defaultValue={"name"} >
                        <Option value={"name"}>书名</Option>
                        <Option value={"number"}>书号</Option>
                    </Select>
                    <Input style={{width:"50%"}} type={"primary"}/>
                    <Button type={"primary"}><Icon type={"search"}/>查找</Button>
                </Group>

                <div style={{marginTop:"20px"}}>
                    <span>*删除原因(200字内):</span><br/>
                    <TextArea style={{width:"75%",height:"200px",marginTop:"10px"}}/>
                </div>

                <div style={{marginTop:"20px",width:"75%"}}>
                    <span>*图片描述:</span>
                    <Upload name={"logo"} listType={"picture"} style={{marginLeft:"10px"}}>
                        <Button type={"primay"}><Icon type={"upload"}/>上传</Button>
                    </Upload>
                </div>

            </div >
        </div>)
        const rightDiv=(
            <div>
                <Row>
                    <Row><Col>
                        <div style={{float:"left"}}>
                            <img width={180} height={250} src={"/imgs/"+this.state.book.index+".jpg"}/>
                        </div>
                        <div style={{float:"left",marginLeft:"20px"}}>
                            <Row>
                                <Col > 书名：<span >{this.state.book.name}</span></Col>
                                <Col style={{marginTop:"10px"}} > 作者：<span >{this.state.book.author}</span></Col>
                                <Col style={{marginTop:"10px"}}> 价格：<span >{this.state.book.price}元</span></Col>
                                <Col style={{marginTop:"10px"}}> 出版社：<span >{this.state.book.publish}</span></Col>
                                <Col style={{marginTop:"10px"}}> 出版时间：<span >{this.state.book.publicTime}</span></Col>
                                <Col style={{marginTop:"10px"}}> isbn：<span >{this.state.book.isbn}</span></Col>
                                <Col style={{marginTop:"10px"}}> 馆藏：<span >{this.state.book.states.length}</span></Col>
                            </Row>
                        </div>
                    </Col></Row>

                    <Row style={{marginTop:"20px"}}><Col>
                        <span>图书简介:<br/></span>
                        <div style={{width:"600px"}}>
                            {this.state.book.intro.map(v=> {
                               return <div style={{textIndent:"30px"}}>{v}</div>
                            })}
                        </div>
                    </Col></Row>

                    <Row  style={{width:"800px",marginTop:"20px"}}>
                        <Col>

                            <span>库编号</span>
                            <span style={{marginLeft:"20px"}}>入库时间</span>
                            <span style={{marginLeft:"20px"}}>是否借出</span>
                            <span style={{marginLeft:"20px"}}>借阅者编号</span>
                            <span style={{marginLeft:"20px"}}>借出时间</span>
                            <span style={{marginLeft:"20px"}}>归还时间</span>
                            <span style={{marginLeft:"20px"}}>操作</span>


                            <List
                              itemLayout={"horizontal"}
                              dataSource={this.state.book.states}
                              renderItem={item=>{

                                  const row=[item.putTime,item.state==0?"借出":"在库",
                                      item.state==0?item.lenderId:"---",item.state==0?item.lenderTime:"---",
                                      item.state==0?item.returnDate:"---"]

                                  return(<List.Item>
                                      <span>{item.bid}</span>
                                      {row.map(v=>{
                                          return <span key={v} style={{marginLeft:"20px"}}>{v}</span>
                                      })}
                                      <a style={{marginLeft:"20px"}}>删除</a>
                                  </List.Item>)
                              }}
                            />
                        </Col>
                    </Row>
                </Row>
            </div>
        )

        return(
            <Row>
                <Col span={12}>
                    {leftDiv}
                </Col>
                <Col span={12}>
                    {rightDiv}
                </Col>
            </Row>
        )
    }

}