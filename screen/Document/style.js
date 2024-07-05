import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    DocumentWrapper:{
       width: windowWidth * 0.85,
       alignSelf: "center",
       flexDirection: "column",
       gap: 20
    },
    DocumentBox:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#162E4A",
        paddingTop: 10,
        paddingHorizontal: 13,
        paddingBottom: 12
    },
    titleDoc:{
        fontSize: 15,
        fontFamily: "Roboto-Black",
        color: "#162E4A",
        lineHeight: 32,
    },
    textDocComp: {
        fontSize: 15,
        fontFamily: "Roboto-Medium",
        color: "#162E4A",
        lineHeight: 32,
    },
    docWrapper:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: windowWidth * 0.01
    }
})

export default styles;