import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import Logo from "../../assets/logo.png"
import { useNavigation } from '@react-navigation/native'
import { ApiKey } from '../../hooks/ApiKey'
import { AuthContext } from '../../context/AuthContext'
import { getLanguage, removeLanguage, saveEmailCode, saveLanguage, saveToken } from '../../modules/GestionStorage'
import Feather from "react-native-vector-icons/Feather"
import { useTranslation } from 'react-i18next'
import i18n from '../../language/i18n'
import HeaderLang from '../../components/HeaderLang'
import { PostResetEmail } from '../../modules/GestionApi'
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ResetPass = () => {
    const [selectedLang, setSelectedLang] = useState(1);
    const [email, setEmail] = useState("ayesnaari@gmail.com")
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation();


 
    // callbacks

    // DEFAUL LOGIN
    //  "email": "ymahtat@weelite.pro",
    //  "password": "aA000000"

    useEffect(() => {
        const fetchLang = async () => {
            try{
               const response = await getLanguage();
               setSelectedLang(response.id)
               console.log("The Response => ", response);
            }
            catch(error){
                console.log("The error => ", error);
            }
        }
        const removetokefromasyn = async () => {
        await saveToken('');
        }
        fetchLang()
        removetokefromasyn()
    }, [])


    
    // const auth = useAuth()
    const {isLoading, login} = useContext(AuthContext);
    const languages = [
        {
            id: 1,
            text: "fr",
            slach: "/"
        },
        {
            id: 2,
            text: "en"
        },
    ]

    const handleLangClick = (lang, code) => {
        removeLanguage()
        i18n.changeLanguage(code)
        setSelectedLang(lang.id);
        saveLanguage(lang)
    };

    const onSubmit = async () => {
        // const { email, password } = data
        // console.log("The Email => ", email);
        // const responseEmail = await PostResetEmail({email, setLoading, navigation});
        // saveEmailCode(email)
        navigation.navigate('OTP')
        // console.log("The Response => ", responseEmail);
      }
    const navigation = useNavigation();
    console.log("The Process of ENV => ", ApiKey);
  return (
    <View style={{flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "column", backgroundColor: "#fff"}}>
        {/* <HeaderLang /> */}
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
                        <TextInput 
                        placeholder={t('Adresse email')}
                        style={styles.bottomtextInput}
                        placeholderTextColor={"#546274"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        />

                    </View>
                    <TouchableOpacity onPress={onSubmit} style={styles.bottomButton}>
                        {
                            loading
                            ?
                            <ActivityIndicator size={"small"} color={"#fff"}/>
                            :
                            <Text style={styles.bottomButtonText}>{t('Réinitialiser votre mot de passe')}</Text>
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
export default ResetPass

