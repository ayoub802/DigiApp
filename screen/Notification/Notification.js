import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import styles from './style'
import { notifications } from '../../constant'
import Button from '../../components/Button'
import axios from 'axios'
import { ApiKey } from '../../hooks/ApiKey'
import { getToken } from '../../modules/GestionStorage'
import { fetchNotificaction } from '../../modules/GestionApi'

const Notification = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);

  useEffect(() => {
   
    const getNotifiation = async () => {
      const response = await fetchNotificaction();
      setData(response.data.results)

    }
    getNotifiation();

  
  }, [])

  console.log("The Responses => ", Data); 


  if(!Data){
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
        <ActivityIndicator size={20} color="#000"/>
      </View>
    )
  }
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <TitleWrapper title={"Notification"} desc={"Vos dernières activités"}/>
      

          {/* {
            notifications.map((item, obj) => (
              <View style={styles.notificationBox} key={obj}>
              <Text style={styles.titleNoti}>{item.title}</Text>
              <Text>{item.text}</Text>
              </View>
              ))
            } */}
          {
            Data.length > 0
            ?
            <>
            <View style={styles.notificationWrapper}>
              <FlatList 
              data={Data}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item }) => (
                <View style={[styles.notificationBox, {marginBottom: 20}]}>
                    <Text style={styles.titleNoti}>{item.title}</Text>
                    <Text style={styles.textNoti}>{item.description}</Text>
                </View>
              )}
              />
                <Button title={"Retour à l’accueil"} functions={() => navigation.goBack()}/>
             </View>
            </>
            :
            <>
            <View style={styles.notificationNon}>
              <Text style={{color: "#000", marginBottom: 25}}>No Notification</Text>
              <Button title={"Retour à l’accueil"} functions={() => navigation.goBack()}/>
            </View>

            </>

          }


    </View>
  )
}

export default Notification