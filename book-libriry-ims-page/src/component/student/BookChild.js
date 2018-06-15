import React from "react"

import { Link } from "react-router-dom";
//const {Meta} = Card

const BookChild=(props) => {

    const imgPathPre="/imgs/"

    const BaseDiv=()=>(
        <div>
            <Link to={"/intro"}  style={{height:"172px"}}>
                <img
                    style={{width:"120px",height:"172px"}}
                    alt={props.book.index}
                    src={imgPathPre + props.book.index +".jpg"}/>
            </Link>

            <Link style={{fontSize:"13px"}}
                  to={"/intro"} >{props.book.name}</Link><br/>
        </div>
    );

    const BookIfExistAuthorDiv =()=> {
        if (props.book.author!==undefined){
            return (<span style={{fontSize:"12px"}}>{props.book.author}</span>)
        } else {
            return ""
        }
    };



    return (
        <div style={{width:"115px",height:"230px"}}>
            <BaseDiv/>
            <BookIfExistAuthorDiv/>
        </div>
    )



};
export default BookChild
