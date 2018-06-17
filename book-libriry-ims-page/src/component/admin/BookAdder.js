import React from "react"
import moment from 'moment';
import {Form,Select,Layout,Row,Col,Input,InputNumber,DatePicker,Button,Upload,Icon,notification} from "antd"


const {Content,Sider}=Layout
const {Item} =Form;
const {Option}=Select

class MyForm extends React.Component{

    state={

    };

    handleFormSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,vals)=>{
            if (!err){
                console.log("err:",vals)
            }
        })
    };

    handleModeSelectChange=(v,k)=>{
        console.log(v)
        console.log(k)
    };

    handleDatePicker=(v,k)=>{
        console.log(v)
        console.log(k)
    }

    onPriceChange=(v,k)=>{
        console.log(v)
        console.log(k)
    }


    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const { getFieldDecorator } = this.props.form;

        return<Form style={{width: "500px"}} onSubmit={this.handleFormSubmit}>
            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                label={"添加图书"}>

                <Select defaultValue={"k1"} size={"small"} style={{width: 120}}
                        onChange={this.handleModeSelectChange}>
                    <Option key={"k1"}>添加新图书</Option>
                    <Option key={"k2"}>添加已有图书</Option>
                </Select>
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                label={"ISBN"}
                hasFeedback
            >
                {getFieldDecorator("input1",{
                    rules:[
                        {required:true,message:"请录入书号"},
                        {max:20,message:"书名最多输入20个字符"}
                    ],
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"输入书号"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                label={"书名"}
                hasFeedback
            >
                {getFieldDecorator("input2",{
                    rules:[
                        {required:true,message:"请输入书名！"},
                        {max:20,message:"书名最多输入20个字符"}
                    ]
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"输入图书名字"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                label={"作者"}
                hasFeedback
            >
                {getFieldDecorator("input3",{
                    rules:[
                        {required:true,message:"请录入作者!"},
                        {max:50,message:"作者最多输入50个字符"}
                    ]
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"多个作者时使用 / 隔开"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"价格"}
            >
                {getFieldDecorator("input4",{
                    rules:[
                        {required:true,message:"请录入价格!"},
                     //   {min:0,message:"价格不可小于0"}
                    ]
                })(
                    <InputNumber onChange={this.onPriceChange}  precision={2} size={"small"}
                                 style={{width: 180}} placeholder={"输入价格"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"出版社"}
            >
                {getFieldDecorator("input5",{
                    rules:[
                        {max:50,message:"最大字符长度为50!"}
                    ]
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"输入出版社"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"出版时间"}
            >
                <DatePicker size={"small"} style={{width: 180}} onChange={this.handleDatePicker}
                            placeholder={"选择出版时间"} disabledDate={(current)=>  current && current> moment().endOf('day')}/>

            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"图书简介"}
            >
                {getFieldDecorator("ta1",{
                    rules:[
                        {max:500,message:"最长为500字"},
                    ]
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"输入图书简介"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"作者简介"}
            >
                {getFieldDecorator("ta2",{
                    rules:[
                        {max:500,message:"最长为500字"},
                    ]
                })(
                    <Input size={"small"} style={{width: 180}} placeholder={"输入作者简介"}/>
                )}
            </Item>

            <Item
                {...formItemLayout}
                labelCol={{span: 5}}
                hasFeedback
                label={"封面"}
            >

                <Upload name="logo" action="" listType="picture">
                    <Button>
                        <Icon type="upload"/> 上传
                    </Button>
                </Upload>

            </Item>

            <Item
                labelCol={{span: 5}}
                hasFeedback
            >
                <Button  style={{marginLeft: "80px"}} type="primary" >重置</Button>
                <Button  style={{marginLeft: "40px"}} type="primary" htmlType="submit">提交</Button>
            </Item>

        </Form>
    }
}

export default class BookAdder extends React.Component{

    state={
        adderCount:1
    };

    alertMessage=(msg,dsp)=>{
        notification.open({
            message:msg,
            description:dsp
        })
    }

    render(){
        const WrapperForm = Form.create()(MyForm);

        let ret=null;

        switch (this.state.adderCount){
            case 1:ret=<Row><Col offset={8}><WrapperForm/></Col></Row> ;break;
            case 2:ret=(<Row>
                <Col span={8} offset={2}><WrapperForm/></Col>
                <Col span={12}><WrapperForm/></Col></Row>);break;
            case 3:ret=(<Row>
                <Col span={8}><WrapperForm/></Col>
                <Col span={8}><WrapperForm/></Col>
                <Col span={8}><WrapperForm/></Col>
            </Row>);break;
            case 4:ret=(<Row>
                <Col span={6}><WrapperForm/></Col>
                <Col span={6}><WrapperForm/></Col>
                <Col span={6}><WrapperForm/></Col>
                <Col span={6}><WrapperForm/></Col>
            </Row>);break;
        }

        return <div>
            <Row>
                <Col span={2} >
                    <Button type={"primary"} onClick={()=>{
                        const adc=this.state.adderCount-1
                        if (adc>0){
                            this.setState({
                                adderCount:adc
                            },()=>{
                                console.log(this.state.adderCount)
                            })
                        }else {
                            this.alertMessage("不能再减少了！","不然，一个表单都没有你打开我干什么呢？")
                        }
                    }}><Icon type={"left"}/>减小表单</Button>
                </Col>
                <Col >
                    <Button type={"primary"} onClick={()=>{
                        const adc=this.state.adderCount+1
                        if (adc<5){
                            this.setState({
                                adderCount:adc
                            },()=>{
                                console.log(this.state.adderCount)
                            })
                        }else {
                            this.alertMessage("最多可以显示！","你看，屏幕只有这么大")
                        }
                    }}><Icon type={"right"}/>增加表单</Button>
                </Col>
            </Row><br/>

            {ret}


        </div>

    }
}