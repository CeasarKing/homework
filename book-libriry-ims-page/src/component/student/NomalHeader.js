import React from "react"
import {Menu,Icon,Badge}from "antd"

const {SubMenu,ItemGroup,Item}=Menu

export default class StudentHome extends React.Component {

    state = {
        currKey: "store",
        headerWidth: 0,
        headerWidthPercent: 70,
        badgeCount:0,
    };

    handleHeaderClick = (e) => {
        this.setState({
            currKey: e.key
        })

    };

    componentWillMount (){
        const scrWi = window.screen.availWidth;
        const headerWi = scrWi * this.state.headerWidthPercent / 100;

        this.setState({
            headerWidth: headerWi
        });

        if (this.props.gethw!==undefined){
            const marginLeft = (100 - this.state.headerWidthPercent) / 2 + "%";
            this.props.gethw(headerWi,marginLeft)
        }

    };

    componentWillReceiveProps(nextProps){
        this.setState({
            badgeCount:nextProps.count
        })
    }

    render() {

        const headerStyle = this.props===undefined?{
            width: this.state.headerWidth,
            marginLeft: (100 - this.state.headerWidthPercent) / 2 + "%",
            position:"relative"
        }:{};

        const NormalHeader = () => {

            const user = this.props.user;

            return (
                <div style={headerStyle}>

                    <Menu
                        onClick={this.handleHeaderClick}
                        selectedKeys={[this.state.currKey]}
                        mode={"horizontal"}>

                        <Item key={"store"}>
                            <Icon type={"book"}/>藏书
                        </Item>


                        <Item key={"history"}>
                            <Icon type="eye"/> 借阅历史
                        </Item>

                        <SubMenu key={"rank"} title={<span><Icon type="line-chart"/> 借阅排行</span>}>
                            <ItemGroup key={"r1"} title={"文学"}>
                                <Item key={"chi"}>中国文学</Item>
                                <Item key={"wst"}>西方文学</Item>
                                <Item key={"est"}>东方文学</Item>
                            </ItemGroup>
                            <ItemGroup key={"r2"} title={"小说"}>
                                <Item key={"chi"}>社会小说</Item>
                                <Item key={"wst"}>批判小说</Item>
                                <Item key={"est"}>幻想小说</Item>
                            </ItemGroup>
                            <ItemGroup key={"r3"} title={"社科"}>
                                <Item key={"phil"}>哲学</Item>
                                <Item key={"econ"}>经济</Item>
                                <Item key={"hist"}>历史</Item>
                            </ItemGroup>
                        </SubMenu>

                        <Item key={"recommend"}>
                            <Icon type="message"/> 书友推荐
                        </Item>

                        <Menu.Item key={"user"} style={{float: 'right'}}>
                            <Icon type={"user"}/>{user!=null&&user!=undefined ? user.name:"个人中心"}
                        </Menu.Item>

                        <Menu.Item key={"shopping"} style={{float: 'right'}}>
                            <Icon type={"shopping-cart"}/>书篮
                            <Badge count={this.state.badgeCount}  overflowCount={99}/>
                        </Menu.Item>

                    </Menu><br/>

                    {this.props.children}

                </div>
            )
        };

        return (
            <NormalHeader/>
        )
    }

}