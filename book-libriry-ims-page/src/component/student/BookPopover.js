import React from "react"

import {Card,Row,Col,Icon} from "antd"

class BookPopover extends React.Component{

    state={
        popoverCount:0
    };

    componentDidMount(){
        const count=this.state.popoverCount
        let cover = document.getElementsByName("cover")

        if (cover.length > count){

            const len = cover.length;
            const el = cover[len-1]
            const height = el.offsetHeight-40

            console.log(el.offsetHeight)

            el.setAttribute("style","height:"+height+"px")
            this.setState({
                popoverCount:count+1
            })
        }
    }

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
                          <Col style={{marginTop:"10px",fontSize:"10px"}}>{book.intro}</Col>
                      </Row>

                  </div>}>
            </Card>
        )
    }
};

export default BookPopover