import React from 'react';
import List from './list'
import Shop from './shop'
//引入PubSub
import PubSub from 'pubsub-js'
import {Button} from "antd"
//路由
import {Switch,Route,NavLink} from "react-router-dom"
//引入路由
import "../css/news.css"
let bstyle = {marginLeft: "0px",marginRight: "300px",width:"250px",height:"50px",opacity:"0.8"};
class News extends React.Component{
    state = {
        data:{}
    }
    componentWillMount(){
        if(localStorage.getItem("li-data") === undefined){
            PubSub.subscribe('MY TOPIC',(msg,data)=>{
                console.log(msg,data);
                //msg键名 data：数据值
                console.log(data);
                this.setState({
                  data
                })
                data = JSON.stringify(data);
                console.log(data);
                //存入
                localStorage.setItem("li-data",data);
              })
          }else{
            let lidata = JSON.parse(localStorage.getItem("li-data"));
            console.log(lidata);
            this.setState({
              data:lidata
            })
          }
    }
    render() {
    return (
        <div>
            <div className="nav">
                <div className="TX"><img className="img" src={this.state.data.head} alt=""/><h3>{this.state.data.username}</h3></div>
                <NavLink activeClassName="active" to="/LA/shop"><Button style={bstyle}>商品操作</Button></NavLink>
                <NavLink to="/LA/list"><Button style={bstyle}>管理列表</Button></NavLink>
            </div>
            <Switch>
                 <Route path="/LA/shop" component={Shop}/>
                 <Route path="/LA/list" component={List}/>
            </Switch>
        </div>
    )
  }
}

export default  News;