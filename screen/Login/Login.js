import { View, Text, TouchableOpacity,FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Button, StyleSheet, Dimensions, Pressable, Alert } from 'react-native'
import React, { useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import styles from './style'
import Logo from "../../assets/logo.png"
import { useNavigation } from '@react-navigation/native'
import { ApiKey } from '../../hooks/ApiKey'
import { useAuth } from '../../context/useAuth'
import { AuthContext } from '../../context/AuthContext'
import { getLanguage, saveLanguage, saveToken } from '../../modules/GestionStorage'
import Feather from "react-native-vector-icons/Feather"
import { useTranslation } from 'react-i18next'
import i18n from '../../language/i18n'
import HeaderLang from '../../components/HeaderLang'
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { Controller, useForm } from 'react-hook-form'
import { usePaymentSheet, useStripe } from '@stripe/stripe-react-native'
import DatePicker from 'react-native-date-picker';
import YearPicker from '../../components/YearPicker'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {

    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            Email: 'ymahtat@weelite.pro',
            Pasword: 'aA000000'
        }
    });
	const [showDrawer, setShowDrawer] = useState(false);
	const [event, setEvent] = useState('none');
    const {t} = useTranslation();
    const [ready, setReady] = useState(false)
    const [selectedLang, setSelectedLang] = useState(1);
    const [email, setEmail] = useState("ymahtat@weelite.pro")
    const [password, setPassword] = useState("aA000000")
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isDate, setIsDate] = useState(new Date())
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
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

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

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
    const handleLangClick = async (lang, code) => {
        i18n.changeLanguage(code)
        console.log("The Language Text => ", code);
        setSelectedLang(lang.id);
        saveLanguage(lang)
    };

    const onSubmit = (data) => {
        // const { email, password } = data

        console.log("The Data => ", data);
        
        console.log("The Email => ", email , " The Password => ", password);
        login(email, password,setLoading);
      }
    const navigation = useNavigation();
    console.log("The Process of ENV => ", ApiKey);

  return (

  <View style={{flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "column", backgroundColor: "#fff"}}>
      <HeaderLang />

        <View>
            <Image style={styles.logoImage} source={Logo}/>
        </View>
        <View style={styles.bottomWrapper}>
            <Text style={styles.bottomText}>
            {t('Connectez-vous')}
            </Text>
                    <View style={styles.bottomTextInputWrapper}>
                        <Controller 
                         control={control}
                         render={({field: { onChange, onBlur, value }}) => (
                            <>
                                {
                                    errors.Email && 
                                    (
                                        <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                                            {
    
                                            errors.Email.message
                                            }
                                        </Text>
                                    )
                                }
                             <TextInput 
                             placeholder={t('Adresse email')}
                             style={styles.bottomtextInput}
                             placeholderTextColor={"#546274"}
                             value={email}
                             onChangeText={(text) => {setEmail(text), onChange(text)}}
                             />
                            </>
                         )}
                         name="Email" 
                          rules={{ 
                            required: 'Email est obligatoire',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Adresse email invalide'
                            }
                        }}
                        />
    
                            {/* <TextInput 
                        //      placeholder={t('Adresse email')}
                        //      style={styles.bottomtextInput}
                        //      placeholderTextColor={"#546274"}
                        //      value={email}
                        //      onChangeText={(text) => {setEmail(text)}}
                        //      /> */}
                        
                        <Controller 
                         control={control}
                         render={({field: { onChange, onBlur, value }}) => (
                            <>
                                {
                                    errors.Pasword && 
                                    (
                                        <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                                            {
                                            errors.Pasword.message
                                            }
                                        </Text>
                                    )
                                }
                                <View style={styles.bottomtextInput}>
                                    <TextInput 
                                    placeholder={t('Mot de passe')}
                                    // style={styles.bottomtextInput}
                                    placeholderTextColor={"#546274"}
                                    secureTextEntry={showPassword}
                                    value={password}
                                    onChangeText={(text) => {onChange(text); setPassword(text)}}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.bottomEye}>
                                        <Feather 
                                        name={!showPassword ? "eye-off" : "eye"}
                                        size={20}
                                        color="#000"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                         )}
                         name="Pasword"
                         rules={{ 
                            required: 'Pasword est obligatoire',
                            minLength: {
                                value: 8,
                                message: 'Le mot de passe doit comporter au moins 8 caractères'
                            }
                        }}
                        />
                                {/* <TextInput 
                                placeholder={t('Mot de passe')}
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
                                </TouchableOpacity> */}
                        {/* </View> */}
                    </View>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.bottomButton}>
                        {
                            loading
                            ?
                            <ActivityIndicator size={"small"} color={"#fff"}/>
                            :
                            <Text style={styles.bottomButtonText}>{t('Connexion')}</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.motPassButton} onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={styles.motPassButtonText}>{t('Mot de passe oublié')}</Text>
                    </TouchableOpacity>
        </View>
  </View>


  ) 
}

export default Login

