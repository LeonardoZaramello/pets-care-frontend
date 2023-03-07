import { Button, Form, Input, Typography, Divider, message, Card, Avatar, QRCode, Switch, Skeleton, Col, Row, Menu } from "antd"
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { ENVIRONMENT_URL } from "../Api/config";

interface user {
  adress: string
  cep: string
  clientId: string
  createdAt: string
  email: string
  modifiedAt: string
  name: string
  password: string
  pets: null
  role: string
}

interface pet {
  petId: string,
  name: string,
  breed: string,
  size: string,
  birthDate: string,
  age: string,
  longitude: "",
  latitude: "",
  createdAt: string,
  modifiedAt: string,
  clientId: string,
  client: null
}

interface petPictureApiResponse {
  message: string[]
  status: string
}

interface nominatimResponse {
  address: adressInfo
  
}
interface adressInfo {
  road: string,
  suburb: string,
  city_district: string,
  city: string,
  municipality: string,
  county: string,
  state_district: string,
  state: string,
  region: string,
  postcode: string,
  country: string,
  country_code: string
}

function ClientPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<user>();
  const [clientPets, setClientPets] = useState<pet[]>([]);
  const [petPictures, setPetPictures] = useState<petPictureApiResponse>();
  const [qrCodes, setQrCodes] = useState("");
  const [location, setLocation] = useState<nominatimResponse>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        var user : any = localStorage.getItem("user");
        var token = localStorage.getItem("token");
        var userJson : user = JSON.parse(user);
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const responseClientPets = await axios.get(`${ENVIRONMENT_URL}/pet/client/${userJson.clientId}/pets`, config);
        const responseQrCode = await axios.get(`${ENVIRONMENT_URL}/client/qrcode/${userJson.clientId}/string`);

        console.log('data'+ JSON.stringify(responseQrCode.data));
        
        
        setUser(userJson);
        setClientPets(responseClientPets.data);
        setQrCodes(JSON.stringify(responseQrCode.data));
        
        
      } catch (error) {
        console.log(error);
      }
    }
    console.log('useeffect 2');
    getAllUsers();
    setLoading(false);
  }, []);

  useEffect(() => {
    const getPetsPictures = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breeds/image/random/${clientPets.length}`);
        const data = await response.data;
        setPetPictures(data);
          
      } catch (error) {
        console.log(error);
      }
    }
    
    console.log('useeffect 2');
    
    getPetsPictures();
  }, [clientPets]);
  
  useEffect(() => {
    const getAdress = async () => {
        try {

        const latitude = getRandomInRange(-23.56303,-23.51092,5);
        const longitude = getRandomInRange(-46.63834,-46.63353,5);
        // const response = await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&addressdetails=1&namedetails=1&format=json`);
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=-23.51465&lon=-46.61551&zoom=10&format=jsonv2`);
        // const data = await response.data;
        setLocation(response.data);
        console.log('NominatimApi'+ response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAdress();
  }, []);

  function getRandomInRange(from: any, to: any, fixed: any) {
      return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }


  return (
    <div >
      <nav>
        <Link style={{ color: "black", fontSize: 20, }} to={"/create/pet"}> Create Pet</Link>
      </nav>
      <div className="client-page-container" >
        {
          clientPets?.length > 0
          && clientPets?.map((pet, index) =>(
            <div key={index}>
                  <Card
                    style={{ width: 300, height: 300 }}
                    cover={
                      <img
                        alt="example"
                        src={`${petPictures?.message[index]}`}
                      />
                    }
                  > </Card>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                  >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={<Avatar src={`${petPictures?.message[index]}`} />}
                      title={`${pet.name}`}
                      description={`${user?.name}`}
                      />
                    <p>{`Breed: ${pet.breed}`}</p>
                    <p>{`Size: ${pet.size}`}</p>
                    <p>{`Age: ${pet.age}`}</p>
                    <p>{`Location: ${location?.address.municipality}`}</p>
                    <p>{`Location: ${location?.address.city}`}</p>
                    <p>{`Location: ${location?.address.region}`}</p>
                  </Skeleton>
                </Card>
              </div>
              ))
            }
            <QRCode value={qrCodes}/>
      </div>
    </div>
  )
}

export default ClientPage