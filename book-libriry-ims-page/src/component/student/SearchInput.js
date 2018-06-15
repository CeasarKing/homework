import React from "react"

import {Input} from "antd"

const SearchInput = ()=>{

    const handleOnSearch=(e)=>{
        console.log(e)
    };

    const width = window.screen.availWidth/3

    return(<Input.Search
        style={{
            width:width,
            marginTop:"10px",
            marginLeft:"30%"
        }}
        placeholder={"你的颜如玉"}
        onSearch={handleOnSearch}
        size={"large"}
        enterButton={"搜索"}>
    </Input.Search>)

};

export default SearchInput
