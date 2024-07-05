import { View, Text, ScrollView, Dimensions, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import TitleWrapper from './TitleWrapper';
import { useForm, Controller } from 'react-hook-form';
import { getDurre, getSouscrirData, getToken, saveDurre } from '../modules/GestionStorage';
import { Dropdown } from 'react-native-element-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import { PostVehicule, fetchBrands } from '../modules/GestionApi';
import { dataColor, dataDurre, dataGenre, dataPuissance, dataTonnage } from '../constant';
import Signature from './Signature';
import Button from './Button';
import BottomSheet from '@devvie/bottom-sheet'


const windowWidth = Dimensions.get('window').width;

const UpdateModale = ({ isModalVisible, setIsModalVisible, navigation, data, sheetRef}) => {

    // const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [marque, setMarque] = useState(data.brand || '');
  const [isFocus, setIsFocus] = useState(false); 
  const [type, setType] = useState(data.type_model || '');
  const [isFocusType, setIsFocusType] = useState(false); 
  const [genre, setGenre] = useState(data.gender || '');
  const [isFocusGenre, setIsFocusGenre] = useState(false); 
  const [color, setColor] = useState(data.color || '');
  const [isFocusColor, setIsFocusColor] = useState(false); 
  const [tonnage, setTonnage] = useState(data.tonnage || '');
  const [isFocusTonnage, setIsFocusTonnage] = useState(false); 
  const [Usage, setUsage] = useState(data.usage || '');
  const [isFocusUsage, setIsFocusUsage] = useState(false); 
  const [Durre, setDurree] = useState('');
  const [isFocusDurree, setIsFocusDurree] = useState(false); 
  const [puissance, setPuissance] = useState(data.fiscal_power || '');
  const [isFocusPuissance, setIsFocusPuissance] = useState(false); 
  const [typeOptions, setTypeOptions] = useState([]);
  const [puissanceOption, setPuissanceOption] = useState([]);
  const [usageOptions, setUsageOptions] = useState([]);
  const [imageSelected, setImageSelected] = useState(null);
  const [Errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(0);
  const [Immatriculation, setImmatriculation] = useState(data.registration || null)
  const [nbplace, setNnplace] = useState(data?.number_place?.toString() || null)
  const [Chassis, setChassis] = useState(data?.chassis_number?.toString() || null)
  const [Charge, setCharge] = useState(data?.charge?.toString() || null)
  const [Fabrication, setFabrication] = useState(data.manufacturing_year || null)
  const [Circulation, setCirculation] = useState(data.first_registration || null)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataMarque, setDataMarque] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isDate, setIsDate] = useState(new Date())

  console.log("The Data which came from => ", data, "NombreDe Place => ",data.number_place, nbplace );

  const [radioData, setRadioData] = useState([
        {label: 'Oui', value: 0, id: 1, borderColor: "#1e85fe4d", color: "#1e85fe" },
        {label: 'Non', value: 1, id: 2, borderColor: "#1e85fe4d", color: "#1e85fe" },
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
          <Text style={[styles.label, isFocus && { color: '#1e85fe' }]}>
            Marque *
          </Text>
        );
      }
      return null;
    };

    const renderLabelType = () => {
      if (type || isFocusType) {
        return (
          <Text style={[styles.label, isFocusType && { color: '#1e85fe' }]}>
            Type/Modèle *
          </Text>
        );
      }
      return null;
    };

    const renderLabelGenre = () => {
      if (genre || isFocusGenre) {
        return (
          <Text style={[styles.label, isFocusGenre && { color: '#1e85fe' }]}>
            Genre *
          </Text>
        );
      }
      return null;
    };

    const renderLabelColor = () => {
      if (color || isFocusColor) {
        return (
          <Text style={[styles.label, isFocusColor && { color: '#1e85fe' }]}>
            Color *
          </Text>
        );
      }
      return null;
    };

    const renderLabelTonnage = () => {
      if (tonnage || isFocusTonnage) {
        return (
          <Text style={[styles.label, isFocusTonnage && { color: '#1e85fe' }]}>
            Tonnage 
          </Text>
        );
      }
      return null;
    };

    const renderLabelPuissance = () => {
      if (puissance || isFocusPuissance) {
        return (
          <Text style={[styles.label, isFocusPuissance && { color: '#1e85fe' }]}>
            Puissance 
          </Text>
        );
      }
      return null;
    };

    const renderLabelDurre = () => {
      if (Durre || isFocusDurree) {
        return (
          <Text style={[styles.label, isFocusDurree && { color: '#1e85fe' }]}>
            Durée 
          </Text>
        );
      }
      return null;
    };

    const renderLabelUsage = () => {
      if (Usage || isFocusUsage) {
        return (
          <Text style={[styles.label, isFocusUsage && { color: '#1e85fe' }]}>
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
  
  return (
    <BottomSheet title="Open" ref={sheetRef} height={windowWidth * 1.3} style={{backgroundColor: "#fff"}}>
        <View style={{ backgroundColor: "#fff", width: "100%",position: "relative" ,height: windowWidth * 1.5, borderRadius: 8 }}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <TitleWrapper title={"Modifier"} desc={"Modifier votre information"}/>

          <View style={{width: windowWidth * 0.9, alignSelf: "center", flexDirection: "column", gap: windowWidth * 0.015, marginBottom: windowWidth * 0.35}}>

                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <>
                        {errors.Marque &&  <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}
                        <View style={{position: "relative"}}>
                           
                            {renderLabel()}
                            <Dropdown
                                style={[!isFocus ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"}, errors.Marque && {borderColor: 'red'} ,styles.dropdown]}
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
                                style={[!isFocusType ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"},errors.Type && {borderColor: 'red'} ,styles.dropdown]}
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
                                style={[!isFocusColor ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"}, errors.Couleur && {borderColor: 'red'} ,styles.dropdown]}
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
                        {errors.Genre && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                        <View style={[errors.Genre ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                            {renderLabelGenre()}
                            <Dropdown
                                style={[!isFocusGenre ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"},errors.Genre && {borderColor: 'red'} ,styles.dropdown]}
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
                            <View style={{position: "relative", marginTop: windowWidth * 0.04}}>
                                {renderLabelTonnage()}
                                <Dropdown
                                    style={[!isFocusTonnage ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"} ,styles.dropdown]}
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
                        {errors.Puissance && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                        <View style={{position: "relative"}}>
                            {renderLabelPuissance()}
                            <Dropdown
                                style={[!isFocusPuissance ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"}, errors.Puissance && {borderColor: 'red'} ,styles.dropdown]}
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

                        {errors.Usage && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                        <View style={[errors.Usage ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                            {renderLabelUsage()}
                            <Dropdown
                                style={[!isFocusUsage ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"}, errors.Usage && {borderColor: 'red'} ,styles.dropdown]}
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
                        {errors.Durre && <Text style={{ color: '#ff3d5780', textAlign: "right",marginBottom: 0,fontFamily: "Roboto-Regular", fontSize: windowWidth * 0.027, }}>Champ Obligatoire</Text>}

                        <View style={[errors.Durre ? {marginTop: windowWidth * 0.0} : {marginTop: windowWidth * 0.04}, {position: "relative", }]}>
                            {renderLabelDurre()}
                            <Dropdown
                                style={[!isFocusDurree ? {borderColor: '#1e85fe4d'}: {borderColor: "#1e85fe"}, errors.Durre && {borderColor: 'red'} ,styles.dropdown]}
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
                                  // borderColor: "#1e85fe4d",
                                  borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                              },
                              errors.Places ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                                  // borderColor: "#1e85fe4d",
                                  borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                              },
                              errors.Immatriculation ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                                  // borderColor: "#1e85fe4d",
                                  borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                              },
                              errors.chassis ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                                // borderColor: "#1e85fe4d",
                                borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                            },
                            errors.Charge ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                                    // borderColor: "#1e85fe4d",
                                    borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                                },
                                errors.Annee ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                                  // borderColor: "#1e85fe4d",
                                  borderRadius: 8,
                                  paddingLeft: windowWidth * 0.044,
                                  paddingVertical: windowWidth * 0.03,
                                  fontFamily: "Roboto-Medium",
                                  fontSize: windowWidth * 0.04,
                                  color: "#000",
                              },
                              errors.circulation ? { borderColor: '#ff3d5780' } : {borderColor: "#1e85fe4d"}, 
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
                        
                        <TouchableOpacity onPress={selectImageFromGallery} style={{borderWidth: 1.5, borderColor: "#1e85fe4d",borderRadius: 10,borderStyle: 'dashed', height: windowWidth * 0.4, justifyContent: "center", alignItems: "center", marginTop: windowWidth * 0.04}}>
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

          <View style={{marginTop: 25, width: windowWidth * 0.6,marginBottom: windowWidth * 0.09 ,alignSelf: "center"}}>
              <Button title={'Souscrire'} functions={() => navigation.navigate('ValidationScreen')}/>
            </View>

            </View> 


        </ScrollView>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 55,
        // borderColor: '#1e85fe4d',
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
        color: '#1e85fe',
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

export default UpdateModale