import { View, Text, ScrollView, Dimensions, TextInput } from 'react-native'
import React from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button';
import ButtonRetour from '../../components/ButtonRetour';
import Signature from '../../components/Signature';
const windowWidth = Dimensions.get('window').width;

const Renew = ({ navigation }) => {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();

    


  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
    <ScrollView style={{flex: 1, backgroundColor: "#fff"}} showsVerticalScrollIndicator={false}>
      <View style={{width:windowWidth * 0.6, alignSelf: "center",marginBottom: - windowWidth * 0.09}}>
        <TitleWrapper title={"RENOUVELLEMENT"} />
      </View>

       <View style={{width: windowWidth * 0.9, alignSelf: "center", flexDirection: "column", gap: windowWidth * 0.015}}>
        <ButtonRetour navigation={navigation}/>
              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Marque && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Marque *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Marque ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Marque ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Marque" // Replace with your desired form field name
              rules={{ required: 'Marque est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Type && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Type/Modèle *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Type ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Type ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Type" // Replace with your desired form field name
              rules={{ required: 'Type est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Genre && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Genre *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Genre ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Genre ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Genre" // Replace with your desired form field name
              rules={{ required: 'Genre est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Couleur && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Couleur *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Couleur ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Couleur ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Couleur" // Replace with your desired form field name
              rules={{ required: 'Couleur est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Puissance && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Puissance fiscal (CV) *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Puissance ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Puissance ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />

                  <Text style={{textAlign: "right", fontFamily: "Roboto-Bold", fontSize: 10, color: "#B2BECC"}}>CV : Chevaux Vapeur</Text>
                  </>
                  
              )}
              name="Puissance" // Replace with your desired form field name
              rules={{ required: 'Puissance est obligatoire' }}
              />

              
              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Usage && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Usage *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Usage ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Usage ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Usage" // Replace with your desired form field name
              rules={{ required: 'Usage est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.places && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Nombre de places *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.places ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.places ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="places" // Replace with your desired form field name
              rules={{ required: 'places est obligatoire' }}
              />


              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Immatriculation && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Immatriculation *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Immatriculation ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Immatriculation ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Immatriculation" // Replace with your desired form field name
              rules={{ required: 'Immatriculation est obligatoire' }}
              />

              
              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.chassis && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='N° de chassis *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.chassis ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.chassis ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="chassis" // Replace with your desired form field name
              rules={{ required: 'chassis est obligatoire' }}
              />


              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Charge && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Charge utile (t) *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Charge ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Charge ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                    <Text style={{textAlign: "right", fontFamily: "Roboto-Bold", fontSize: 10, color: "#B2BECC"}}>t : Tonnes</Text>
                  </>
                  
              )}
              name="Charge" // Replace with your desired form field name
              rules={{ required: 'Charge est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.Année && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='Année de fabrication *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Année ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.Année ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="Année" // Replace with your desired form field name
              rules={{ required: 'Année est obligatoire' }}
              />

              <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>
                  <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                  {errors.circulation && 'Champ Obligatoire'}
                  </Text>
                  <TextInput
                  placeholder='1ère mise en circulation *'
                  placeholderTextColor={"#162E4A"}
                  style={
                      [
                          {
                          // borderColor: "#1e85fe4d",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.circulation ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
                      errors.circulation ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
                  </>
                  
              )}
              name="circulation" // Replace with your desired form field name
              rules={{ required: 'circulation est obligatoire' }}
              />

                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
                        <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                        {errors.signature && 'Champ Obligatoire'}
                        </Text>
                        <Signature />
                        </>
                        
                    )}
                    name="signature" // Replace with your desired form field name
                    rules={{ required: 'signature est obligatoire' }}
                    />

      </View> 

      <View style={{marginTop: 25, width: windowWidth * 0.9,marginBottom: windowWidth * 0.09 ,alignSelf: "center"}}>
        <Button title={'Confirmer et renouveller'} functions={() => navigation.navigate('Payment')}/>
      </View>
  </ScrollView>
   </View>
  )
}

export default Renew