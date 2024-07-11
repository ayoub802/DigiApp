import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import Logo from "../../assets/logo.png"
import { useNavigation } from '@react-navigation/native'
import { ApiKey } from '../../hooks/ApiKey'
import { AuthContext } from '../../context/AuthContext'
import { getCode, saveToken } from '../../modules/GestionStorage'
import Feather from "react-native-vector-icons/Feather"
import OTPTextView from 'react-native-otp-textinput';
import { useTranslation } from 'react-i18next'
import { PostResetPassword } from '../../modules/GestionApi'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChangePassword = ({navigation}) => {
    const [selectedLang, setSelectedLang] = useState(1);
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [dataCode, setDataCode] = useState({})
    const {t} = useTranslation();
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

    useEffect(() => {
       const fetchValue = async () => {
        const responseCode = await getCode();
        console.log("The Data => ", responseCode);
        setDataCode(responseCode)
       }
       fetchValue();
    }, [])

    console.log("The Data Code => ", dataCode);
    const handleLangClick = (lang) => {
        setSelectedLang(lang);
    };

    const onSumbit = async () => {
       const response= await PostResetPassword({token: dataCode.token,password,re_password: confirmPass, uid: dataCode.uidb64,setLoading, navigation });
    }

  return (
     <View style={{flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "column", backgroundColor: "#fff"}}>
        <View style={styles.langWrapper}>
            {/* {
                languages.map((item, index) => (
                    <React.Fragment key={item.id}>
                    <TouchableOpacity onPress={() => handleLangClick(item.id)}>
                        <Text style={item.id === selectedLang ? styles.langTextActive : styles.langText}>{item.text}</Text>
                    </TouchableOpacity>
                    <Text key={`slash_${item.id}`}>{item.slach}</Text>
                </React.Fragment>
                ))
            } */}
        </View>
        <View>
            <Image style={styles.logoImage} source={Logo}/>
        </View>
        <View style={styles.bottomWrapper}>
            <Text style={styles.bottomText}>
            {t('Change Password')}
            </Text>
            <Text style={{marginBottom: windowWidth * 0.04, textAlign: "center", color: 'rgba(28, 36, 56, 0.87)'}}>
            {t('Entrez votre email et nous vous enverrons des instructions pour réinitialiser votre mot de passe')}
            </Text>


                    <View style={styles.bottomTextInputWrapper}>
                        <View style={styles.bottomtextInput}>
                         <TextInput 
                                placeholder={t('New password')}
                                // style={styles.bottomtextInput}
                                placeholderTextColor={"#546274"}
                                secureTextEntry={showPassword}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.bottomEye}>
                                    <Feather 
                                    name={!showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color="#000"
                                    />
                                </TouchableOpacity>
                        </View>
                        <View style={styles.bottomtextInput}>
                                <TextInput 
                                placeholder={t('Confirm password')}
                                // style={styles.bottomtextInput}
                                placeholderTextColor={"#546274"}
                                secureTextEntry={showPassword}
                                value={confirmPass}
                                onChangeText={(text) => setConfirmPass(text)}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.bottomEye}>
                                    <Feather 
                                    name={!showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color="#000"
                                    />
                                </TouchableOpacity>
                        </View>

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
export default ChangePassword