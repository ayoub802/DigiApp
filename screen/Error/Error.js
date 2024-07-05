import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Check from "../../assets/CheckError.png"
const windowWidth = Dimensions.get('window').width;

const ErrorScrren = ({ navigation }) => {
    console.log("Th Size , ", windowWidth * 0.12);
  return (
    <View style={{flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
      <View style={{width: windowWidth * 0.85, alignSelf: "center"}}>
        <Image source={Check} style={{width: windowWidth * 0.35, height: windowWidth * 0.35, alignSelf: "center"}}/>
        <Text style={{fontSize: windowWidth * 0.056, textAlign: "center", marginTop: windowWidth * 0.05, fontFamily: "Roboto-Bold", color: "#D41414"}}>
        Cette police a déjà été renouvelée une fois
        </Text>

        <Text style={{fontFamily: "Roboto-Medium", fontSize: windowWidth * 0.042, marginTop: windowWidth * 0.05,textAlign: "center",lineHeight: windowWidth * 0.07 ,color: "#1C2437"}}>
        Pour bénéficier d’une nouvelle police d’assurance pour ce véhicule, 
        souscrivez à une nouvelle police.
        </Text>
         
         <View style={{marginTop: windowWidth * 0.1}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{width: "100%", height: windowWidth * 0.12,elevation: 0,alignItems: "center", justifyContent: "center" ,borderRadius: 5, borderWidth: 1, borderColor: "#0000001f"}}>
                <Text style={{textAlign: "center", color: "#1E85FF", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Medium"}}>Faire une nouvelle demande</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default ErrorScrren