import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Check from "../../assets/Check.png"
import Icon from 'react-native-vector-icons/FontAwesome6';
import { getDurre, getSouscrirData } from '../../modules/GestionStorage';
const windowWidth = Dimensions.get('window').width;

const Valide = ({ navigation }) => {
    console.log("Th Size , ", windowWidth * 0.12);

    useEffect(() => {
            async function fetchValue(){
              try{
                 const responseDurre = await getDurre();
                 const responsSouscrir = await getSouscrirData();

                 console.log("The Durree => ", responseDurre , " Souscrir => ", responsSouscrir);
              }
              catch(err){
                console.log("error => " ,err);
              }
            }

            fetchValue()
    }, [])
  return (
    <View style={{flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", position: "relative"}}>
        <View style={{position: "absolute", top: windowWidth * 0.07, right: windowWidth * 0.07}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="x" size={20} color="#000"/>
            </TouchableOpacity>
         </View>
      <View style={{width: windowWidth * 0.85, alignSelf: "center"}}>
        <Image source={Check} style={{width: windowWidth * 0.35, height: windowWidth * 0.35, alignSelf: "center"}}/>
        <Text style={{fontSize: windowWidth * 0.056, textAlign: "center", marginTop: windowWidth * 0.05, fontFamily: "Roboto-Bold", color: "#1C2437"}}>
          Votre paiement a bien été enregistré
        </Text>

        <Text style={{fontFamily: "Roboto-Medium", fontSize: windowWidth * 0.042, marginTop: windowWidth * 0.05,textAlign: "center",lineHeight: windowWidth * 0.07 ,color: "#1C2437"}}>
            Nous avons bien reçu votre paiement pour souscrire à une assurance frontière{'\n'}
            Vérifiez votre boite email pour obtenir votre certificat SNECA
        </Text>
         
         <View style={{marginTop: windowWidth * 0.1}}>
            <TouchableOpacity onPress={() => navigation.navigate('SouscrirV2')} style={{width: "100%", height: windowWidth * 0.12,elevation: 0.0,backgroundColor: "#fff" ,alignItems: "center", justifyContent: "center" ,borderRadius: 5, borderWidth: 1, borderColor: "#0000001f"}}>
                <Text style={{textAlign: "center", color: "#1E85FF", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Medium"}}>Faire une nouvelle demande</Text>
            </TouchableOpacity>
         </View>
         <View style={{marginTop: windowWidth * 0.05}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{width: "100%", height: windowWidth * 0.12,elevation: 0.0,backgroundColor: "#fff" ,alignItems: "center", justifyContent: "center" ,borderRadius: 5, borderWidth: 1, borderColor: "#000"}}>
                <Text style={{textAlign: "center", color: "#000", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Medium"}}>Accueil</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default Valide