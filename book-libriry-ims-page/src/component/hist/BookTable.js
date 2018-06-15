import React from "react"
import NormalHeader from "../student/NomalHeader"
import {Layout,Table,Menu,Dropdown,Icon} from "antd"

const {Content,Sider}=Layout;

export default class BookTable extends React.Component {

    state = {
        data: [
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
            },
            {
                index: 4,
                img: "https://img1.doubanio.com/view/subject/m/public/s29781198.jpg",
                name: "最后一公里的哲学",
                author: "张立民",

                lendDate: "2018-1-4",
                returnDate: "2018-5-6",
                price: 26.1
            },
            {
                index: 5,
                img: "https://img3.doubanio.com/view/subject/m/public/s29781195.jpg",
                name: "BBC全新4K海洋百科：蓝色星球",
                author: "[英]詹姆斯•",

                lendDate: "2018-6-1",
                returnDate: "2018-9-21",
                price: 25.6
            },
            {
                index: 6,
                img: "https://img1.doubanio.com/view/subject/m/public/s29757479.jpg",
                name: "神奇女侠",
                author: "[美] 威廉·莫尔顿·",

                lendDate: "2018-1-1",
                returnDate: "2018-5-3",
                price: 22.5
            },
            {
                index: 7,
                img: "https://img3.doubanio.com/view/subject/m/public/s29752394.jpg",
                name: "会赚钱的妈妈",
                author: "[美] 克丽丝特尔·",

                lendDate: "2018-2-1",
                returnDate: "2018-5-7",
                price: 278.1
            },
            {
                index: 8,
                img: "https://img3.doubanio.com/view/subject/m/public/s29776913.jpg",
                name: "莫斯科绅士",
                author: "[美]埃默·托尔斯",

                lendDate: "2018-1-3",
                returnDate: "2018-5-6",
                price: 21.1
            },
            {
                index: 9,
                img: "https://img3.doubanio.com/view/subject/m/public/s29770773.jpg",
                name: "风格感觉",
                author: "[美] 史蒂芬·平克",

                lendDate: "2018-1-1",
                returnDate: "2018-5-2",
                price: 27.1
            },
            {
                index: 10,
                img: "https://img3.doubanio.com/view/subject/m/public/s29752085.jpg",
                name: "人类之子",
                author: "[英] P•D•詹姆斯",

                lendDate: "2018-6-1",
                returnDate: "2018-10-2",
                price: 29.1
            },
        ]

    };

    render() {

        for (let i in this.state.data)
            this.state.data[i].isbn = this.state.data[i].index

        let dataSource = []
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                dataSource.push(this.state.data[i])
            }
        }

        const menu = (
            <Menu>
                <Menu.Item>
                    <a style={{fontSize: 10,}}>归还</a>
                </Menu.Item>

                <Menu.Item>
                    <a style={{fontSize: 10,}}>续借</a>
                </Menu.Item>

                <Menu.Item>
                    <a style={{fontSize: 10,}}>购买</a>
                </Menu.Item>
            </Menu>
        )

        const columns = [
            {
                title: "书号",
                dataIndex: "isbn",
                key: "isbn",
            },
            {
                title: "书名",
                dataIndex: "name",
                key: "name",
                render: text => (<a>{text}</a>)
            },
            {
                title: "作者",
                dataIndex: "author",
                key: "author",
                render: text => (<a href={"#"}>{text}</a>)
            },
            {
                title: "价格",
                dataIndex: "price",
                key: "price",
            },
            {
                title: "出借日",
                dataIndex: "lendDate",
                key: "lendDate",
            },
            {
                title: "归还日",
                dataIndex: "returnDate",
                key: "returnDate",
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Dropdown overlay={menu}>
                        <a>操作<Icon type={"down"}/></a>
                    </Dropdown>
                ),
            }
        ];

        return (<Table dataSource={dataSource} columns={columns}/>)
    }
}