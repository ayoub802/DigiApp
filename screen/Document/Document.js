import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import TitleWrapper from '../../components/TitleWrapper'
import styles from './style'
import { document } from '../../constant'
import Button from '../../components/Button'

const Document = ({ navigation }) => {
  return (
    <View style={{flex: 1,backgroundColor: "#fff"}}>
      <TitleWrapper title={"DOCuments"} desc={"Tous vos documents"}/>

      <View style={styles.DocumentWrapper}>
        <FlatList 
          data={document}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={[styles.DocumentBox, {marginBottom: 20}]}>
                <Text style={styles.titleDoc}>{item.title}</Text>
                {
                    item.documents.map((doc, index) => (
                        <>
                            <View key={index} style={styles.docWrapper}>
                                <Text style={styles.textDocComp}>{doc.title}</Text>
                                <Text style={{ color: doc.statusColor, fontSize: 12, fontFamily: "Roboto-Bold", lineHeight: 32, textAlign: "right"}}>{doc.status}</Text>
                            </View>
                            {
                                doc.downloads.map((obj, index) => (
                                    <TouchableOpacity key={index}>
                                        <Text style={{fontSize: 15, fontFamily:"Roboto-Light", color: "#162E4A"}}>{obj.label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </>
                    ))
                }
            </View>
          )}
        />

        <Button title={"Retour à l’accueil"} functions={() => navigation.goBack()}/>
      </View>
    </View>
  )
}

export default Document