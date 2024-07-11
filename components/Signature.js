import { View, Text, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import SignatureScreen from 'react-native-signature-canvas';
const windowWidth = Dimensions.get('window').width;

const Signature = ({ setScrollEnabled }) => {

    const ref = useRef();
    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        console.log(signature);
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
        setScrollEnabled(true);
    };
    const handleBegin = () => {
        setScrollEnabled(false); // Disable scrolling when signature begins
    };
    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };

    const imgWidth = windowWidth * 0.65;
const imgHeight = 150;
const style = `.m-signature-pad {box-shadow: none; border: none; border: 2px solid #1e85fe4d; border-radius: 8px; width: 100%; margin-inline: auto;backgroundColor: "#000"} 
              .m-signature-pad--body {border: none;border-radius: 8px; width: 100%; margin-inline: auto;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: 100%; height: ${imgHeight}px;}`;
  return (
    <View style={{ width: "100%", height: imgHeight, alignSelf: "center", justifyContent: "center",alignItems: "center", marginTop: windowWidth * 0.032 }}>
        <SignatureScreen
            ref={ref}
            onEnd={handleEnd}
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            onBegin={handleBegin}
            webStyle={style}
        />
    </View>
  )
}

export default Signature