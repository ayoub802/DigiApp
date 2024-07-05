import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getLanguage, saveLanguage } from '../modules/GestionStorage';
import i18n from '../language/i18n';
const windowWidth = Dimensions.get('window').width;
const HeaderLang = () => {
    const [selectedLang, setSelectedLang] = useState(1);
    
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
        fetchLang()
    }, [])
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
  return (
    <View style={styles.langWrapper}>
    {
        languages.map((item, index) => (
            <React.Fragment key={item.id}>
            <TouchableOpacity onPress={() => handleLangClick(item, item.text)}>
                <Text style={item.id === selectedLang ? styles.langTextActive : styles.langText}>{item.text}</Text>
            </TouchableOpacity>
            <Text key={`slash_${item.id}`}>{item.slach}</Text>
        </React.Fragment>
        ))
    }
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
   
})
export default HeaderLang