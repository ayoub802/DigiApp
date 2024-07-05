import { View, Text, Dimensions, TextInput } from 'react-native'
import React from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import Button from '../../components/Button';
import ButtonRetour from '../../components/ButtonRetour';
const windowWidth = Dimensions.get('window').width;

const RenwPolice = ({ navigation }) => {
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <TitleWrapper title={"ENTREZ LA POLICE"} desc={"Pour pour renouveler votre assurance frontière"}/>
      <View style={{marginLeft: windowWidth * 0.04}}>
       <ButtonRetour navigation={navigation}/>
      </View>
      <View style={{width: windowWidth * 0.9, alignSelf: "center", alignItems: "center", justifyContent: "center", flex: 1}}>
            <TextInput
                  placeholder='N° de la police'
                  placeholderTextColor={"#B2BECC"}
                  style={
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000",
                          borderColor: "#1e85fe4d",
                          borderWidth: 2,
                          width: "100%"
                      }}
                  />
          <View style={{marginTop: 25, width: windowWidth * 0.9,marginBottom: windowWidth * 0.09 ,alignSelf: "center"}}>
              <Button title={'Suivant'} functions={() => navigation.navigate('Renew')}/>
            </View>
      </View>
    </View>
  )
}

export default RenwPolice