import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
       marginBottom: windowWidth * 0.05
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
        backgroundColor: "#a1409d",
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
    },
    motPassButtonText:{
        color: "#a1409d",
        fontSize: 15,
        fontFamily: "Roboto-Regular",
        textAlign: "center"
    },
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
      },
      text: {
        fontSize: 16,
        color: 'gray',
      },
      textBold: {
        fontSize: 16,
        fontWeight: '500',
      },
    
      button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
      },
  
})

export default styles;