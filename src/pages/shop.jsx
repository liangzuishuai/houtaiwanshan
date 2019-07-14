/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "../css/list.css"
//引入样式
import { Table, Divider, Popconfirm, message, Spin, Alert ,Button ,Drawer ,Input ,Form ,Modal} from 'antd';
//引入列表
import Bmob from "../js/key"
let one = {marginTop:"110px",lineHeight:"100px",height:"300px",backgroundColor:"rgb(143, 192, 231)"}
class Shop extends React.Component{
    state = {
      data:[],
      columns:[
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="/..">{text}</a>,
        },
        {
          title: '兑换积分',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '库存',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="javascript:;" onClick={() => this.setModal1Visible(true,record)}>兑换</a>
              <Divider type="vertical" />
              <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={this.confirm.bind(this,text,record)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        > <a href="/">删除</a>
        </Popconfirm>
            </span>
          ),
        },
      ],
      visible2: false,
      modal1Visible: false,
      users:{
        age: "",
        name: "",
        password:""
      },
      yd:"",
      fine:"",
      id:"",
      address:""
    }
     //点击别处关闭
    onClose = () => {
      this.setState({
        visible2: false,
      });
    }
    //添加商品信息对象
    onchangeq2=(title,e)=>{
      var users=this.state.users
      users[title]=e.target.value
      this.setState({
         users
      })
    }
    confirm(text) {
      console.log(text);
      var arr=this.state.data;
      arr=arr.filter(x=>x.ID!=text.ID)
      this.setState({data:arr})
      message.success('删除成功！');
      this.newMethod(text);
      //库中删除
    }
    newMethod(text) {
    const query = Bmob.Query('shopping');
    query.destroy(text.ID).then(res => {
      console.log(res);
      // message.success('删除成功！');
    }).catch(err => {
      message.error('删除失败！');
      console.log(err);
    });
  }
   //添加显示
   showSuccess = () => {
    this.setState({
      visible2: true 
    })
  };
  //添加商品
  handlePush = ()=>{
    let users = this.state.users;
    //添加数据
    const query = Bmob.Query('shopping');
    query.set("uesrname",users.name)
    query.set("jifen",users.age)
    query.set("password",users.password)
    query.save().then(res => {
      console.log(res);
      message.success("兄弟！添加成功！");
      //再次请求数据
      var arr=[];
      const query = Bmob.Query("shopping");
      query.find().then(res => {
          // eslint-disable-next-line array-callback-return
          res.map((x,i)=>{
            var o={
              key: i+1+"",
              name: x.uesrname,
              age: x.jifen,
              address: x.password,
              ID:x.objectId,
            }
            arr.push(o)
          })
          this.setState({
            data:arr,
            //清除添加对象
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
    cancel(e) {
      console.log(e);
      message.error('删除失败');
    }
    //显示隐藏
    setModal1Visible(modal1Visible,record) {
      console.log("点了",record)
      this.setState({ 
        modal1Visible
       });
      this.setState({
        yd:record.name,
        fine:record.age,
        id:record.ID,
        address:record.address
      })
    }
    setModal2Visible(modal1Visible) {
      this.setState({ 
        modal1Visible
       });
    }
    setModal3Visible(modal1Visible) {
      this.setState({ 
        modal1Visible
       });
       //修改兑换后的数据
        const query = Bmob.Query('shopping');
        query.get(this.state.id).then(res => {
          console.log(res)
          let final = (this.state.address)-1; 
          res.set('password',final.toString())
          res.save();
          //再次请求刷新数据
                var arr=[];
                const query = Bmob.Query("shopping");
                query.find().then(res => {
                    // eslint-disable-next-line array-callback-return
                    res.map((x,i)=>{
                      var o={
                        key: i+1+"",
                        name: x.uesrname,
                        age: x.jifen,
                        address: x.password,
                        ID:x.objectId,
                      }
                      arr.push(o)
                    })
                    this.setState({
                      data:arr,
                      //清除添加对象
                      users:{}
                    })
                });
          message.success("兑换成功！",2);

        }).catch(err => {
          console.log(err);
        })
    }
    componentDidMount(){
    var arr=[]
      const query = Bmob.Query("shopping");
      query.find().then(res => {
          // eslint-disable-next-line array-callback-return
          res.map((x,i)=>{
            var o={
              key: i+1+"",
              name: x.uesrname,
              age: x.jifen,
              address: x.password,
              ID:x.objectId,
            }
            arr.push(o)
          })
          this.setState({
            data:arr
          })
      });
    }
    render() {
    return (
        <div className="LA">
              <Modal
          title="商品兑换详细："
          centered
          visible={this.state.modal1Visible}
          onOk={() => this.setModal3Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <h3>您想兑换：{this.state.yd}</h3>
          <p>所需要积分：{this.state.fine}</p>
        </Modal>
        {/* 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 */}
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
          <Form.Item label="库存" >
            <Input placeholder="剩余库存" value={this.state.users.password} onChange={this.onchangeq2.bind(this,"password")}/>
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
  </Spin></div>:<Table columns={this.state.columns} dataSource={this.state.data} />}<div><p className="push"><Button onClick={this.showSuccess}>添加商品</Button></p></div>
        </div>
    )
  }
}

export default  Shop;