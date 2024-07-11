import { View, Text , ScrollView, Dimensions, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TitleWrapper from '../../components/TitleWrapper'
const windowWidth = Dimensions.get('window').width;
import Signature from 'react-native-signature-canvas';
import CreditCard, {CardImages} from 'react-native-credit-card';
import Check from "../../assets/card.png"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonRetour from '../../components/ButtonRetour';

const Payment = ({ navigation }) => {

    console.log(windowWidth * 0.18);
    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
    const swiperRef = useRef(null);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState();
    const [isDiplsay, setIsDisplay] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({
        focused: 'name',
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        index: 0,
        type: 'visa',
        restoring: false,
      });

    
    //   useEffect(() => {
    //     const fetchImages = async () => {
    //       await cacheImages([
    //         require('../../assets/Check.png'),
    //         require('../../assets/Check.png'),
    //       ]);
    //     };
    
    //     fetchImages();
    //   }, []);



      if (state.restoring) {
        return null;
      }

      const formatExpiryDate = (input) => {
        // Format the expiration date as MM/YY
        const formattedDate = input.replace(/\D/g, '').slice(0, 4);
        const month = formattedDate.slice(0, 2);
        const year = formattedDate.slice(2);
        return `${month}/${year}`;
    };

    const handleExpiryChange = (expiry) => {
        // If the input is empty, clear the field
        if (!expiry) {
            setState((prevState) => ({ ...prevState, expiry: '' }));
            return;
        }

        // Format the expiration date as MM/YY
        const formattedExpiry = formatExpiryDate(expiry);

        // Update state
        setState((prevState) => ({ ...prevState, expiry: formattedExpiry }));
    };

    const data = [
        { label: 'M-pesa', value: '1' },
        { label: 'Orange Money', value: '2' },
        { label: 'Aritel Money', value: '3' },
        { label: 'Afrimoney', value: '4' },
      ];

      const ToggleMobile = () => {
        setIsOpen(!isOpen)
        setIsDisplay(false)
      }

      const renderLabel = () => {
        if (value || isFocus) { 
          return (
            <Text style={[styles.label, isFocus && { color: '#1e85fe' }]}>
              Mobile Money
            </Text>
          );
        }
        return null;
      };
      

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
        <ScrollView style={{flex: 1}}>
           <TitleWrapper title={"TARif de votre prime d’assurance"}/>
           


           <View style={{width: windowWidth * 0.8, alignSelf: "center", marginTop: - windowWidth * 0.1 ,marginBottom: windowWidth * 0.2}}>
               <ButtonRetour navigation={navigation}/>
               <Text style={{color: "#B2BECC", textAlign: "center", fontFamily: "Roboto-Medium",fontSize: windowWidth * 0.045, lineHeight: windowWidth * 0.08}}>Devise</Text>
               <View style={{justifyContent: "center", alignItems: "center", marginTop: windowWidth * 0.02, backgroundColor: "#1E85FF", width: windowWidth * 0.12, borderRadius: windowWidth * 0.15, alignSelf: "center", height: windowWidth * 0.05}}>
                <Text style={{color: "#fff"}}>$</Text>
               </View>

               <View style={{marginTop: windowWidth * 0.1,justifyContent: "center",alignItems: "center" ,marginBottom: windowWidth * 0.2, width: "100%", borderWidth: 2, borderColor: "#1e85fe4d", borderRadius: 5, height: windowWidth * 0.15}}>
                  <Text style={{textAlign: "center", color: "#1E85FF", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Bold"}}>Prime d’assurance : 1000 $ TTC</Text>
               </View> 

               <View>
                <TouchableOpacity onPress={() => {setIsDisplay(!isDiplsay); setIsOpen(false)}} style={{justifyContent: "center",alignItems: "center" ,marginBottom: windowWidth * 0.05, width: "100%", backgroundColor: "#162E4A", borderRadius: 5, height: windowWidth * 0.16}}>
                   <Text style={{textAlign: "center", color: "#fff", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Bold"}}>Carte Bancaire</Text>
                </TouchableOpacity>
               </View>
               <View>
                <TouchableOpacity onPress={ToggleMobile} style={{justifyContent: "center",alignItems: "center" ,marginBottom: windowWidth * 0.05, width: "100%", borderWidth: 2, borderColor: "#1e85fe4d", borderRadius: 5, height: windowWidth * 0.16}}>
                   <Text style={{textAlign: "center", color: "#B2BECC", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Bold"}}>Mobile Money</Text>
                </TouchableOpacity>
               </View>
               {
                isOpen
                ?
               <View >
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        itemTextStyle={{color: "#000", height: 20}}
                        minHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Mobile Money' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                        }}
                    />
               </View>
                :
                <></>
               }

               {
                isDiplsay 
                ?
                <>
                    <View style={{position: 'relative'}}>
                        <CreditCard
                                style={{
                                    marginVertical: 10,
                                    marginBottom: 0,
                                    elevation: 3,
                                    alignSelf: 'center',
                                    backgroundColor: "#999999",
                                    width: windowWidth * 0.8
                                }}
                                // imageFront={require('../../assets/Check.png')}
                                // imageBack={require('../../assets/Check.png')}
                                shiny={false}
                                bar={true}
                                focused={state.focused}
                                number={state.number}
                                name={state.name}
                                expiry={state.expiry}
                                cvc={state.cvc}
                            />
                            

                    </View>

                    

                        <TextInput
                        placeholder='Nom du Titulaire *'
                        placeholderTextColor={"#B2BECC"}
                        style={
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.038,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Bold",
                                fontSize: windowWidth * 0.035,
                                borderColor: "#1e85fe4d",
                                borderWidth: 2,
                                marginTop: windowWidth * 0.05,
                                color: "#000"
                            }}
                            onFocus={() => setState({ ...state, focused: 'name' })}
                        onChangeText={name => setState((prevState) => ({ ...prevState, name }))}
                        value={state.name}
                        />
                        <TextInput
                        placeholder='Numéro de la Carte *'
                        placeholderTextColor={"#B2BECC"}
                        keyboardType='numeric'
                        style={
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.038,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Bold",
                                fontSize: windowWidth * 0.035,
                                borderColor: "#1e85fe4d",
                                borderWidth: 2,
                                marginTop: windowWidth * 0.05,
                                color: "#000"
                            }}
                            onFocus={() => setState({ ...state, focused: 'number' })}
                        onChangeText={number => setState((prevState) => ({ ...prevState, number }))}
                        value={state.number}
                        />

                        <View style={{flexDirection: "row",justifyContent: "space-between", alignItems: "center", gap: windowWidth * 0.02, marginBottom: windowWidth * 0.05,}}>

                        <TextInput
                        placeholder="Date d'expiration *"
                        placeholderTextColor={"#B2BECC"}
                        keyboardType='numeric'
                        style={
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.038,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Bold",
                                fontSize: windowWidth * 0.035,
                                borderColor: "#1e85fe4d",
                                borderWidth: 2,
                                marginTop: windowWidth * 0.05,
                                width: windowWidth * 0.37,
                                color: "#000"
                            }}
                            onFocus={() => setState({ ...state, focused: 'expiry' })}
                            onChangeText={expiry => handleExpiryChange(expiry)}

                        value={state.expiry}
                        />

                    <TextInput
                        placeholder='CVC *'
                        placeholderTextColor={"#B2BECC"}
                        keyboardType='numeric'
                        style={
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.038,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Bold",
                                color: "#000",
                                fontSize: windowWidth * 0.035,
                                borderColor: "#1e85fe4d",
                                borderWidth: 2,
                                marginTop: windowWidth * 0.05,
                                width: windowWidth * 0.37
                            }}
                            onFocus={() => setState({ ...state, focused: 'cvc' })}
                        onChangeText={cvc => setState((prevState) => ({ ...prevState, cvc }))}
                        value={state.cvc}
                        />

                        </View>
                </>
                :
                <></>
               }
               <View>
                <TouchableOpacity onPress={() => navigation.navigate('Valide')} style={{justifyContent: "center",alignItems: "center" , width: "100%", backgroundColor: "#1E85FE", borderRadius: 5, height: windowWidth * 0.16}}>
                   <Text style={{textAlign: "center", color: "#fff", fontSize: windowWidth * 0.04, fontFamily: "Roboto-Bold"}}>Passer au paiement</Text>
                </TouchableOpacity>
               </View>

                
           </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 55,
        borderColor: '#1e85fe',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 18,
        paddingRight: 10,
        marginBottom: windowWidth * 0.05
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 12,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        color: '#1e85fe',
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color: "#666"
      },
      selectedTextStyle: {
        fontSize: 16,
        color: "#000"
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
})

export default Payment