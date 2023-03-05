import { Button, Form, Input, Typography, Divider, message } from "antd"
import axios from "axios";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { ENVIRONMENT_URL } from "../Api/config";

interface userFrontToPost {
  email: string
  password: string
}

function LoginPage() {
  const navigate = useNavigate();

  const Login = async (values: userFrontToPost) =>{
    try {
      const response = await axios.post(`${ENVIRONMENT_URL}/login`, values);

      if(response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        message.success("Login Successful!");
        return navigate("/create");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      message.error("Login Failed!")
    }
  }

  return (
    <div className="login-page-container">
      <Form className="loginForm" onFinish={(values) => Login(values)}>
        <Typography.Title>Welcome to GeoPets!</Typography.Title>
        <Form.Item label="Email" name={"email"} rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email"
          },
        ]}>
          <Input placeholder="Enter your email"/>
        </Form.Item>
        <Form.Item label = "Password" name={"password"} rules={[
          {
            required: true,
            message: "Please enter uour password"
          },
        ]}>
          <Input.Password placeholder="Enter your password"/>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Login</Button>
        <Divider style={{borderColor: "black"}}>or create Account</Divider>
        <Button type="default" htmlType="submit" block>Create Account</Button>
      </Form>
    </div>
  )
}

export default LoginPage