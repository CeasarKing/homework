
import moment from 'moment';
import React from "react"
import {Collapse,Row,Col,List,Input,DatePicker,Button} from "antd"

const {Group}=Input

const {Panel} = Collapse;

export default class ShoppingCartItem extends React.Component{

    constructor(props){
        super();
        const prices = [];
        for (let i in props.books)
            prices.push(0)

        this.state={
            //要购买的书的信息
            books:props.books,
            //预计的书的列表
            prices:prices,
            //预计总计的金额
            totalPrices:0,
            //是否需要上门
            isInStrore:props.inStore,
            //备注的信息
            remarks:""
        };
    }

    componentWillReceiveProps(newProps){
        this.setState({isInStrore:newProps.inStore})
    }

    callback=(key)=>{
        console.log(key)
    };

    preShortIntro=()=>{
      const books = this.state.books;
      for (let i in books){
          const intros=books[i].intro;
          let intro = "";
          for (let j in intros){
              const int=intros[j];
              if (intro.length + int.length>50){
                  intro += int.substr(0,50-intro.length)+"...";
                  break
              } else {
                  intro += int;
              }
          }
          books[i].intro=intro
      }
    };

    handleRemarksInput = (e)=>{
        this.setState({
            remarks:e.target.value
        })
    };


    handleRetTimeChange=(index,key,val)=>{

        const dateTime = new Date().getTime();
        const retTime=Date.parse(val);

        let disDays = (retTime-dateTime)/(1000 * 60 * 60 * 24);

        if (disDays - parseInt(disDays)!==0){
            disDays = parseInt(disDays +1)
        }

        if (disDays > 0){

            //将字段放在books中!
            this.state.books[index].returnDate = val;

            const priceOneDay = this.state.books[index].price * 0.01;
            const prices=this.state.prices;

            const cost = priceOneDay * disDays;
            const disCost = cost - prices[index];
            const totalPrices = this.state.totalPrices + disCost;
            prices[index] = cost;

            this.setState({
                prices:prices,
                totalPrices:totalPrices
            })

        }else {
            console.log("没有改变")
        }
    };

    handleCartSubmit=()=>{
        //需要提交的字段：
        //租借人id
        //租借常用地址
        //被租借书封装 ->被借的额外信息
        //     id
        //     租借时间
        //     预计归还时间
        //     是否是上门订单
        //备注信息
        const nowDate = new Date().toLocaleDateString().replace("/","-").replace("/","-");
        const stateBooks = this.state.books;

        const submitBooks = [];
        for (let i in stateBooks){
            const book={};
            book.bId = stateBooks[i].bId;
            book.lendTime = nowDate;
            book.retTime = stateBooks[i].returnDate
            submitBooks.push(book)
        }

        console.log(submitBooks);

        const order={
            books:submitBooks,
            remarks:this.state.remarks,
            needVisit:this.state.isInStrore?0:1
        };

        console.log(order);

        this.props.onFormSubmit(order)
    };

    render(){

        this.preShortIntro();
        //图书列表的表单头
        const headerRow = (<Row>
            <Col span={8}>书本信息</Col>
            <Col span={3}>单价</Col>
            <Col span={3}>租价<span style={{color:"red",fontSize:10}}>(单价*0.01/天)</span></Col>
            <Col span={3}>租借时间</Col>
            <Col span={3}>预计归还时间</Col>
            <Col span={3}>预计花费</Col>
        </Row>);

        //购物车的脚标
        const footerRow = (<div style={{background:"#f9f9f9"}}>
            <Row style={{paddingTop:"20px",marginLeft:"10px"}}>
                <Col span={12}><Input onChange={this.handleRemarksInput} value={this.state.remarks}
                                      style={{width:300}} placeholder={"备注:(100字以内)"}/></Col>
                <Col span={4}>小计：{this.state.totalPrices.toFixed(2)}元</Col>
                <Col span={4}>人工费：{this.state.isInStrore ? 0:5}元</Col>
                <Col span={4}>总计：{(this.state.isInStrore ? this.state.totalPrices :
                    this.state.totalPrices + 5).toFixed(2)}元</Col>
            </Row>
            <div style={{paddingTop:"20px"}}></div>
        </div>);

        //页面的脚标
        const pageFooter=(
            <div style={{marginTop:"50px"}}>
                <Row type={"flex"} justify={"end"} align={"middle"}>
                    <Col span={3}><span style={{fontSize:"15px"}}>共计:{this.state.books.length}件商品</span></Col>
                    <Col span={3}><span style={{fontSize:"15px"}}>应付金额:
                        {(this.state.isInStrore ? this.state.totalPrices :
                            this.state.totalPrices + 5).toFixed(2)}元</span></Col>
                    <Col span={2}><Button type={"primary"}  size={"large"} onClick={this.handleCartSubmit}>提交订单</Button></Col>
                </Row>
            </div>
        );

        //书的简介
        const BookInfo = (props)=>(<div>
              <span>书名：{props.book.bookName}</span><br/>
              <span style={{fontSize:"12px",marginTop:10,color:"#b7b7b7"}}>{props.book.intro}</span>
            </div>);

        return(
            <div>
                <Collapse style={{marginTop:"20px"}}
                          defaultActiveKey={["0"]}
                          onChange={this.callback}>
                    <Panel header={headerRow} disabled={true}>
                        <List
                            itemLayout={"vertical"}
                            size={"small"}
                            dataSource={this.state.books}
                            renderItem={(item,index)=>(
                                <List.Item style={{marginLeft:"20px"}}>
                                    <Row type={"flex"} align={"middle"}>
                                        <Col span={3}>
                                            <img src={"http://localhost:8080/img/"+item.bId} height={120} width={100}/>
                                        </Col>
                                        <Col span={4}>
                                            <BookInfo book={item}/>
                                        </Col>
                                        <Col span={3} offset={1}>{item.price}元</Col>
                                        <Col span={3} style={{marginLeft:"10px"}}>{(item.price * 0.01).toFixed(2)}元/天</Col>
                                        <Col span={3}>{new Date().toLocaleDateString()}</Col>
                                        <Col span={3}><DatePicker size={"small"}
                                                                  placeholder={new Date().toLocaleDateString()}
                                                                  style={{width:"100px"}}
                                                                  onChange={this.handleRetTimeChange.bind(this,index)}
                                                                  disabledDate={(cuurrent)=>{
                                                                      return cuurrent && cuurrent < moment().endOf("day")
                                                                  }}
                                        /></Col>
                                        <Col span={3}>{this.state.prices[index].toFixed(2)}元</Col>
                                    </Row>
                                </List.Item>)
                            }
                        /></Panel>
                    <Panel header={<span style={{fontSize:15}}>优惠券
                    <span style={{color:"#b7b7b7",marginLeft:10,fontSize:10}}>暂无优惠券
                    </span></span>}>
                    </Panel>
                </Collapse>
                {footerRow}
                {pageFooter}
            </div>
        )
    }

}