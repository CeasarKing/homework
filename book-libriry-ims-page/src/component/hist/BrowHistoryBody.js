import React from "react"
import NormalHeader from "../student/NomalHeader"
import BookTable from "./BookTable"
import {Layout,Affix} from "antd"
import RecommendList from "./RecommendList";

const {Content,Sider,}=Layout;

export default class BrowHistoryBody extends React.Component{

    state={


    };
    render(){
        return(<div>
          <NormalHeader>
              <Layout style={{background:"#fff"}}>

                  <Sider theme="light" style={{marginLeft:"-20%"}}>
                      <Affix>
                          <RecommendList/>
                      </Affix>
                  </Sider>

                  <Content>
                      <BookTable/>
                  </Content>

              </Layout>
          </NormalHeader>
      </div>)
    }
}