import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
//引入 BrowserRouter 包裹根组件
import App from "./App"
//引入根组件
import 'antd/dist/antd.css'
//引入全局样式
import "./index.css"
ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('root')
);