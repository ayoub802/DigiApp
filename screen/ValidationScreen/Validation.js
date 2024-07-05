import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import Button from '../../components/Button';
import Modal from "react-native-modal";
import { ConfirmOrder, PostOrder, fetchUser, fetchVehicule } from '../../modules/GestionApi';
import ButtonRetour from '../../components/ButtonRetour';
import { getDurre, getSouscrirData } from '../../modules/GestionStorage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UpdateModale from '../../components/UpdateModale';

const windowWidth = Dimensions.get('window').width;

const Validation = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataUser, setDataUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataSouscrir, setDataSouscrir] = useState({})
  const [dataDurre, setDataDurre] = useState({})

  const fetchUsers = async () => {
   setLoading(true)
   try{
     const response = await fetchUser();
    //  console.log("The Response => ", response);
     setDataUser(response.data);
   }
   catch(err){
     console.log("The Error => ", err);
   }
   finally{
     setLoading(false)
   }
  }
  useEffect(() => {

     async function fetchValue(){
      try{
         const responseDurre = await getDurre();
         const responsSouscrir = await getSouscrirData();
         console.log("The Dataes of Sousss => ", responsSouscrir);

         setDataSouscrir(responsSouscrir)

         setDataDurre(responseDurre)
 
      }
      catch(err){
        console.log("error => " ,err);
      }
    }

   
 
     fetchValue()
     fetchUsers()
  }, [])

  console.log("The Data of User =>", dataUser); 

  const toggleModal = () => { 
    // setIsModalVisible(!isModalVisible);
    sheetRef.current?.open()
  };

  // if(dataUser.length <= 0){
  //   return(
  //     <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
  //       <ActivityIndicator size={"small"} color={"#000"}/>
  //     </View>
  //   )
  // }

  
  const handleOrder = async () => {
    const startDay = new Date().toISOString().split('T')[0];
    console.log("Order Payload => ", {
      insured: dataUser?.insured?.id,
      vehicleId: dataSouscrir.id,
      duration: 30,
      startDay: startDay,
    });
    // setLoading(true);
    try {
      const orderResponse = await PostOrder({
        insured: dataUser?.insured?.id,  // Assuming dataUser.id contains the insured ID
        vehicleId: dataSouscrir.id,  // Assuming dataSouscrir.vehicle_id contains the vehicle ID
        duration: 30,
        startDay: startDay,
      });

      if (orderResponse && orderResponse.id) {
        // const confirmResponse = await ConfirmOrder(orderResponse.id);
        // if (confirmResponse && confirmResponse.status === 'confirmed') {
        //   navigation.navigate('Payment', { orderId: orderResponse.id });
        // }
        console.log("The Response => ", orderResponse);
      }
    } catch (error) {
      console.log("Error of Order => ", error);
    } 
  };
  const sheetRef = useRef(null);

  if(loading)
  {
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
          <ActivityIndicator color={"#000"} size={"small"}/>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <TitleWrapper title={"RECAPITULATIF"} desc={"Validation D'information"}/>
          <View style={{width: windowWidth  * 0.8, alignSelf: "center"}}>
        <View style={{marginBottom: windowWidth * 0.08,}}>
           <ButtonRetour navigation={navigation}/>
         </View>
           <Text style={{fontSize: windowWidth * 0.04, color: "#1C2437", textAlign: "center", textTransform: "uppercase",fontFamily: "Roboto-Medium",letterSpacing: 1}}>Informations personnelles</Text>
          <View style={{marginTop: windowWidth * 0.08}}>
             <View style={{flexDirection: "column", gap: windowWidth * 0.05}}>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Nom et Prénom :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataUser?.last_name + ' ' + dataUser?.first_name}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Email :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataUser?.email}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Addess :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataUser?.insured?.address}</Text>
                </View>
             </View>
          </View>
           {
            !dataSouscrir
            ?
            <></>
            :
           <View style={{marginTop: windowWidth * 0.15}}>
               <Text style={{fontSize: windowWidth * 0.04, color: "#1C2437", textAlign: "center", textTransform: "uppercase",fontFamily: "Roboto-Medium",letterSpacing: 1}}>Informations de véhicule</Text>
               <View style={{marginTop: windowWidth * 0.08}}>
             <View style={{flexDirection: "column", gap: windowWidth * 0.03}}>
                {/* <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>N° de police: :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>5656CXXT445E</Text>
                </View> */}
                {/* <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Marque :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}></Text>
                </View> */}
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Genre :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.gender}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Usage :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.usage}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Couleur :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.color}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Nombre de places :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.number_place}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Immatriculation :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.registration}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>N° de chasis :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.chassis_number}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Charge utile :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.charge}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>Années de fabrication :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.manufacturing_year}</Text>
                </View>
                <View style={{flexDirection: "row" ,alignItems: "center", justifyContent: "space-between", width:"100%"}}>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,}}>1ére mise en circulation :</Text>
                  <Text style={{color: "rgb(28, 36, 56)", fontSize: windowWidth * 0.035,fontFamily: "Roboto-Medium"}}>{dataSouscrir.first_registration}</Text>
                </View>

             </View>
          </View>
           </View>
           }
          <View>        
          </View>
        </View>
        <View style={{marginTop: 25, width: windowWidth * 0.9,marginBottom: windowWidth * 0.09 ,alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <TouchableOpacity onPress={handleOrder} style={{maxWidth: windowWidth * 0.35,width: "100%" ,height: windowWidth * 0.12, borderRadius: 8,justifyContent: "center", alignItems: "center",backgroundColor: "#1E85FE"}}>
                      {
                        !loading 
                        ?
                        <Text style={{textAlign: "center", fontFamily: "Roboto-Bold",fontSize: 15,lineHeight: 35, color: "#fff"}}>Valider</Text> 
                        :
                        <ActivityIndicator color={"#fff"} size={"small"}/>
                      }
                      
                    </TouchableOpacity>
                   <TouchableOpacity onPress={toggleModal} style={{ flexDirection: "row" ,alignItems: "center",paddingVertical: windowWidth * 0.02, paddingHorizontal: windowWidth * 0.061 ,justifyContent: "center",position: "relative" ,borderWidth: 1,borderRadius: 8,borderColor: "#6d788d73",maxWidth: windowWidth * 0.35,  }}>
                    <MaterialCommunityIcons name="circle-edit-outline" color={"#1c2438"} size={25}/>
                    <Text style={{fontSize: windowWidth * 0.04, fontFamily: "Roboto-Medium", lineHeight: 30, color: "#1c2438", letterSpacing: 0.4, marginHorizontal: windowWidth * 0.02}}>Edit</Text>
                  </TouchableOpacity>
                </View>
                
      </ScrollView>
         <UpdateModale sheetRef={sheetRef} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} navigation={navigation} data={dataSouscrir}/>
    </View>
  )
}

export default Validation