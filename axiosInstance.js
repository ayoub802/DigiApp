import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "https://api-digis-assur.weelite.pro/api";


const axiosInstance = axios.create({
  baseURL,
//   timeout: 30000,
  withCredentials: false
});
