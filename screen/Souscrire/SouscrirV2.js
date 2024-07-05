import { View, Text, ScrollView, Dimensions, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import TitleWrapper from '../../components/TitleWrapper'
const windowWidth = Dimensions.get('window').width;
import { useForm, Controller } from 'react-hook-form';
import SignatureScreen from 'react-native-signature-canvas';
import Button from '../../components/Button';
import ButtonRetour from '../../components/ButtonRetour';
import Signature from '../../components/Signature';
import axios from 'axios';
import { getDurre, getSouscrirData, getToken, saveDurre, saveSouscrirData } from '../../modules/GestionStorage';
import { ApiKey } from '../../hooks/ApiKey';
import { Dropdown } from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { PostVehicule, fetchBrands } from '../../modules/GestionApi';
import { dataColor, dataDurre, dataGenre, dataPuissance, dataTonnage } from '../../constant';

const SouscrirV2 = ({navigation}) => {

    const Title = "INFormations sur le véhicule";
    const [marque, setMarque] = useState('');
    const [isFocus, setIsFocus] = useState(false); 
    const [type, setType] = useState('');
    const [isFocusType, setIsFocusType] = useState(false); 
    const [genre, setGenre] = useState('');
    const [isFocusGenre, setIsFocusGenre] = useState(false); 
    const [color, setColor] = useState('');
    const [isFocusColor, setIsFocusColor] = useState(false); 
    const [tonnage, setTonnage] = useState('');
    const [isFocusTonnage, setIsFocusTonnage] = useState(false); 
    const [Usage, setUsage] = useState('');
    const [isFocusUsage, setIsFocusUsage] = useState(false); 
    const [Durre, setDurree] = useState('');
    const [isFocusDurree, setIsFocusDurree] = useState(false); 
    const [puissance, setPuissance] = useState('');
    const [isFocusPuissance, setIsFocusPuissance] = useState(false); 
    const [typeOptions, setTypeOptions] = useState([]);
    const [puissanceOption, setPuissanceOption] = useState([]);
    const [usageOptions, setUsageOptions] = useState([]);
    const [imageSelected, setImageSelected] = useState(null);
    const [Errors, setErrors] = useState({});
    const [selectedId, setSelectedId] = useState(0);
    const [Immatriculation, setImmatriculation] = useState(null)
    const [nbplace, setNnplace] = useState(null)
    const [Chassis, setChassis] = useState(null)
    const [Charge, setCharge] = useState(null)
    const [Fabrication, setFabrication] = useState(null)
    const [Circulation, setCirculation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataMarque, setDataMarque] = useState([])
    const [date, setDate] = useState();


    const [radioData, setRadioData] = useState([
          {label: 'Oui', value: 0, id: 1, borderColor: "rgb(161, 64, 157)", color: "rgb(161, 64, 157)" },
          {label: 'Non', value: 1, id: 2, borderColor: "rgb(161, 64, 157)", color: "rgb(161, 64, 157)" },
    ])

    //  console.log("The Radio data => ", puissanceOption);
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();
     
    const fetchTypeData = async (brandName) => {
      // console.log("The Brand Name => ", brandName);
      if(brandName?.length > 0){
        const dropdownData = brandName?.map(item => ({
          label: item.name,
          value: item.id, // Assuming name can be used as a value as well
        }));
        setTypeOptions(dropdownData)
      }
      else{
        setTypeOptions([{
          label: "Selectionner Marque",
          value: "set"
        }])
      }
  };

    useEffect(() => {
         async function fetchValues(){
          setIsLoading(true)
          try{
            const response = await fetchBrands();
            let brandsData = [];
            brandsData = response.data.brands;
            // console.log("DATA of : ", brandsData);
            
          //   const obj = {
          //     id: 1,
          //     gender: "Moto",
          //     color: "rouge",
          //     fiscal_power: 100,
          //     usage: "Taxi",
          //     number_place: 5,
          //     registration: "ABC12",
          //     charge: 2000,
          //     chassis_number: "1787873",
          //     manufacturing_year: "2023",
          //     first_registration: "2023",
          //     document: "http://127.0.0.1:8000/media/vehicle/logo_bg.png",
          //     type_model: 1
          // }
          
          // let souscrirObj = [];
          // souscrirObj.push(obj);

          // saveSouscrirData(souscrirObj)


            // Extract only brand names
            // const brandNames = brandsData.map(item => item.name);
        
            // Create data structure expected by Dropdown component
              const dropdownData = brandsData?.map(item => ({
                label: item.name,
                value: item.name, // Assuming name can be used as a value as well
                modelTypes: item.model_types
              }));
              // console.log("Dropdown data: ", dropdownData);
              setDataMarque(dropdownData)
              setIsLoading(false);
          }
          catch(error){
            console.log("The Error => ", error);
          }
         }
         async function fetchValue(){
          try{
             const responseDurre = await getDurre();
             const responsSouscrir = await getSouscrirData();
    
            //  console.log("The Durree => ", responseDurre , " Souscrir => ", responsSouscrir);
          }
          catch(err){
            console.log("error => " ,err);
          }
        }

        fetchValue()

        //  fetchPuissance(Usage, genre)
        //  fetchUsageData(genre)
         fetchValues()
        //  fetchTypeData(marque)
      }, [])


      useEffect(() => {
        if (marque) {
            const brand = dataMarque.find(brand => brand.value === marque);
            fetchTypeData(brand?.modelTypes);
        }
    }, [marque, dataMarque]);

      useEffect(() => {
        if (genre) {
            fetchUsageData(genre);
        }
    }, [genre]);
      useEffect(() => {
        if (genre && Usage) {
          fetchPuissance(Usage, genre);
        }
    }, [genre, Usage]);

 
    const fetchUsageData = async (selectedMarque) => {
      // Use the selected marque to fetch data for the type dropdown
      // For example:
      // const response = await axios.get(`${ApiKey}/insurance/types/${selectedMarque}`);
      // setTypeOptions(response.data);
      // Below is a mock example of type data for Audi
      if (selectedMarque === 'Camion') {
          setUsageOptions([
              { label: 'Ecloage', value: 'Ecolage' },
              { label: 'location', value: 'Location' },
              { label: 'Marchandises', value: 'Marchandises' },
              { label: 'Marchandises rémunérées', value: 'Marchandises-rémunérées' },
              // Add more options as needed
          ]);
      } 
      else if(selectedMarque === 'Bus'){
          setUsageOptions([
              { label: 'Taxi', value: 'Taxi' },
              { label: 'Transport en commun', value: 'Transport-commun' },
              // Add more options as needed
          ]);
      }
  
      else if(selectedMarque === 'Voiture'){
          setUsageOptions([
              { label: 'Taxi', value: 'Taxi' },
              { label: 'Ecolage', value: 'Ecolage' },
              { label: 'location', value: 'Location' },
              { label: 'Personnel', value: 'Personel' },
              { label: 'Transport en commun', value: 'Transport-commun' },
              // Add more options as needed
          ]);
      }
      else if(selectedMarque === 'Moto'){
          setUsageOptions([
              { label: 'Personnel', value: 'Personel' },
              { label: 'Taxi', value: 'Taxi' },
              { label: 'Vente-Réparation-Essai', value: 'Vente' },
              { label: 'Ecolage', value: 'Ecolage' },
              // Add more options as needed
          ]);
      }
      else {
          setUsageOptions([
              { label: 'Selectionnez Genre', value: 'audi_a1' },
              // Add more options as needed
          ]);
      }
  };


    const fetchPuissance = async (selectedUsage, selectedGenre) => {
      if(selectedUsage == "Ecolage" && selectedGenre == "Voiture" || selectedUsage == "Location" && selectedGenre == "Voiture")
      {
        setPuissanceOption([
          { label: '1-5', value: '1-5' },
          { label: '6-9', value: '6-9' },
          { label: '10-13', value: '10-13' },
          { label: '14-17', value: '14-17' },
          { label: '17+', value: '17+' },
          // {label: 'param3', value: 2, id: 3, borderColor: "red", color: "red" },
        ])
      }
      else if(selectedUsage == "Personel" && selectedGenre == "Voiture" || selectedUsage == "Personel" && selectedGenre == "moto" || selectedUsage == "Ecolage" && selectedGenre == "Moto")
      {
        setPuissanceOption([
            { label: '0-50', value: '0-50' },
            { label: '51-99', value: '51-99' },
            { label: '100-150', value: '100-150' },
            { label: '151-350', value: '151-350' },
            { label: '350+', value: '350+' }
          ])
      }
      else{
        setPuissanceOption([])
      }
    }


    const handleBrandChange = (selectedBrand) => {
        const brandName = dataMarque.find(brand => brand.label === selectedBrand);
        setMarque(selectedBrand);
        setType(''); // Reset type when brand changes
        fetchTypeData(selectedBrand, brandName.modelTypes);
    };


    const handleUsageChange = (selectedBrand) => {
        setGenre(selectedBrand);
        setUsage(''); // Reset type when brand changes
        fetchUsageData(selectedBrand);
    };

    const handlePuissanceChange = (selectedBrand) => {
      setUsage(selectedBrand);
      setGenre(genre)
      setPuissance(''); // Reset type when brand changes
      fetchPuissance(selectedBrand, genre);
  };


      const renderLabel = () => {
        if (marque || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'rgb(161, 64, 157)' }]}>
              Marque *
            </Text>
          );
        }
        return null;
      };

      const renderLabelType = () => {
        if (type || isFocusType) {
          return (
            <Text style={[styles.label, isFocusType && { color: 'rgb(161, 64, 157)' }]}>
              Type/Modèle *
            </Text>
          );
        }
        return null;
      };

      const renderLabelGenre = () => {
        if (genre || isFocusGenre) {
          return (
            <Text style={[styles.label, isFocusGenre && { color: 'rgb(161, 64, 157)' }]}>
              Genre *
            </Text>
          );
        }
        return null;
      };

      const renderLabelColor = () => {
        if (color || isFocusColor) {
          return (
            <Text style={[styles.label, isFocusColor && { color: 'rgb(161, 64, 157)' }]}>
              Color *
            </Text>
          );
        }
        return null;
      };

      const renderLabelTonnage = () => {
        if (tonnage || isFocusTonnage) {
          return (
            <Text style={[styles.label, isFocusTonnage && { color: 'rgb(161, 64, 157)' }]}>
              Tonnage 
            </Text>
          );
        }
        return null;
      };

      const renderLabelPuissance = () => {
        if (puissance || isFocusPuissance) {
          return (
            <Text style={[styles.label, isFocusPuissance && { color: 'rgb(161, 64, 157)' }]}>
              Puissance 
            </Text>
          );
        }
        return null;
      };

      const renderLabelDurre = () => {
        if (Durre || isFocusDurree) {
          return (
            <Text style={[styles.label, isFocusDurree && { color: 'rgb(161, 64, 157)' }]}>
              Durée 
            </Text>
          );
        }
        return null;
      };

      const renderLabelUsage = () => {
        if (Usage || isFocusUsage) {
          return (
            <Text style={[styles.label, isFocusUsage && { color: 'rgb(161, 64, 157)' }]}>
              Usage *  
            </Text>
          );
        }
        return null;
      };

    const selectImageFromGallery = () => {
      let options = {
          storageOptions: {
            path: 'image'
          }
        };
      
      //  launchImageLibrary(options, response => {
      //     if(response.didCancel == true)
      //     {
      //     //  setUserImage('')
      //     setImageSelected('')
      //     console.log("Error");
      //     }else{
      //       setImageSelected(response.assets[0].uri)
      //       console.log("The Image => ", response.assets[0].uri);
      //     }
      
      //  })
      launchImageLibrary(options, response => {
        if(response.didCancel == true) {
          // setUserImage('')
          setImageSelected('')
          console.log("Error");
        }else{
          setImageSelected(response.assets[0].uri)
          const fileSizeLimit = 2000000; // 2 MB in bytes
          const fileTypeAccepted = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword'];
    
          if (response.assets[0].fileSize > fileSizeLimit || !fileTypeAccepted.includes(response.assets[0].type)) {
            setError('imageSelected', { type: 'required', message: 'Maximum 2mo. Format accepté : .pdf, .jpg, .png, .doc' })
          } else {
            setValue('imageSelected', response.assets[0].uri);
            console.log("The Image => ", response.assets[0].uri);
            setErrors({}); // Clear any previous errors
          }
        }
      })
    }

    const onSubmit = async () => {
      console.log("The Data => ",
      {
        type,
        genre,
        color,
        puissance,
        Usage,
        Immatriculation,
        Charge,
        Chassis,
        Fabrication,
        Circulation
      });
      const response = await PostVehicule({
        setLoading,
        type_mode: type,
        genre: genre,
        color: color,
        fiscal_power: puissance == '' ? 0 : parseInt(puissance),
        usage: Usage,
        number_place: parseInt(nbplace),
        registration: Immatriculation,
        charge: Charge,
        chassis_number: Chassis,
        manufacturing_year: Fabrication,
        first_registration: Circulation
      })
      navigation.navigate('ValidationScreen')
    }
    
    if(isLoading || dataMarque.length <= 0){
        return(
          <View style={{flex: 1,backgroundColor: "#fff",justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="small" color={"#000"}/>
          </View>
        )
    }
    // console.log("The Lenght => ", Title.length);
  return (
      <View style={{flex: 1, backgroundColor: "#fff"}}>
          <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1, backgroundColor: "#fff"}} showsVerticalScrollIndicator={false}>
              <View style={{width:windowWidth * 0.6, alignSelf: "center",marginBottom: - windowWidth * 0.09}}>
                <TitleWrapper title={"INFormations sur le véhicule"} />
              </View>
  
              <View style={{width: windowWidth * 0.9, alignSelf: "center", flexDirection: "column", gap: windowWidth * 0.015}}>
            <View style={{marginBottom: windowWidth * 0.08}}>
                  <ButtonRetour navigation={navigation}/>
              </View>

                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
  
                        {errors.Marque &&  <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
                        <View style={{position: "relative"}}>
                            
                            {renderLabel()}
                            <Dropdown
                                style={[!isFocus ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"}, errors.Marque && {borderColor: 'red'} ,styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={dataMarque}
                                maxHeight={300}
                                itemTextStyle={{color: "#000", height: 20}}
                                minHeight={100}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Marque *' : '...'}
                                value={marque}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => 
                                {
                                  setIsFocus(false);
                                  onBlur();
                                }
                                }
                                onChange={(item) => {
                                // setMarque(item.value);
                                setIsFocus(false);
                                handleBrandChange(item.value)
                                onChange(item.value);
                                }}
                            />
                        </View>
                        </>
                        
                    )}
                    name="Marque" // Replace with your desired form field name
                    rules={{ required: 'Marque est obligatoire' }}
                    />
  
              <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
                        {errors.Type && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
                          <View style={[errors.Type ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                            {renderLabelType()}
                            <Dropdown
                                style={[!isFocusType ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"},errors.Type && {borderColor: 'red'} ,styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={typeOptions}
                                maxHeight={300}
                                itemTextStyle={{color: "#000", height: 20}}
                                minHeight={50}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusType ? 'Type/Modèle *' : '...'}
                                value={type}
                                onFocus={() => setIsFocusType(true)}
                                onBlur={() => {setIsFocusType(false); onBlur()}}
                                onChange={(item) => {
                                setType(item.value);
                                setIsFocusType(false);
                                onChange(item.value)
                                }}
                            />
                        </View>
                        </>
                        
                    )}
                    name="Type" // Replace with your desired form field name
                    rules={{ required: 'Type est obligatoire' }}
                    />
   
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <>

                    {errors.Couleur && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
                    <View style={[errors.Couleur ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                        {renderLabelColor()}
                        <Dropdown
                            style={[!isFocusColor ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"}, errors.Couleur && {borderColor: 'red'} ,styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={dataColor}
                            maxHeight={300}
                            itemTextStyle={{color: "#000", height: 20}}
                            minHeight={50}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusColor ? 'Color *' : '...'}
                            value={color}
                            onFocus={() => setIsFocusColor(true)}
                            onBlur={() => setIsFocusColor(false)}
                            onChange={(item) => {
                            setColor(item.value);
                            setIsFocusColor(false);
                            onChange(item.value)
                            }}
                        />
                    </View>
                    </>
                    
                )}
                name="Couleur" // Replace with your desired form field name
                rules={{ required: 'Couleur est obligatoire' }}
                /> 

            <Controller
                  control={control}
                  render={({field: { onChange, onBlur, value }}) => (
                      <>
                      {/* <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                      {errors.Genre && 'Champ Obligatoire'}
                      </Text>
                      <TextInput
                      placeholder='Genre *'
                      placeholderTextColor={"#B2BECC"}
                      style={
                          [
                              {
                              // borderColor: "rgb(161, 64, 157)",
                              borderRadius: 5,
                              paddingLeft: windowWidth * 0.044,
                              paddingVertical: windowWidth * 0.037,
                              fontFamily: "Roboto-Bold",
                              fontSize: windowWidth * 0.04,
                              color: "#000"
                          },
                          errors.Genre ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                          errors.Genre ? { borderWidth: 1 } : {borderWidth: 2}, 
                          ]}
                      onChangeText={value => onChange(value)}
                      value={value}
                      /> */}
                      {errors.Genre && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
          
                      <View style={[errors.Genre ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                          {renderLabelGenre()}
                          <Dropdown
                              style={[!isFocusGenre ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"},errors.Genre && {borderColor: 'red'} ,styles.dropdown]}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              iconStyle={styles.iconStyle}
                              data={dataGenre}
                              maxHeight={300}
                              itemTextStyle={{color: "#000", height: 20}}
                              minHeight={100}
                              labelField="label"
                              valueField="value"
                              placeholder={!isFocusGenre ? 'Genre *' : '...'}
                              value={genre}
                              onFocus={() => setIsFocusGenre(true)}
                              onBlur={() => setIsFocusGenre(false)}
                              onChange={(item) => {
                              // setMarque(item.value);
                              setIsFocusGenre(false);
                              handleUsageChange(item.value)
                              onChange(item.value)
                              // handleBrandChange(item.value)
                              }}
                          />
                      </View>
                      </>
                      
                  )}
                  name="Genre" // Replace with your desired form field name
                  rules={{ required: 'Genre est obligatoire' }}
                  />

{
            genre == "Camion"
            ?
            <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
                <>
                {/* <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
                {errors.Genre && 'Champ Obligatoire'}
                </Text>
                <TextInput
                placeholder='Genre *'
                placeholderTextColor={"#B2BECC"}
                style={
                    [
                        {
                        // borderColor: "rgb(161, 64, 157)",
                        borderRadius: 5,
                        paddingLeft: windowWidth * 0.044,
                        paddingVertical: windowWidth * 0.037,
                        fontFamily: "Roboto-Bold",
                        fontSize: windowWidth * 0.04,
                        color: "#000"
                    },
                    errors.Genre ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                    errors.Genre ? { borderWidth: 1 } : {borderWidth: 2}, 
                    ]}
                onChangeText={value => onChange(value)}
                value={value}
                /> */}

                <View style={{position: "relative", marginTop: windowWidth * 0.04}}>
                    {renderLabelTonnage()}
                    <Dropdown
                        style={[!isFocusTonnage ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"} ,styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={dataTonnage}
                        maxHeight={300}
                        itemTextStyle={{color: "#000", height: 20}}
                        minHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusTonnage ? 'Tonnage ' : '...'}
                        value={tonnage}
                        onFocus={() => setIsFocusTonnage(true)}
                        onBlur={() => setIsFocusTonnage(false)}
                        onChange={(item) => {
                        // setMarque(item.value);
                        setIsFocusTonnage(false);
                        setTonnage(item.value)
                        // handleBrandChange(item.value)
                        }}
                    />
                </View>
                </>
                
            )}
            name="Tonnage" // Replace with your desired form field name
            />
            :
            <></>
        }


      {
        puissanceOption.length > 0
        ?    
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            <Text style={{ color: '#ff3d5780', textAlign: "right", marginBottom: -10, fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.03, lineHeight: windowWidth * 0.04 }}>
            {errors.Puissance && 'Champ Obligatoire'}
            </Text>
            {/* <TextInput
            placeholder='Puissance fiscal (CV) *'
            placeholderTextColor={"#B2BECC"}
            style={
                [
                    {
                    // borderColor: "rgb(161, 64, 157)",
                    borderRadius: 5,
                    paddingLeft: windowWidth * 0.044,
                    paddingVertical: windowWidth * 0.037,
                    fontFamily: "Roboto-Bold",
                    fontSize: windowWidth * 0.04,
                    color: "#000"
                },
                errors.Puissance ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                errors.Puissance ? { borderWidth: 1 } : {borderWidth: 2}, 
                ]}
            onChangeText={value => onChange(value)}
            value={value}
            /> */}
            {errors.Puissance && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

            <View style={{position: "relative"}}>
                {renderLabelPuissance()}
                <Dropdown
                    style={[!isFocusPuissance ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"}, errors.Puissance && {borderColor: 'red'} ,styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={puissanceOption}
                    maxHeight={300}
                    itemTextStyle={{color: "#000", height: 20}}
                    minHeight={100}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusPuissance ? 'Puissance ' : '...'}
                    value={puissance}
                    onFocus={() => setIsFocusPuissance(true)}
                    onBlur={() => setIsFocusPuissance(false)}
                    onChange={(item) => {
                    // setMarque(item.value);
                    setIsFocusPuissance(false);
                    setPuissance(item.value)
                    onChange(item.value)
                    // handleBrandChange(item.value)
                    }}
                />
            </View>
            </>
            
        )}
        name="Puissance" // Replace with your desired form field name
        rules={{ required: 'Puissance est obligatoire' }}
        />

        : 
        <>
        </>
      }

      <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <>

                  {/* <TextInput
                  placeholder='Usage *'
                  placeholderTextColor={"#B2BECC"}
                  style={
                      [
                          {
                          // borderColor: "rgb(161, 64, 157)",
                          borderRadius: 5,
                          paddingLeft: windowWidth * 0.044,
                          paddingVertical: windowWidth * 0.037,
                          fontFamily: "Roboto-Bold",
                          fontSize: windowWidth * 0.04,
                          color: "#000"
                      },
                      errors.Usage ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                      errors.Usage ? { borderWidth: 1 } : {borderWidth: 2}, 
                      ]}
                  onChangeText={value => onChange(value)}
                  value={value}
                  /> */}
                  {errors.Usage && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                  <View style={[errors.Usage ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                      {renderLabelUsage()}
                      <Dropdown
                          style={[!isFocusUsage ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"}, errors.Usage && {borderColor: 'red'} ,styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={usageOptions}
                          maxHeight={300}
                          itemTextStyle={{color: "#000", height: 20}}
                          minHeight={100}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusUsage ? 'Usage *' : '...'}
                          value={Usage}
                          onFocus={() => setIsFocusUsage(true)}
                          onBlur={() => setIsFocusUsage(false)}
                          onChange={(item) => {
                          // setMarque(item.value);
                          setIsFocusUsage(false);
                          // setUsage(item.value)
                          handlePuissanceChange(item.value)
                          onChange(item.value)
                          // handleBrandChange(item.value)
                          }}
                      />
                  </View>

                  </>
                  
              )}
              name="Usage" // Replace with your desired form field name
              rules={{ required: 'Usage est obligatoire' }}
              />

                {
                        genre=="Voiture" && Usage == "transport-commun"
                        || genre=="Camion" && Usage == "marchandises"
                        || genre=="Camion" && Usage == "marchandises-rémunérées"
                        || genre == "Voiture" && Usage=="personnel" 

                        ?
                        <>
                          <Text>En vente - réparation - essai ?</Text>
                          <RadioGroup 
                                radioButtons={radioData} 
                                onPress={(value) => setSelectedId(value)}
                                selectedId={selectedId}
                                containerStyle={{
                                  alignItems: "flex-start"
                                }}
                            />
                        </>

                        :
                        <></>
                      }

                      {
                        genre=="voiture" && Usage == "ecolage"
                        || genre=="Camion" && Usage == "ecolage"

                        ?
                        <>
                        <Text>Double pédale ?</Text>
                        <RadioGroup 
                              radioButtons={radioData} 
                              onPress={(value) => setSelectedId(value)}
                              selectedId={selectedId}
                              containerStyle={{
                                alignItems: "flex-start"
                              }}
                          />
                        </>

                        :
                        <></>
                      }

                      





      
  
          <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <>
                    {/* <TextInput
                    placeholder='Nombre de places *'
                    placeholderTextColor={"#B2BECC"}
                    style={
                        [
                            {
                            // borderColor: "rgb(161, 64, 157)",
                            borderRadius: 5,
                            paddingLeft: windowWidth * 0.044,
                            paddingVertical: windowWidth * 0.037,
                            fontFamily: "Roboto-Bold",
                            fontSize: windowWidth * 0.04,
                            color: "#000"
                        },
                        errors.places ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                        errors.places ? { borderWidth: 1 } : {borderWidth: 2}, 
                        ]}
                    onChangeText={value => onChange(value)}
                    value={value}
                    /> */}
                    {errors.Durre && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                    <View style={[errors.Durre ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                        {renderLabelDurre()}
                        <Dropdown
                            style={[!isFocusDurree ? {borderColor: 'rgb(161, 64, 157)'}: {borderColor: "rgb(161, 64, 157)"}, errors.Durre && {borderColor: 'red'} ,styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={dataDurre}
                            maxHeight={300}
                            itemTextStyle={{color: "#000", height: 20}}
                            minHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusDurree ? 'Durée *' : '...'}
                            value={Durre}
                            onFocus={() => setIsFocusDurree(true)}
                            onBlur={() => setIsFocusDurree(false)}
                            onChange={(item) => {
                            // setMarque(item.value);
                            setIsFocusDurree(false);
                            setDurree(item.value)
                            saveDurre(item.value)
                            onChange(item.value)
                            // handleBrandChange(item.value)
                            }}
                        />
                    </View>
                    </>
                    
                )}
                name="Durre" // Replace with your desired form field name
                rules={{ required: 'Durre est obligatoire' }}
                />

       <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
          {errors.Places && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

            <View style={[errors.Places ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
              <TextInput
              placeholder='Nombre De Place *'
              placeholderTextColor={"#B2BECC"}
              keyboardType='numeric'
              style={
                  [
                      {
                      // borderColor: "rgb(161, 64, 157)",
                      borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                  },
                  errors.Places ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                errors.Places ? { borderWidth: 1 } : {borderWidth: 1}, 
                  ]}
              onChangeText={value => {setNnplace(value); onChange(value)}}
              value={nbplace}
              />
            </View>
            </>
            
        )}
        name="Places" // Replace with your desired form field name
        rules={{ required: 'Places est obligatoire' }}
        />

        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
          {errors.Immatriculation && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

            <View style={[errors.Immatriculation ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
              <TextInput
              placeholder='Immatriculation *'
              placeholderTextColor={"#B2BECC"}
              keyboardType='numeric'
              style={
                  [
                      {
                      // borderColor: "rgb(161, 64, 157)",
                      borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                  },
                  errors.Immatriculation ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                errors.Immatriculation ? { borderWidth: 1 } : {borderWidth: 1}, 
                  ]}
              onChangeText={value => {setImmatriculation(value); onChange(value)}}
              value={Immatriculation}
              />
            </View>
            </>
            
        )}
        name="Immatriculation" // Replace with your desired form field name
        rules={{ required: 'Immatriculation est obligatoire' }}
        />

        
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            {errors.chassis && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
            <View style={[errors.chassis ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
              <TextInput
              placeholder='N° de chassis *'
              keyboardType='numeric'
              placeholderTextColor={"#B2BECC"}
              style={
                  [
                      {
                      // borderColor: "rgb(161, 64, 157)",
                      borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                  },
                  errors.chassis ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                errors.chassis ? { borderWidth: 1 } : {borderWidth: 1}, 
                  ]}
              onChangeText={value => {setChassis(value); onChange(value)}}
              value={Chassis}
              />
            </View>
            </>
            
        )}
        name="chassis" // Replace with your desired form field name
        rules={{ required: 'chassis est obligatoire' }}
        />


        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            {errors.Charge && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
            <View  style={[errors.chassis ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
            <TextInput
            placeholder='Charge utile (t) *'
            keyboardType='numeric'
            placeholderTextColor={"#B2BECC"}
            style={
                [
                    {
                    // borderColor: "rgb(161, 64, 157)",
                    borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                },
                errors.Charge ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                errors.Charge ? { borderWidth: 1 } : {borderWidth: 1},
                ]}
            onChangeText={value => {setCharge(value); onChange(value)}}
            value={Charge}
            />
            </View>
            </>
            
        )}
        name="Charge" // Replace with your desired form field name
        rules={{ required: 'Charge est obligatoire' }}
        />


        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            {errors.Annee && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
            <View style={[errors.chassis ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                <TextInput
                placeholder='Année de fabrication *'
                placeholderTextColor={"#B2BECC"}
                style={
                    [
                        {
                        // borderColor: "rgb(161, 64, 157)",
                        borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                    },
                    errors.Annee ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                    errors.Annee ? { borderWidth: 1 } : {borderWidth: 1},
                    ]}
                onChangeText={value => {setFabrication(value); onChange(value)}}
                value={Fabrication}
                />
            </View>
            </>
            
        )}
        name="Annee" // Replace with your desired form field name
        rules={{ required: 'Annee est obligatoire' }}
        />

        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            {errors.circulation && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
            <View style={[errors.circulation ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
              <TextInput
              placeholder='1ère mise en circulation *'
              placeholderTextColor={"#B2BECC"}
              style={
                  [
                      {
                      // borderColor: "rgb(161, 64, 157)",
                      borderRadius: 8,
                      paddingLeft: windowWidth * 0.044,
                      paddingVertical: windowWidth * 0.03,
                      fontFamily: "Roboto-Medium",
                      fontSize: windowWidth * 0.04,
                      color: "#000",
                  },
                  errors.circulation ? { borderColor: '#ff3d5780' } : {borderColor: "rgb(161, 64, 157)"}, 
                    errors.circulation ? { borderWidth: 1 } : {borderWidth: 1},
                  ]}
              onChangeText={value => {setCirculation(value);onChange(value) }}
              value={Circulation}
              />
            </View>
            </>
            
        )}
        name="circulation" // Replace with your desired form field name
        rules={{ required: 'circulation est obligatoire' }}
        />

    
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>
            
            <TouchableOpacity onPress={selectImageFromGallery} style={{borderWidth: 1.5, borderColor: "rgb(161, 64, 157)",borderRadius: 10,borderStyle: 'dashed', height: windowWidth * 0.4, justifyContent: "center", alignItems: "center", marginTop: windowWidth * 0.04}}>
              {
                imageSelected == null
                ?
                <>
                  <Text style={{fontSize: windowWidth * 0.035, color: "#B2BECC",fontWeight: "600"}}>Attacher la photo du document de bord.</Text>
                  <Text style={{fontSize: windowWidth * 0.02, color: "#666"}}>Maximum 2mo. Format accepté : .pdf, .jpg, .png, .doc</Text>
                </>
                :
                <Image source={{ uri: imageSelected}} style={{width: "100%", height: "100%", borderRadius: 10, objectFit: "cover"}} resizeMode='cover'/>

              }
            </TouchableOpacity>
            </>
            
        )}
        name="signature" // Replace with your desired form field name
        />
    
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
            <>

            <Signature />
            </>
            
        )}
        name="signature" // Replace with your desired form field name
        />


              </View> 
  
              <View style={{marginTop: 25, width: windowWidth * 0.9,marginBottom: windowWidth * 0.09 ,alignSelf: "center"}}>
                <Button title={'Souscrire'} isLoadin={loading} functions={handleSubmit(onSubmit)}/>
              </View>
          </ScrollView>
      </View>

  
  
  
  )
}


const styles = StyleSheet.create({
  dropdown: {
        height: 55,
        // borderColor: 'rgb(161, 64, 157)',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 18,
        paddingRight: 10,
        marginBottom: windowWidth * 0.01,
        position: "relative"
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
        color: 'rgb(161, 64, 157)',
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color: "#B2BECC",
        fontWeight: "700"
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
export default SouscrirV2

