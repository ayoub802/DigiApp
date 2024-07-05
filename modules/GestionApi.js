import axios from "axios";
import { ApiKey } from "../hooks/ApiKey";
import { getToken, saveCode, saveEmailCode, saveSouscrir, saveSouscrirData } from "./GestionStorage";


export const fetchValues = async () => {
    try{
        const token = await getToken();
       
        console.log("the Token => ", token.access);

       const response = await axios.get(
        `${ApiKey}/support/contact/`,
        {
          headers: {
            Accept: 'application/json',
            Authorization:'Bearer'+ token.access,
          },
        });

       console.log("The token => ", response.data);
    }
    catch(error){
      console.log("The Error => ", error.response.data);
    }
 }
 
export const fetchNotificaction = async () => {
    try{
        const token = await getToken();
       
        console.log("the Tokens => ", token.access);

       const response = await axios.get(
        `${ApiKey}/notification/`,
        {
          headers: {
            Accept: 'application/json',
            Authorization:'Bearer '+ token.access,
          },
        });

       console.log("The token => ", response.data);
       return response;
    }
    catch(error){
      console.log("The Error => ", error.response.data);
    }
 }

export const fetchUser = async () => {
  try{
      const token = await getToken();
     
      console.log("the Tokens => ", token.access);

     const response = await axios.get(
      `${ApiKey}/accounts/me`,
      {
        headers: {
          Accept: 'application/json',
          Authorization:'Bearer '+ token.access,
        },
      });
     return response.data;
  }
  catch(error){
    console.log("The Error => ", error);
  }
}

export const fetchVehicule = async () => {
  try{
      const token = await getToken();
     

     const response = await axios.get(
      `${ApiKey}/insurance/vehicles/`,
      {
        headers: {
          Accept: 'application/json',
          Authorization:'Bearer '+ token.access,
        },
      });

    //  console.log("The Vehicules => ", response.data);
     return response;
  }
  catch(error){
    console.log("The Error => ", error.response.data);
  }
}


export const fetchBrands = async () => {
  try{
      const token = await getToken();
     
      console.log("the Tokens => ", token.access);

     const response = await axios.get(
      `${ApiKey}/insurance/brands/`,
      {
        headers: {
          Accept: 'application/json',
          Authorization:'Bearer '+ token.access,
        },
      });

    //  console.log("The Brands of => ", response.data);
     return response;
  }
  catch(error){
    console.log("The Error => ", error.response.data);
  }
}

 export const PostVehicule = async ({
  setLoading,
  type_mode,
  genre,
  color,
  usage,
  charge,
  registration,
  chassis_number,
  manufacturing_year,
  first_registration,
  fiscal_power,
  number_place,
  navigation
 }) => {
  setLoading(true)
  try{
    let token = await getToken();
    const response = axios.post(`${ApiKey}/insurance/vehicles/`,{
      type_model: type_mode,
      gender: genre,
      color: color,
      fiscal_power: fiscal_power,
      usage: usage,
      number_place: number_place, 
      registration: registration,
      charge: charge,
      chassis_number: chassis_number,
      manufacturing_year: manufacturing_year,
      first_registration: first_registration
    },
    {
      headers:{
        Accept: 'application/json',
        Authorization: 'Bearer ' + token.access
      }
    }
    ).then((res) => {
      console.log("The Response => ", res);
      saveSouscrirData(res.data)
      navigation.navigate('ValidationScreen')
      setLoading(false)
    })
    .catch((error) => console.log("The error => ", error));

    return response;
  }
  catch(error){
    console.log("The Error => ", error);
    setLoading(true)
  }
 }

 export const PostOrder = async ({ insured, vehicleId, duration, startDay, }) => {
  console.log("The Values => ", insured, vehicleId, duration, startDay);
  try {
    let token = await getToken();
    const response = await axios.post(
      `${ApiKey}/insurance/order/`,
      {
        insured: insured,
        vehicles: [
          {
            vehicle: vehicleId,
            duration: duration,
            start_day: startDay
          }
        ]
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.access
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error of Order => ", error.response.data);
    } else {
      console.log("Error of Order => ", error.message);
    }
    throw error;
  }
};


export const ConfirmOrder = async (orderId) => {
  try {
    let token = await getToken();
    const response = await axios.post(
      `${ApiKey}/insurance/order/${orderId}/`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.access
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("The Error => ", error.message);
    throw error;
  }
};

 export const PostResetEmail = async ({
   email,
   setLoading,
   navigation
 }) => {
  setLoading(true)
    try{
      let token = await getToken();
       const response = await axios.post(`${ApiKey}/accounts/reset/password/mobile/request/`, {
        email: email 
       },
       {
        headers:{
          Accept: 'application/json',
        }
       }
       ).then((response) => {
        console.log("The Response => ", response.data);
        setTimeout(() => {
          navigation.navigate('OTP')
        }, 1000)
        setLoading(false)
      })
       .catch((error) => console.log("The error => ", error.response.data));

       return response;
    } 
    catch(err){
      console.log("The Error => ", err.response.data);
      setLoading(true)
    }
 }

 export const PostValidateCode = async ({
   email,
   codeValue,
   setLoading,
   navigation
 }) => {
 setLoading(true)
    try{
      console.log("The Code => ", codeValue , "The Email => ", email);
      let token = await getToken();
       const response = await axios.post(`${ApiKey}/accounts/reset/password/mobile/verify/`, {
        email: email,
        code: codeValue
       },
       {
        headers:{
          Accept: 'application/json',
        }
       }
       ).then((response) => {
        console.log("The Response => ", response.data);
        saveCode(response.data)
        setTimeout(() => {
          navigation.navigate('ChangePassword')
        }, 1000)
        setLoading(false)
      })
       .catch((error) => console.log("The error => ", error.response.data));

       return response;
    } 
    catch(err){
      console.log("The Error => ", err.response.data);
      setLoading(true)
    }
 }

 export const PostResetPassword = async ({
  token,
  password,
  re_password,
  uid,
  setLoading,
  navigation
 }) => {
  setLoading(true)
  try{
    const response = await axios.post(`${ApiKey}/accounts/reset/password/mobile/new/`, {
      uidb64: uid,
      token: token,
      password: password,
      re_password: re_password
     },
     {
      headers:{
        Accept: 'application/json',
      }
     }
     ).then((response) => {
      console.log("The Response => ", response.data);
      setTimeout(() => {
        navigation.navigate('Login')
      }, 1000)
      setLoading(false)
    })
     .catch((error) => console.log("The error => ", error.response.data));

     return response;
  }
  catch(err){
    console.log("The Error => ", err);
  }
 }
