import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    HomeContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#fff"
    },
    HomeBox:{
        width: windowWidth * 0.8,
        borderColor: "#a1409d",
        borderWidth: 1,
        height: windowWidth * 0.27,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    HomeBoxText:{
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        textTransform: "capitalize"
    },
    HomeBoxPressed: {
        backgroundColor: '#162E4A',
     },
     imagBox:{
        width: windowWidth * 0.13,
        height: windowWidth * 0.13,
        marginBottom: 10
     }
})

export default styles;