import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import Logo from "../../assets/logo.png"
import { useNavigation } from '@react-navigation/native'
import { ApiKey } from '../../hooks/ApiKey'
import { AuthContext } from '../../context/AuthContext'
import { getEmailCode, saveToken } from '../../modules/GestionStorage'
import Feather from "react-native-vector-icons/Feather"
import OTPTextView from 'react-native-otp-textinput';
import { useTranslation } from 'react-i18next'
import { PostValidateCode } from '../../modules/GestionApi'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const OTP = ({navigation}) => {
    const [selectedLang, setSelectedLang] = useState(1);
    const [email, setEmail] = useState("yayoub2017@gmail.com")
    const [codeValue, setCodeValue] = useState("")
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation();

    useEffect(() => {
        const fetValue = async () => {
           try{
              const email_reset = await getEmailCode();
              console.log("The Emails => ", email_reset);
           }
           catch(err){
            console.log("The Error => ", err);
           }
        }
        
        fetValue()
    }, [])


    const onSumbit = async () => {
       const response = await PostValidateCode({email, codeValue, setLoading,navigation});
    //    navigation.navigate('ChangePassword')
    //    saveCode(response)
       console.log("The Value => ", response);
    }

   console.log("The Value Code => ", codeValue);
  return (
     <View style={{flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "column", backgroundColor: "#fff"}}>
          <View></View>
        <View>
            <Image style={styles.logoImage} source={Logo}/>
        </View>
        <View style={styles.bottomWrapper}>
            <Text style={styles.bottomText}>
            {t('Mot de passe oublié')} ?
            </Text>
            <Text style={{marginBottom: windowWidth * 0.04, textAlign: "center", color: 'rgba(28, 36, 56, 0.87)'}}>
            {t('Entrez votre email et nous vous enverrons des instructions pour réinitialiser votre mot de passe')}
            </Text>


                    <View style={styles.bottomTextInputWrapper}>
                       <OTPTextView
                            containerStyle={{marginBottom: 20,}}
                            textInputStyle={{
                                borderRadius: 10,
                                borderWidth: 2.5,
                            }}
                            defaultValue={codeValue}
                            handleTextChange={(text) => setCodeValue(text)}
                            tintColor={"#1E85FF"}
                            inputCount={6}
                            inputCellLength={1}
                            />

                    </View>
                    <TouchableOpacity onPress={onSumbit} style={styles.bottomButton}>
                        {
                            loading
                            ?
                            <ActivityIndicator size={"small"} color={"#fff"}/>
                            :
                            <Text style={styles.bottomButtonText}>{t('Valider')}</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.motPassButton}>
                    <Feather name="arrow-left" color="#1E85FF" size={20}/>
                        <Text style={styles.motPassButtonText}>{t('Retour')}</Text>
                    </TouchableOpacity>
        </View>
     </View>
  )
}

const styles = StyleSheet.create({
    langWrapper : {
       flexDirection: "row",
       alignItems: "center",
       marginTop: windowWidth * 0.05,
    },
    langText : {
        fontFamily:"Roboto-Regular",
        fontSize: 14,
        lineHeight: 16,
        color: "#546274",
        textTransform: "uppercase"
    },
    langTextActive:{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        lineHeight: 16,
        color: "#546274",
        textTransform: "uppercase"
    },
    logoImageWrapper:{
        width: windowWidth * 0.9,
        height: windowWidth * 0.9,
        alignSelf: "center",
    },
    logoImage: {
        width: windowWidth * 0.85,
        height: windowWidth * 0.85,
        objectFit: "contain"
    },
    bottomWrapper :{
        flexDirection:"column",
        width: windowWidth * 0.8,
        marginBottom: windowWidth * 0.09,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomText:{
       fontFamily: "Roboto-Bold",
       fontSize: windowWidth * 0.05,
       color: "#000000",
       textAlign: "center",
       marginBottom: windowWidth * 0.01
    },
    bottomTextInputWrapper:{
      flexDirection: "column",
      gap: 10,
      width: "100%",
    },
    bottomtextInput : {
        borderRadius: 50,
        backgroundColor: '#F1F5F8',
        width: "100%",
        paddingLeft: windowWidth * 0.07,
        // paddingVertical: windowWidth * 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: windowHeight * 0.07,
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        // lineHeight: 38,
        color: "#000"
    },
    bottomEye: {
      paddingRight: windowWidth * 0.05
    },  
    bottomButton:{
        width: "100%",
        height: windowWidth * 0.12,
        backgroundColor: "#1E85FF",
        borderRadius: 50,
        paddingTop: windowWidth * 0.03,
        marginTop: windowWidth * 0.04
    },
    bottomButtonText:{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        textAlign: "center",
        color: "#fff"
    },
    motPassButton:{
        marginTop: windowWidth * 0.03,
        textAlign: "center",
        flexDirection: "row",
        gap: 5
    },
    motPassButtonText:{
        color: "#1E85FF",
        fontSize: 15,
        fontFamily: "Roboto-Regular",
        textAlign: "center"
    }
  
})
export default OTP