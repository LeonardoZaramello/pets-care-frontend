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
      const response = await axios.post(`${ENVIRONMENT_URL}/client`, values);
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
        <Form.Item label="Name" name={"name"} rules={[
          {
            required: true,
            message: "Please enter your name"
          },
        ]}>
          <Input placeholder="Enter your email"/>
        </Form.Item>
        {/* EMAIL */}
        <Form.Item label="Email" name={"email"} rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email"
          },
        ]}>
          <Input placeholder="Enter your email"/>
        </Form.Item>
        {/* CEP */}
        <Form.Item label="Cep" name={"cep"} rules={[
          {
            required: true,
            message: "Please enter a valid Cep"
          },
        ]}>
          <Input placeholder="Enter your Cep"/>
        </Form.Item>
        {/* Adress */}
        <Form.Item label="Adress" name={"adress"} rules={[
          {
            required: true,
            message: "Please enter a valid Adress"
          },
        ]}>
          <Input placeholder="Enter your Adress"/>
        </Form.Item>
        {/* PASSWORD */}
        <Form.Item label = "Password" name={"password"} rules={[
          {
            required: true,
            message: "Please enter your password"
          },
        ]}>
          <Input.Password placeholder="Enter your password"/>
        </Form.Item>
        {/* CONFIRMPASSWORD */}
        <Form.Item label = "Confirm Password" name={"confirmPassword"} rules={[
          {
            required: true,
            message: "Please enter your password"
          },
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