import React from 'react';
//link NavLink的区别 前者不可以设置样式 后者可以设置样式
import "../css/home.css"
//引入pubsub
// import PubSub from 'pubsub-js'
import Bmob from "../js/key"
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
//引入from表单

//引入子组件
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err,values)
      if (!err) {
          Bmob.User.login(values.username,values.password).then(res => {
          console.log(res);
          if(res.key === "vip"){
            message.success("登陆成功兄弟!",2)
            this.props.onsubmit()
          }else{
            message.error("失败了！",2)
          }
        }).catch(err => {
        message.error("失败了！",2)
      });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="/">
            忘记了密码
          </a>
          <Button  type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="/">立即注册</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class Home extends React.Component{
   
   submit=()=>{
    this.props.history.push("/LA/list")
   }

    render() {
       
        return (
            <div className="sss">
                <div className="From">
                  <WrappedNormalLoginForm onsubmit={this.submit} />
                </div>
            </div>
        )
    }
}

export default Home;
