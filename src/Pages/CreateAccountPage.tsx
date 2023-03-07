import { Button, Form, Input, Typography, Divider, message } from "antd"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENVIRONMENT_URL } from "../Api/config";

interface clientCreatePost {
  name: string,
  email: string,
  cep: string,
  adress: string,
  password: string,
	confirmpassword: string
}

function CreateAccountPage() {
  const navigate = useNavigate();

  const CreateAccount = async (values: clientCreatePost) =>{
    try {
      const response = await axios.post(
        `${ENVIRONMENT_URL}/client`,
        values, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
      );

      console.log(response);

      if(response.status == 201) {
        message.success("Account Created!");
        navigate("/");
      }

    } catch (error) {
      console.log(error);
      message.error("Account Create Failed!");
    }
  }
  return (
    <div className="create-page-container">
      {/* {axiosError.length > 0 && axiosError.map((axiosError, index) =>(
        <div key={index}>{`${axiosError}`}</div>
        ))
      } */}
      <Form className="loginForm" onFinish={(values) => CreateAccount(values)}>
        <Typography.Title>Create your Account</Typography.Title>
        {/* NAME */}
        <Form.Item label="Name" name={"name"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter your name"
          },
          {
            min: 3,
            message: 'Name too small'
          }
        ]}
        >
          <Input placeholder="Enter your email"/>
        </Form.Item>
        {/* EMAIL */}
        <Form.Item label="Email" name={"email"} hasFeedback rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email"
          },
        ]}>
          <Input placeholder="Enter your email"/>
        </Form.Item>
        {/* CEP */}
        <Form.Item label="Cep" name={"cep"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter a valid Cep"
          },
          {
            len: 8,
            message: "Cep must have 8 digits"
          }
        ]}>
          <Input placeholder="Enter your Cep"/>
        </Form.Item>
        {/* Adress */}
        <Form.Item label="Adress" name={"adress"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter a valid Adress"
          },
          {
            min: 6,
            message: "Adress too small"
          },
        ]}>
          <Input placeholder="Enter your Adress"/>
        </Form.Item>
        {/* PASSWORD */}
        <Form.Item label = "Password" name={"password"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter your password"
          },
          {
            min: 6,
            message: "Password too small"
          },
        ]}>
          <Input.Password placeholder="Enter your password"/>
        </Form.Item>
        {/* CONFIRMPASSWORD */}
        <Form.Item label = "Confirm Password" dependencies={['password']} name={"confirmPassword"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter your password"
          },
          {
            min: 6,
            message: "Password too small"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords don't match!"));
            },
          }),
        ]}>
          <Input.Password placeholder="Repeat your password"/>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Create Account</Button>
        <Divider style={{borderColor: "black" }} >Go back</Divider>
        <Button type="default" htmlType="submit" block onClick={() => navigate("/")}>Login page</Button>
      </Form>
    </div>
  )
}

export default CreateAccountPage