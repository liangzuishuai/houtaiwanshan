/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "../css/list.css"
//引入样式
import { Table, Divider, Popconfirm, message, Spin, Alert,Drawer,Button ,Form,Input} from 'antd';
//引入列表
import Bmob from "../js/key"
let one = {marginTop:"110px",lineHeight:"100px",height:"300px",backgroundColor:"rgb(143, 192, 231)"}
class News extends React.Component{
    state = {
      data:[],
      columns :[
        {
          title: '姓名列表',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="/">{text}</a>,
        },
        {
          title: '个人积分',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="javascript:;" onClick={this.showDrawer.bind(this,record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={this.confirm.bind(this,text,record)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"><a href="/">删除</a>
        </Popconfirm>
            </span>
          ),
        },
      ],
      //操作开关
      visible: false,
      visible2: false,
      //编辑对象项
      user:{
        address: "",
        age: "",
        key: "",
        name: ""
      },
      users:{
        age: "",
        name: ""
      }
    }
    //成功
    confirm(text,reaord) {
      console.log(text,reaord);
      var arr=this.state.data;
      arr=arr.filter(x=>x.address!==text.address)
      this.setState({data:arr})
      // message.success('删除成功！');
      this.newMethod(text);
      //从库删除
    }
    //库删除
    newMethod(text) {
      const query = Bmob.Query('_User');
      query.destroy(text.address).then(res => {
        console.log(res);
        message.success('删除成功！');
      }).catch(err => {
        message.error('删除失败！');
        console.log(err);
      });
    }
    //失败
    cancel(e) {
      console.log(e);
      message.error('删除失败！');
    }
    componentDidMount(){
      var arr=[];
      const query = Bmob.Query("_User");
      query.find().then(res => {
          // eslint-disable-next-line array-callback-return
          res.map((x,i)=>{
            var o ={
              key: i+1+"",
              name: x.username,
              age: x.jifen,
              address: x.objectId,
            }
            if(x.key==="vip"){

            }else{
              arr.push(o)
            }
          })
          this.setState({
            data:arr
          })
      });
    }
    //点击别处关闭
    onClose = () => {
      this.setState({
        visible: false,
        visible2: false,
      });
    };
    //编辑显示
    showDrawer = (record) => {
      this.setState({
        user:JSON.parse(JSON.stringify(record)),
        visible: true 
      });

    };
    //添加显示
    showSuccess = () => {
      this.setState({
        visible2: true 
      })
    };
    //修改请求数据
    handleSubmita=()=>{
      console.log('this', this)
      let setdata = this.state.user;
      console.log(setdata);
      const query = Bmob.Query('_User');
      query.get(setdata.address).then(res => {
        console.log(res)
        res.set('jifen',setdata.age)
        res.save();
        //放进去之后
        var arr=[];
        const query = Bmob.Query("_User");
        query.find().then((res) => {
            // eslint-disable-next-line array-callback-return
            res.forEach((x,i)=>{
              var o ={
                key: i+1+"",
                name: x.username,
                age: x.jifen,
                address: x.objectId,
              }
              if(x.key==="vip"){
  
              }else{
                arr.push(o)
              }
            })
            this.setState({
              data:arr
            })
        });
      }).catch(err => {
        console.log(err)
      })
      this.onClose();
    }
    //添加成员
    handlePush = ()=>{
      let users = this.state.users;
      //添加数据
      const query = Bmob.Query('_User');
      query.set("username",users.name)
      query.set("jifen",users.age)
      query.set("password","111111")
      query.save().then(res => {
        console.log(res);
        message.success("兄弟！添加成功！");
        //再次请求数据
        var arr=[];
      const query = Bmob.Query("_User");
      query.find().then(res => {
          // eslint-disable-next-line array-callback-return
          res.map((x,i)=>{
            var o ={
              key: i+1+"",
              name: x.username,
              age: x.jifen,
              address: x.objectId,
            }
            if(x.key==="vip"){
            }else{
              arr.push(o)
            }
          })
          this.setState({
            data:arr,
            //添加成员的对象清空
            users:{}
          })
      });
      }).catch(err => {
        console.log(err)
      })
      this.setState({
        visible2: false
      })
    }
    //编辑数据绑定
    onchangeq=(title,e)=>{
      var user=this.state.user
      user[title]=e.target.value
      this.setState({
         user
      })
    }
    //添加
    onchangeq2=(title,e)=>{
      var users=this.state.users
      users[title]=e.target.value
      this.setState({
         users
      })
    }
    render() {
    return (
        <div className="LA">
          <Drawer title="right!,锵锵锵锵！"
          placement="right"
          width={420}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}>
          <Form labelCol={{ span: 5 }}>
          <Form.Item label="username" >
            <Input placeholder="input placeholder"  value={this.state.user.name} onChange={this.onchangeq.bind(this,"name")}/>
          </Form.Item>
          <Form.Item label="jifen" >
            <Input placeholder="input placeholder" value={this.state.user.age}  onChange={this.onchangeq.bind(this,"age")}/>
          </Form.Item>
          <Form.Item label="objectId" >
            <Input placeholder="input placeholder" disabled value={this.state.user.address}  onChange={this.onchangeq.bind(this,"address")}/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" onClick={this.handleSubmita}>
            修改
          </Button>
        </Form.Item>
          </Form>
          </Drawer>
          <Drawer title="left!,锵锵锵锵！"
          placement="left"
          width={420}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible2}>
          <Form labelCol={{ span: 5 }}>
          <Form.Item label="username" >
            <Input placeholder="请输入" value={this.state.users.name} onChange={this.onchangeq2.bind(this,"name")}/>
          </Form.Item>
          <Form.Item label="jifen" >
            <Input placeholder="请输入" value={this.state.users.age} onChange={this.onchangeq2.bind(this,"age")}/>
          </Form.Item>
          <Form.Item label="objectId" >
            <Input placeholder="自动生成" disabled/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" onClick={this.handlePush}>
              添加
          </Button>
        </Form.Item>
          </Form>
          </Drawer>
           {this.state.data.length==0?<div style={one}><Spin tip="Loading...">
    <Alert
      message="加载中..."
      description=""
      type="info"
    />
  </Spin></div>:<Table columns={this.state.columns} dataSource={this.state.data} />}<div><p className="push"><Button onClick={this.showSuccess}>添加成员</Button></p></div>
        </div>
    )
  }
}


export default  News;