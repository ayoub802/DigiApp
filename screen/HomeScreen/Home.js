import { View, Text,TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import styles from './style'
import { homecategories } from '../../constant'
import { getToken, removeSouscrirData } from '../../modules/GestionStorage'
import axios from 'axios'
import { ApiKey } from '../../hooks/ApiKey'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { fetchNotificaction, fetchValues } from '../../modules/GestionApi'
import { useTranslation } from 'react-i18next'

const HomeScreen = ({ navigation }) => {
  const [pressedIndex, setPressedIndex] = useState(null);
  const [tokenUser, setTokenUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
     const fetchData = async () => {
      const token = await getToken();
      console.log("The token => ", token);
      await fetchNotificaction();
     } 

     fetchData();
  }, [])
  const handlePressIn = async (index) => {
    setPressedIndex(index);
    await removeSouscrirData()
  };

  const handlePressOut = () => {
    setPressedIndex(null);
  };

  console.log("The Press Index => ", imageSelected);

  if(loading == true){
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={20} color="#000"/>
      </View>
    )
  }





  return (
    <View style={styles.HomeContainer}>
       <View style={{flexDirection: "column", gap: 25}}>
        {
          homecategories.map((item ,index) => (
            <TouchableOpacity onPressIn={() => {handlePressIn(index); navigation.navigate(item.path)}} key={index} style={[pressedIndex === index ? {backgroundColor: "#a1409d"} : {backgroundColor: "#fff"}, styles.HomeBox]}>
              <Image source={pressedIndex === index ? item.imageWhite : item.imageDark} style={styles.imagBox}/>
              <Text style={[pressedIndex == index ? {color: "#fff"} : {color: "#a1409d"} ,styles.HomeBoxText]}>{t(item.title)}</Text>
            </TouchableOpacity>
          ))
        }
      </View>   


    </View>
  )
}

export default HomeScreen