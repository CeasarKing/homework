import React from "react"

import {Tree} from "antd"
const {TreeNode}=Tree

export default class CategoryList extends React.Component{

    constructor(props){
        super();
        const tree = this.prepareTreeList(props.tags);
        this.state={
            listTree :tree,
            selectKey:[],   //选择文学
            lastClickKey:-1
        }
    }

    //初始化列表数据
    prepareTreeList(tags){
        let tree={}

        for (let i in tags){
            const v=tags[i]
            if (v.parentId==0){
                tree[i] = []
            }
        }
        for (let i in tags){
            const v=tags[i]
            if (v.parentId!=0){
                tree[tags[v.parentId].id].push(i)
            }
        }

        return tree
    }

    //拼写jsx
    recall(tree,pos){
        const tags=this.props.tags;

        if (Array.isArray(tree)){

            const leafs=[];
            //如果一个tree是一个数组，那么其中就有可能包含叶子节点
            for (let i in tree){
                //如果节点并不是叶子节点    如果 i 为string则当前节点不为叶子节点
               if (Object.prototype.toString.call(tree[i])==="[object String]"){
                   const title=tags[tree[i]].category
                   leafs.push(<TreeNode title={title} key={tree[i]}/>)
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
                ret.push(<TreeNode title={tags[k].category} key={k}>{res}</TreeNode>);
            }
            return ret
        }
    }

    onNodeSelect=(key)=>{

        if (key.length>0) {
            const tags = this.props.tags;

            const keyy=key[0]
            const queryTagIds=[keyy];

            if (tags[keyy].parentId==0){
                for (let i in tags){
                    if (tags[i].parentId==key){
                        queryTagIds.push(i);
                    }
                }
            }

            const  selectKey = this.state.selectKey;

            let index=-1
            if ((index=selectKey.indexOf(keyy))>=0){
                selectKey.splice(index,1)
            }else {
                selectKey.push(keyy)
            }

            this.setState({
               selectKey:selectKey,
                lastClickKey:keyy
           },()=>this.props.onSelect(queryTagIds));

        }else {
            const lastKey = this.state.lastClickKey;
            const selectKey = this.state.selectKey;
            if (lastKey>=0)
                selectKey.splice(selectKey.indexOf(lastKey,1));
            this.setState({
                selectKey:selectKey
            })
        }
    };

    render(){
        var cateList=this.recall(this.state.listTree,0);
        return(<Tree
                    showLine
                    onSelect={this.onNodeSelect}
                    defaultExpandedKeys={["54"]}
                    expandedKeys={this.state.selectKey}
                >
                    {cateList}
                </Tree>)
    }

}