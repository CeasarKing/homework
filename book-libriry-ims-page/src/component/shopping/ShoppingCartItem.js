
import React from "react"
import {Collapse,Row,Col} from "antd"

const {Panel} = Collapse;

export default class ShoppingCartItem extends React.Component{

    state={

    };

    callback(key){
        console.log(key)
    }

    render(){

        const headerRow = <Row>
            <Col span={8}>书本信息</Col>
            <Col span={3}>单价</Col>
            <Col span={3}>租价</Col>
            <Col span={3}>租借时间</Col>
            <Col span={3}>预计归还时间</Col>
            <Col span={3}>预计花费</Col>
        </Row>;

        return(
            <Collapse style={{marginTop:"20px"}} defaultActiveKey={["1","0"]} onChange={this.callback}>
                <Panel header={headerRow}>
                    123456789
                </Panel>
            </Collapse>
        )
    }

}