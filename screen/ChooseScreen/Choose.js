import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import ButtonRetour from '../../components/ButtonRetour';
import { useTranslation } from 'react-i18next';
const windowWidth = Dimensions.get('window').width;

const Choose = ({ navigation }) => {
  const {t} = useTranslation();

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
       <View style={{marginTop: windowWidth * 0.1, marginLeft: windowWidth * 0.04}}>
        <ButtonRetour navigation={navigation}/>
      </View>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
          <View style={{width: windowWidth * 0.9,alignSelf: "center"}}>
              <Button title={t('Personne Physique')} functions={() => navigation.navigate('Souscrire', {isMoral: true})}/>
          </View>
          <View style={{marginTop: 15, width: windowWidth * 0.9,marginBottom: windowWidth * 0.09 ,alignSelf: "center"}}>
              <Button title={t('Personne Morale')} functions={() => navigation.navigate('Souscrire', {isMoral: false})}/>
          </View>
      </View>
    </View>
  )
}

export default Choose