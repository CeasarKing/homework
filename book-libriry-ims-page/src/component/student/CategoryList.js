import React from "react"

import {Tree} from "antd"
const {TreeNode}=Tree

export default class CategoryList extends React.Component{

    state={
        listTree :
            {
                "文学":{
                    "小说文学":["中国小说","外国小说","日本小说"],
                    "经典文学":["诗歌","古典","散文","随笔","杂文"],
                    "儿童文学":["童话","寓言"],
                    "文学名人":["钱钟书","余华","鲁迅","春上村树","米兰·昆德拉"]
                },
                "流行":[
                    "奇幻",
                    "推理",
                    "科幻",
                    "漫画",
                    "青春",
                    {
                        "流行作家":["阿加莎·克里斯蒂","金庸","韩寒","J.K.罗琳"]
                    }
                ],
                "文化":["历史","心理学","哲学","艺术","传记",],
                "科技":{
                    "互联网":["java","c++","web开发","设计模式","高并发架构"],
                    "科学":["量子计算","人工智能","机器学习","算法研究"]
                },

            },

    };


    recall(tree,pos){
        if (Array.isArray(tree)){
            const leafs=[];
            //如果一个tree是一个数组，那么其中就有可能包含叶子节点
            for (let i in tree){
                //如果节点并不是叶子节点    如果 i 为string则当前节点不为叶子节点
               if (Object.prototype.toString.call(tree[i])==="[object String]"){
                   leafs.push(<TreeNode title={tree[i]} key={tree[i]}/>)
                } else {
                   const res=this.recall(tree[i],pos+1);
                   leafs.push(res)
                }
            }
            return leafs
        } else {
            let ret = [];
            for (let k in tree){
                const res=this.recall(tree[k],pos+1);
                ret.push(<TreeNode title={k} key={k}>{res}</TreeNode>);
            }
            return ret
        }
    }

    onNodeSelect=(key,info)=>{
        console.log(1)
        console.log(key)
        console.log(info)
    }

    render(){
        var cateList=this.recall(this.state.listTree,0);

        return(<Tree
                    showLine
                    onSelect={this.onNodeSelect}
                    defaultExpandedKeys={["小说文学","经典文学","儿童文学","文学名人"]}
                >
                    {cateList}
                </Tree>)
    }

}