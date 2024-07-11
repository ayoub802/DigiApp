import { View, Text, ScrollView, Dimensions, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button';
import ButtonRetour from '../../components/ButtonRetour';
import axios from 'axios';
import { ApiKey } from '../../hooks/ApiKey';
import { getToken } from '../../modules/GestionStorage';
const windowWidth = Dimensions.get('window').width;
import { TextInput as PaperTextInput } from 'react-native-paper';

const Souscrire = (props) => {
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("");

    const isMoral = props.route.params.isMoral;

    // console.log("The Moral Values => ", isMoral);
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();

    // console.log("Size =>",windowWidth * 0.038);

    const onSubmit = async (data) => {
        props.navigation.navigate("SouscrirV2")

        // Handle form submission here
        // console.log("The Data => : ",data);
        setLoading(true)
        const token = await getToken();
        // 
        try{

        //   const response = await axios.post(`${ApiKey}/accounts/insureds/`, {
        //     first_name: data.Prenom == "" ? null : data.Prenom ,
        //     last_name: data.Nom == "" ? null : data.Nom,
        //     email: data.email,
        //     phone: data.telephone,
        //     address: data.adress,
        //     company: data.raison == "" ? null : data.raison
        //   },
        //   {
        //     headers: {
        //         Authorization: `Bearer ${token.access}`,
        //     },
        // }
        const response = await axios.post(
            `${ApiKey}/accounts/insureds/`,
            {
                first_name: data.Prenom == "" ? null : data.Prenom,
                last_name: data.Nom == "" ? null : data.Nom,
                email: data.email,
                phone: data.telephone,
                account_type: isMoral == true ? "physique" : "moral",
                address: data.adress,
                company: data.raison == "" ? null : data.raison
            },
            {
              headers: {
                Authorization: 'Bearer' + token.access,
              },
            }
          );

          console.log("The Response is => ", response);
          if(response){
            props.navigation.navigate("SouscrirV2")
          }
        }
        catch(error){
            console.log("Error Details:", error.response.data);
        }
        finally{
            setLoading(false)
        }
      };

      const customTheme = {
        colors: {
          placeholder: '#ffffff', // Replace this with the color you want for the placeholder text
        },
      };
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false}>
      <TitleWrapper title={"ENTREZ VOS INFORMATIONS"} desc={"Pour souscrire à une assurance frontière"}/>
      <View style={{ marginLeft: windowWidth * 0.04}}>
        <ButtonRetour navigation={props.navigation}/>
      </View>


        <View style={{width: windowWidth * 0.9, alignSelf: "center", flexDirection: "column", gap: windowWidth * 0.02}}>
        {
                isMoral != true
                ?
                <></>
                :
                <>
                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
                        <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                          {errors.Nom && 'Champ Obligatoire'}
                        </Text>
                        {/* <TextInput
                        placeholder='Nom *'
                        placeholderTextColor={"#B2BECC"}
                        style={
                            [
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.044,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Medium",
                                fontSize: windowWidth * 0.04,
                                color: "#000"
                            },
                            errors.Nom ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                            errors.Nom ? { borderWidth: 1 } : {borderWidth: 2}, 
                            ]}
                        onChangeText={value => onChange(value)}
                        value={value}
                        /> */}
                            <PaperTextInput
                                mode='outlined'
                                label="Nom *"
                                value={value}
                                onChangeText={value => onChange(value)}
                                outlineColor={errors.Nom ? '#ff3d5780' : '#1e85fe4d'}
                                activeOutlineColor='#1e85fe'
                                style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                                theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                            />
                        </>
                        
                    )}
                    name="Nom" // Replace with your desired form field name
                    rules={{ required: 'Nom est obligatoire' }}
                    />

                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
                        <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                        {errors.Prenom && 'Champ Obligatoire'}
                        </Text>
                        {/* <TextInput
                        placeholder='Prénom *'
                        placeholderTextColor={"#B2BECC"}
                        style={
                            [
                                {
                                // borderColor: "#1e85fe4d",
                                borderRadius: 5,
                                paddingLeft: windowWidth * 0.044,
                                paddingVertical: windowWidth * 0.037,
                                fontFamily: "Roboto-Medium",
                                fontSize: windowWidth * 0.04,
                                color: "#000"
                            },
                            errors.Prenom ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                            errors.Prenom ? { borderWidth: 1 } : {borderWidth: 2}, 
                            ]}
                        onChangeText={value => onChange(value)}
                        value={value}
                        /> */}
                        <PaperTextInput
                                mode='outlined'
                                label="Prenom *"
                                value={value}
                                onChangeText={value => onChange(value)}
                                outlineColor={errors.Prenom ? '#ff3d5780' : '#1e85fe4d'}
                                activeOutlineColor='#1e85fe'
                                style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                                theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                            />
                        </>
                    )}
                    name="Prenom" // Replace with your desired form field name
                    rules={{ required: 'Prenom est obligatoire' }}
                    />
                </>
        }
            
         {
                isMoral== true
                ?
                <></>
                :
                <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <>
                    <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                    {errors.raison && 'Champ Obligatoire'}
                    </Text>
                    {/* <TextInput
                    placeholder='Raison sociale *'
                    placeholderTextColor={"#B2BECC"}
                    style={
                        [
                            {
                            // borderColor: "#1e85fe4d",
                            borderRadius: 5,
                            paddingLeft: windowWidth * 0.044,
                            paddingVertical: windowWidth * 0.037,
                            fontFamily: "Roboto-Medium",
                            fontSize: windowWidth * 0.04,
                            color: "#000"
                        },
                        errors.raison ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                        errors.raison ? { borderWidth: 1 } : {borderWidth: 2}, 
                        ]}
                    onChangeText={value => onChange(value)}
                    value={value}
                    /> */}
                    <PaperTextInput
                            mode='outlined'
                            label="Raison sociale *"
                            value={value}
                            onChangeText={value => onChange(value)}
                            outlineColor={errors.raison ? '#ff3d5780' : '#1e85fe4d'}
                            activeOutlineColor='#1e85fe'
                            style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                            theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                        />
                    </>
                )}
                name="raison" // Replace with your desired form field name
                rules={{ required: 'raison est obligatoire' }}

                />
            }


            <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                <>
                    <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                    {errors.adress && 'Champ Obligatoire'}
                    </Text>
                    {/* <TextInput
                    placeholder='Adresse complète *'
                    placeholderTextColor={"#B2BECC"}
                    style={
                        [
                            {
                            // borderColor: "#1e85fe4d",
                            borderRadius: 5,
                            paddingLeft: windowWidth * 0.044,
                            paddingVertical: windowWidth * 0.037,
                            fontFamily: "Roboto-Medium",
                            fontSize: windowWidth * 0.04,
                            color: "#000"
                        },
                        errors.adress ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                        errors.adress ? { borderWidth: 1 } : {borderWidth: 2}, 
                        ]}
                    onChangeText={value => onChange(value)}
                    value={value}
                    /> */}
                    <PaperTextInput
                        mode='outlined'
                        label="Adress*"
                        value={value}
                        onChangeText={value => onChange(value)}
                        outlineColor={errors.adress ? '#ff3d5780' : '#1e85fe4d'}
                        activeOutlineColor='#1e85fe'
                        style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                        theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                    />
                </>
            )}
            name="adress" // Replace with your desired form field name
            rules={{ required: 'adress est obligatoire' }}
            />


            <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                <>
                    <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                    {errors.telephone && 'Champ Obligatoire'}
                    </Text>
                    {/* <TextInput
                    placeholder='Téléphone 1 *'
                    placeholderTextColor={"#B2BECC"}
                    style={
                        [
                            {
                            // borderColor: "#1e85fe4d",
                            borderRadius: 5,
                            paddingLeft: windowWidth * 0.044,
                            paddingVertical: windowWidth * 0.037,
                            fontFamily: "Roboto-Medium",
                            fontSize: windowWidth * 0.04,
                            color: "#000"
                        },
                        errors.telephone ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                        errors.telephone ? { borderWidth: 1 } : {borderWidth: 2}, 
                        ]}
                    keyboardType='numeric'
                    onChangeText={value => onChange(value)}
                    value={value}
                    /> */}
                    <PaperTextInput
                        mode='outlined'
                        label="Telephone *"
                        value={value}
                        keyboardType='phone-pad'
                        onChangeText={value => onChange(value)}
                        outlineColor={errors.telephone ? '#ff3d5780' : '#1e85fe4d'}
                        activeOutlineColor='#1e85fe'
                        style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                        theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                    />
                </>
            )}
            name="telephone" // Replace with your desired form field name
            rules={{ required: 'telephone est obligatoire' }}
            />


            <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                // <TextInput
                // placeholder='Téléphone 2'
                // placeholderTextColor={"#B2BECC"}
                // keyboardType='numeric'
                // style={{
                //     borderWidth: 2,
                //     borderColor: "#1e85fe4d",
                //     borderRadius: 5,
                //     paddingLeft: windowWidth * 0.044,
                //     paddingVertical: windowWidth * 0.037,
                //     fontFamily: "Roboto-Medium",
                //     fontSize: windowWidth * 0.04,
                //     marginTop: 15,
                //     color: "#000"
                // }}
                // onChangeText={value => onChange(value)}
                // value={value}
                // />
                <PaperTextInput
                        mode='outlined'
                        label="Téléphone 2"
                        value={value}
                        keyboardType='phone-pad'
                        onChangeText={value => onChange(value)}
                        outlineColor={'#1e85fe4d'}
                        activeOutlineColor='#1e85fe'
                        style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                        theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                    />
            )}
            name="telephone1" // Replace with your desired form field name
            />

            <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                <>
                <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                {
                    errors.email && 
                    (
                      errors.email.message != "Adresse email invalide" ? 'Champ Obligatoire' : 'Adresse email invalide'
                    )
                }
                </Text>
                {/* <TextInput
                placeholder='Email *'
                placeholderTextColor={"#B2BECC"}
                style={
                    [
                        {
                        // borderColor: "#1e85fe4d",
                        borderRadius: 5,
                        paddingLeft: windowWidth * 0.044,
                        paddingVertical: windowWidth * 0.037,
                        fontFamily: "Roboto-Medium",
                        fontSize: windowWidth * 0.04,
                        color: "#000"
                    },
                    errors.email ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                    errors.email ? { borderWidth: 1 } : {borderWidth: 2}, 

                    ]}
                onChangeText={value => onChange(value)}
                value={value}
                /> */}
                <PaperTextInput
                        mode='outlined'
                        label="Email *"
                        value={value}
                        onChangeText={value => onChange(value)}
                        outlineColor={errors.email ? '#ff3d5780' : '#1e85fe4d'}
                        activeOutlineColor='#1e85fe'
                        style={{fontFamily: "Roboto-Bold", fontSize: windowWidth * 0.04, }}
                        theme={{ colors: { onSurfaceVariant: '#B2BECC'}, roundness: 8 }}
                    />
                </>
            )}
            name="email" // Replace with your desired form field name
            rules={{ 
                required: 'email est obligatoire',
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Adresse email invalide'
                }
                }}

            />

            <View style={{marginTop: 25, marginBottom: 25}}>
                <Button title={'Suivant'} isLoading={loading} functions={() => props.navigation.navigate("SouscrirV2")}/>
            </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default Souscrire