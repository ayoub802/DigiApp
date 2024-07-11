import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next';
const windowWidth = Dimensions.get('window').width;

const ButtonRetour = ({ navigation }) => {
    // console.log("The Width => ", windowWidth * 0.148);

    const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row" ,alignItems: "center",paddingVertical: windowWidth * 0.02, paddingHorizontal: windowWidth * 0.061 ,justifyContent: "center",position: "relative" ,borderWidth: 1,borderRadius: 8,borderColor: "#6d788d73",maxWidth: windowWidth * 0.35,  }}>
      <Ionicons name="arrow-back-circle-outline" color={"#1c2438"} size={25}/>
      <Text style={{fontSize: windowWidth * 0.04, fontFamily: "Roboto-Medium", lineHeight: 30, color: "#1c2438", letterSpacing: 0.4, marginHorizontal: windowWidth * 0.02}}>{t('Retour')}</Text>
    </TouchableOpacity>
  )
}

export default ButtonRetour