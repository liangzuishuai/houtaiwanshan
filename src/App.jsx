import React from 'react';
//link NavLink的区别 前者不可以设置样式 后者可以设置样式
import Home from "./pages/home"
import News from "./pages/news"
import Zwj from "./pages/shop"
// import Yanshi from "./pages/yanshi"
import "./index.css"
//引入路由
import {Switch,Route} from "react-router-dom"
class App extends React.Component{
    render() {
        return (
            <div className="header">
               <Switch>
                 <Route path="/LA" component={News}/>
                 <Route path="/ZWJ" component={Zwj}/>
                 {/* <Route path="/Ys" component={Yanshi}/> */}
                 <Route path="/" component={Home}/>
               </Switch>
            </div>
        )
    }
}

export default App;
