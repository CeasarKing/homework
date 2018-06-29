import React from "react"

import $ from "jquery"
import {Card,Row,Col,Icon} from "antd"

class BookPopover extends React.Component{

    constructor(props){
        super();
        const intro = this.preGetBookIntro("book",props.book.index);
        const realIntro=[]
        let count=0

        console.log(intro)

        for (let i in intro){
            let len = intro[i].length;
            if (len+count<150){
                count+=len;
                realIntro.push(intro[i])
            } else {
                const subLen = count>100?50 : 150-count
                const str = intro[i].substr(0,subLen)+"....."
                realIntro.push(str)
                break
            }
        }
        this.state={
            popoverCount:0,
            bookIntro:realIntro
        };
    }

    componentDidMount(){
        this.doEachElementButNotReuse()
    }

    //每次的加载时会先得到简介的字符
    preGetBookIntro=(type,bid)=>{
        let respObj=null;
        $.ajax({
            url:"http://192.168.1.101:8080/intros",
            data:{
                type:type,
                bid:bid
            },
            xhrFields:{
                withCredentials:true
            },
            async:false,
            success:(resp)=>{
                respObj=JSON.parse(resp)
            }
        });
        return respObj
    };

    //每一次弹出都会生成一个新的popover
    doEachElementButNotReuse=()=>{
        const count=this.state.popoverCount;
        let cover = document.getElementsByName("cover");

        if (cover.length > count){

            const len = cover.length;
            const el = cover[len-1];
            const height = el.offsetHeight-40;

            el.setAttribute("style","height:"+height+"px");
            this.setState({
                popoverCount:count+1
            })
        }
    };

    render(){
        const book=this.props.book;
        return(
            <Card id={"card"}
                  bordered={false}
                  style={{width:300}}
                  cover={<div name="cover">
                      <Row>
                          <Col><span style={{fontWeight:"bold"}}>{book.name}</span></Col>
                          <Col style={{marginTop:"10px",fontSize:"10px",color:"#c1bfbb"}}>{book.author}/{book.publishTime===undefined?"":book.publishTime+"/"}
                              {book.publish===undefined?"":book.publish+"/"}</Col>
                          <Col style={{marginTop:"10px",fontSize:"10px"}}><Row>
                              {this.state.bookIntro.map((intro,index)=>(<Col key={index}>
                                  {intro}
                              </Col>))}
                          </Row></Col>
                      </Row>

                  </div>}>
            </Card>
        )
    }
};

export default BookPopover