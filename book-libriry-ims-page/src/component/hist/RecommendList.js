import React from "react"

import {List} from "antd"
import BookChild from "../student/BookChild";

export default class RecommendList extends React.Component{
    state={
        data:[
            {
                index: 1,
                img: "https://img1.doubanio.com/view/subject/m/public/s29725877.jpg",
                name: "她不是我妈妈",
                author: "[法] 米歇尔·普西",
                lendDate: "2018-5-1",
                returnDate: "2018-7-1",
                price: 20.1
            },
            {
                index: 2,
                img: "https://img3.doubanio.com/view/subject/m/public/s29754502.jpg",
                name: "那不勒斯的萤火",
                author: "[意]马西米利亚",

                lendDate: "2018-1-4",
                returnDate: "2018-2-5",
                price: 25.1
            },
            {
                index: 3,
                img: "https://img3.doubanio.com/view/subject/m/public/s29768630.jpg",
                name: "国家宝藏",
                author: "于蕾，吕逸涛",

                lendDate: "2018-2-4",
                returnDate: "2018-5-7",
                price: 21.1
            }
        ]
    };

    render(){
        return(
            <List
                style={{marginLeft:"20px",marginTop:"50px"}}
                split={false}
                itemLayout={"vertical"}
                dataSource={this.state.data}
                renderItem={item=>(<BookChild book={item}/>)}
                footer={<a href={"#"}>查看更多</a>}
            />
        )
    }
}