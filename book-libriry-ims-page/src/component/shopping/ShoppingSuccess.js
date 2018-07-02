import React from "react"
import {Spin,Alert} from "antd"
import $ from "jquery"

export default  class ShoppingSuccess extends  React.Component{

    constructor(props){
        super();

        this.state = {
            msg:"生成中",
            desc:"你的订单正在生成，请稍等..."
        };

        const preState = props.location.state;

        const reactObj = this

        //将订单提交给服务器
        $.ajax({
            url:window.serverHost + "/order/submit",
            data:{
                order:JSON.stringify(preState.order)
            },
            method:"post",
            xhrFields:{
                withCredentials:true
            },
            success:function (resp) {
                if (resp){
                    reactObj.setState({
                        msg:"成功",
                        desc:"恭喜您，预定成功"
                    });
                }else {
                    reactObj.setState({
                        msg:"失败",
                        desc:"抱歉，出现位置的情况"
                    })
                }
                setTimeout(()=>{
                    window.location.href =  "http://localhost:3000/stu"
                },3000)
            }
        })
    }


    render(){
        return(<Spin tip={"正在生成订单..."}>
            <Alert
                message={this.state.msg}
                description={this.state.desc}
                type={"info"}
            ></Alert>
        </Spin>)
    }
};
