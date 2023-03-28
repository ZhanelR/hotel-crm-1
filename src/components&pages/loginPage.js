import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../store/actionUser";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import { initialState } from "../slices/usersSlice"
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./loginPage.css"

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    if (isAuthorized === true) {
      navigate('/rooms-table');
    }
  }, [isAuthorized]);

  const onFinish = (values) => {
    dispatch(login({login: values.username, password: values.password}));
    
    if (values.remember) {
      const data = { login: values.username, password: values.password };
      localStorage.setItem('loginData', JSON.stringify(data));
    } else {
      localStorage.removeItem('loginData');
    }
  };

  return (
    <div className='form-сontainer'>
      <h3 className='autorizationHeader'>Authentication</h3>
      <div className='background-for-text'></div>
      <Form className='form-itself'
        form={form}
        name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        width: '35%',
      }}
      initialValues={{
        remember: true,
      }}
        onFinish={onFinish}
      >
        <Form.Item
        style={{
          width: '600px',}}
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
        style={{
          width: '600px',}}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          //offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        
      </Form>
      <h2 className='text-under-form'>Do not have account yet?</h2>
      <h3 className='text-with-link'><Link to="/registration">Register now</Link></h3>
    </div>
    //</div>
  );
}

export default Login;
