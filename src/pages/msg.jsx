import React from 'react';
class Msg extends React.Component{
    state={
        data:[
            {id:1,content:"message001"},
            {id:2,content:"message002"},
            {id:3,content:"message003"}
        ]
    }
    render() {
    return (
        <div>
           <h3>ZWJ</h3>
        </div>
    )
}
}

export default  Msg;
//路由传参 params
//路由连接的to中 将数据写在地址最后面
//在route组件的path属性中路径的最后写数据名（键名）
//写法：“xxx/xxx/xxx/：数据名”