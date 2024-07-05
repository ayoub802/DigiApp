import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const TitleWrapper = ({ title, desc}) => {

    const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{marginTop: windowWidth * 0.06, marginBottom: windowWidth * 0.07}}>
      <Text style={{textAlign: 'center', fontSize: 24, fontFamily: "Roboto-Bold", textTransform: "uppercase", color: "rgb(161, 64, 157)"}}>{title}</Text>
      <Text style={{textAlign: 'center', fontSize: 18, fontFamily: "Roboto-Medium",  color: "#1C2437"}}>{desc}</Text>
    </View>
  )
}

export default TitleWrapper