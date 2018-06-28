import React from "react"

import { Link } from "react-router-dom";
//const {Meta} = Card

export default class BookChild extends React.Component{

    state={
        book:this.props.book
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            book:nextProps.book
        })
    }

    render(){

        const book = this.state.book;
        const BaseDiv=()=>(
            <div>
                <a   style={{height:"172px"}}>
                    <img
                        style={{width:"120px",height:"172px"}}
                        alt={book.index}
                        src={"http://localhost:8080/img/"+book.index}/>
                </a>
                <a style={{fontSize:"13px"}}
                       >{book.name}</a><br/>
            </div>
        );

        const BookIfExistAuthorDiv =()=> {
            if (book.author!==undefined){
                return (<span style={{fontSize:"12px"}}>{book.author}</span>)
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
    }


};

