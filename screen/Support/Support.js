import { View, Text, TouchableOpacity, Image, TextInput,ScrollView } from 'react-native'
import React, { useState } from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import styles from './style'
import { support } from '../../constant'
import Textarea from 'react-native-textarea';
import Button from '../../components/Button'
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'
import ButtonRetour from '../../components/ButtonRetour'
import { getToken } from '../../modules/GestionStorage'
import axios from 'axios'
import { ApiKey } from '../../hooks/ApiKey'

const Support = () => {
    // const { control, handleSubmit, setValue } = useForm();
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [isChecked, setIsChecked] = useState(0);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
      console.log("The Data => ",data);
        // // Handle form submission here
        setLoading(true)
        try{
           const token = await getToken();
           
  
           const response = await axios.post(
            `${ApiKey}/support/reclamation/`,
              {
                object: data.problem,
                message: data.description,
            },
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token.access,
                },
            }
            );
  
           console.log("The token => ", response.data);
        }
        catch(error){
          console.log("The Error => ", error.response.data);
        }
        finally {
          setLoading(false);
        }
      };
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <TitleWrapper title={"support"} desc={"Une question ?"}/>
        <View style={styles.buttonRetour}>
            <ButtonRetour navigation={navigation}/>
        </View>
        <View style={styles.SupportWrapper}>
          {
              support.map((item, index) => (
                  <TouchableOpacity onPress={() => setIsChecked(item.id)} style={[isChecked == item.id ?{backgroundColor: "#162E4A"} :  {backgroundColor: "#fff"} ,styles.SupportBox]} key={index}>
                      <Image source={item.id == isChecked ? item.imageHover : item.image} style={{marginBottom: 25}}/>
                    <Text style={[isChecked == item.id ? {color: "#fff"} : {color: "#162E4A"} ,styles.SuportStyle]}>{item.title}</Text>
                  </TouchableOpacity>
              ))
          }

          {/* <TextInput 
            placeholder='Quel est votre problème ?'
            placeholderTextColor={"#B2BECC"}
            style={{borderWidth: 2, borderColor: "#1e85fe4d", borderRadius: 5, paddingLeft: 18, paddingVertical: 15, fontFamily: "Roboto-Bold"}}
          /> */}

          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
              //   {...field}
                placeholder='Quel est votre problème ?'
                placeholderTextColor={"#B2BECC"}
                style={{
                  borderWidth: 2,
                  borderColor: "#1e85fe4d",
                  borderRadius: 5,
                  paddingLeft: 18,
                  paddingVertical: 15,
                  fontFamily: "Roboto-Bold",
                  color: "#000"
                }}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="problem" // Replace with your desired form field name
          />
          
          {/* <Textarea 
            placeholder="Décrivez-nous votre problème"
            placeholderTextColor={"#B2BECC"}
            containerStyle={{height: 130}}
            style={{borderWidth: 2, textAlignVertical: 'top',height: 150, borderColor: "#1e85fe4d", borderRadius: 5, paddingLeft: 18, paddingVertical: 15, fontFamily: "Roboto-Bold"}}
            
          /> */}

          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <Textarea
              //   {...field}
                placeholder="Décrivez-nous votre problème"
                placeholderTextColor={"#B2BECC"}
                containerStyle={{ height: 130 }}
                style={{
                  borderWidth: 2,
                  textAlignVertical: 'top',
                  height: 150,
                  borderColor: "#1e85fe4d",
                  borderRadius: 5,
                  paddingLeft: 18,
                  paddingVertical: 15,
                  fontFamily: "Roboto-Bold",
                  color: "#000"
                }}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="description" // Replace with your desired form field name
          />

          <View style={{marginTop: 25, marginBottom: 50}}>
            <Button title={'Envoyer votre demande'} isLoading={loading} functions={handleSubmit(onSubmit)}/>
          </View>
            
        </View>
      </ScrollView>
    </View>
  )
}

export default Support