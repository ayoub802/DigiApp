import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    SupportWrapper:{
       width: windowWidth * 0.65,
       alignSelf: "center",
       flexDirection: "column",
       gap: 20
    },
    SupportBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#162E4A",
        paddingTop: 20,
        paddingHorizontal: 13,
        paddingBottom: 18,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    SuportStyle: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        lineHeight: 16,
        textAlign: "center"
    },
    buttonRetour:{
        marginLeft: windowWidth * 0.04,
        marginBottom: windowWidth * 0.04,
    }

})

export default styles;