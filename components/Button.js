import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Button = ({ title, functions, isLoading = false }) => {
  return (
    <TouchableOpacity onPress={functions} style={{width: "100%", height: windowWidth * 0.15, borderRadius: 8,justifyContent: "center", alignItems: "center",backgroundColor: "#1E85FE"}}>
      {
        !isLoading 
        ?
         <Text style={{textAlign: "center", fontFamily: "Roboto-Bold",fontSize: 15,lineHeight: 35, color: "#fff"}}> {title}</Text> 
        :
        <ActivityIndicator color={"#fff"} size={"small"}/>
      }
      
    </TouchableOpacity>
  )
}

export default Button