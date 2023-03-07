import { Button, Form, Input, Typography, Divider, message, Select, DatePicker } from "antd"
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENVIRONMENT_URL } from "../Api/config";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { format } from "date-fns";

interface petCreate {
	name: string,
	size: string,
	breed: string,
	birthdate: birthdate | any
}

interface birthdate
{
  $D: string,
  $M: string,
  $y: string,
  $d: string
}

function CreatePetPage() {
  const navigate = useNavigate();

  async function CreatePet(values: petCreate): Promise<void> {
    try {
      // const date = `${values.birthdate.$y}-${values.birthdate.$M + 1}-${values.birthdate.$D}`
      // values.birthdate = date;
      // console.log(values.birthdate.$d);
      
      // const fns = format(new Date(values.birthdate.$d), "yyyy-MM-dd");

      // console.log('fns' + fns);
      
      
      // console.log(values);
      
      const response = await axios.post(
        `${ENVIRONMENT_URL}/pet`,
        values,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
      );

      console.log(response);
        
      if(response.status == 201 || response.status == 200) {
        message.success("Pet Created!");
        navigate("/client");
      }
      
    } catch (error) {
      console.log(error);
      message.error("Pet Create Failed!");
    }    
  }

  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  
  return (
    <div className="createpet-page-container">
      <Form className="loginForm" onFinish={(values) => CreatePet(values)}>
        <Typography.Title>Insert your Pet</Typography.Title>
        {/* NAME */}
        <Form.Item label="Name" name={"name"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter your pet name"
          },
          {
            min: 3,
            message: 'Name too small'
          }
        ]}
        >
          <Input placeholder="Enter your email"/>
        </Form.Item>
        {/* SIZE */}
        <Form.Item label="Size" name={"size"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter a valid size"
          },
        ]}>
          <Select>
            <Select.Option value="Small">Small</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Large">Large</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        {/* BREED */}
        <Form.Item
            label="Breed"
            name="breed"
            rules={[
              {
                required: true,
                message: 'Please enter a valid breed'
              },
            ]}
            hasFeedback
          >
            <Select>
              <Select.Option value="Beagle">Beagle</Select.Option>
              <Select.Option value="Pinscher">Pinscher</Select.Option>
              <Select.Option value="Hound">Hound</Select.Option>
            </Select>
          </Form.Item>
        {/* BIRTHDATE */}
        <Form.Item label="BirthDate" name={"birthdate"} hasFeedback rules={[
          {
            required: true,
            message: "Please enter a valid BirthDate"
          },
        ]}>
          <DatePicker picker="date"  format={dateFormat}/>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Create Pet</Button>
        <Divider style={{borderColor: "black" }} >Go back</Divider>
        <Button type="default" block onClick={() => navigate("/client")}>Client page</Button>
      </Form>
    </div>
  )
}

export default CreatePetPage