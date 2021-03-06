import React from 'react';
import ReactDOM from 'react-dom';
import '../../../node_modules/antd/lib/index.css';
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
import { hashHistory  } from 'react-router'


class Login extends React.Component {
    getValidateStatus(field) {
        const {isFieldValidating,getFieldError,getFieldValue}=this.props.form;
        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    //提交获取数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            let token = "dsffbvewrtsvzdfad";
            let D = new Date();
            let dateTime = D.getFullYear() + "-" + (parseInt(D.getMonth()) + 1) + "-" + D.getDay();
            if (values.agereement == true) {
                localStorage.setItem("token_" + dateTime, token);//获取当天的token
            } else {
                sessionStorage.setItem("token_" + dateTime, token);
            }
            hashHistory.push("/");//如果登陆成功跳转
        });
    }

    //userExists(rule, value, callback) {
    //
    //    if (!value) {
    //        callback();
    //    } else {
    //        callback();
    //
    //    }
    //}
    //
    //checkPass(rule, value, callback) {
    //
    //    if (!value) {
    //        callback();
    //    }
    //    callback();
    //}

    render() {
        const {getFieldProps,getFieldError,isFieldValidating}=this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {required: true, min: 5, message: '用户名至少为5个字符'},
                //{validator: this.userExists}
            ],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                {required: true, min: 5, whitespace: true, message: '密码不能少于6个字符'},
                //{validator: this.checkPass.bind(this)},
            ],
        });
        //获取表单数据
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        return (


            <div style={{width:'500px',height:'500px',margin:'0 auto',marginTop:'300px'}}>

                <Form horizontal form={this.props.form}>
                    <FormItem {...formItemLayout} label="账号：" hasFeedback
                                                  help={isFieldValidating('name')?'校验中...':(getFieldError('name')||[]).join(', ')}>
                        <Input {...nameProps} type="test" placeholder="姓名"/>
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码：" hasFeedback>
                        <Input{...passwdProps} type="password" placeholder="密码"/>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }}>
                        <label className="ant-checkbox-inline">
                            <Checkbox {...getFieldProps('agereement')} />&nbsp;今日免登录
                        </label>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                        &nbsp;  &nbsp;  &nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>

            </div>
        )

    }
}
;
Login = createForm()(Login);
//ReactDOM.render(<BasicDemo />,document.getElementById('app'));
export default Login;