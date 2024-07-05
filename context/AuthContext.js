// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// // import authConfig from 'src/configs/auth';
// import { ApiKey } from '../hooks/ApiKey';

// axios.defaults.baseURL = ApiKey;

// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve(),
// };

// function calculateExpireDate() {
//   const currentTimestamp = Date.now();
//   const expireTimestamp = currentTimestamp + 60 * 60 * 1000; // 1 hour in milliseconds
//   return expireTimestamp;
// }

// const AuthContext = createContext(defaultProvider);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(defaultProvider.user);
//   const [loading, setLoading] = useState(defaultProvider.loading);

//   const initAuth = async () => {
//     setLoading(true);
//     try {
//       const storedToken = await AsyncStorage.getItem("accessToken");
//       if (storedToken) {
//         const response = await axios.get("/accounts/me/", {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         });
//         setUser(response.data.data);
//         await AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
//         console.log("The Login Is Succesd very Good");

//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     } catch (error) {
//       // Handle errors appropriately, e.g., log error, try refreshing token, show error message
//       console.error(error);
//       AsyncStorage.removeItem('userData');
//       console.log("The Login Is Errored");

//       setUser(null);
//       setLoading(false);
//       // Navigation for React Native:
//       // navigation.navigate('Login');
//     }
//   };

//   useEffect(() => {
//     initAuth();
//   }, []);

//   const handleLogin = async (params, errorCallback) => {
//     try {
//       const response = await axios.post("/accounts/token/", params);
//       await AsyncStorage.setItem("accessToken", response.data.access);
//       AsyncStorage.setItem("refreshToken", response.data.refresh);
//       const expireTime = calculateExpireDate();
//       AsyncStorage.setItem("expireAtDigis", expireTime.toString());

//       await initAuth();

//       console.log("The Login Is Succesd");

//       // Navigation for React Native:
//       // navigation.navigate('Home');
//     } catch (error) {
//       if (errorCallback) errorCallback(error);
//       console.log("The Login Is Not GOod");

//     }
//   };

//   const handleLogout = async () => {
//     setUser(null);
//     await AsyncStorage.removeItem('userData');
//     await AsyncStorage.removeItem("accessToken");
//     // Navigation for React Native:
//     // navigation.navigate('Login');
//   };

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login: handleLogin,
//     logout: handleLogout,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// export { AuthContext, AuthProvider };

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { ApiKey } from '../hooks/ApiKey';
import { useNavigation } from '@react-navigation/native';
import { saveToken } from '../modules/GestionStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const navigation = useNavigation();
  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${ApiKey}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
        
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  async function login (email, password, setLoading) {
    setLoading(true);

    console.log("The emal and password", email, password);
    axios
      .post(`${ApiKey}/accounts/token/`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        // await saveToken(userInfo);
        console.log(userInfo);
        setUserInfo(userInfo);
        // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        saveToken(userInfo)
        // setIsLoading(false);
        setLoading(false);
        navigation.navigate('Home');
        
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(true);
      });
      // setLoading(false);

  };
  // async function login(email, password) {
  //   setIsLoading(true);
  
  //   try {
  //     const res = await axios.post(`${ApiKey}/accounts/token/`, {
  //       email,
  //       password,
  //     });
  
  //     let userInfo = res.data;
  //     await saveToken(userInfo);
  //     console.log(userInfo);
  //     setUserInfo(userInfo);
  //     // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  //     setIsLoading(false);
  //     navigation.navigate('Home');
  //   } catch (e) {
  //     console.log(`login error ${e.message}`);
  //     setIsLoading(false);
  //   }
  // }

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};