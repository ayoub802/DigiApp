import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screen/Login/Login'
import HomeScreen from '../screen/HomeScreen/Home'
import Notification from '../screen/Notification/Notification'
import Document from '../screen/Document/Document'
import Support from '../screen/Support/Support'
import Valide from '../screen/Validation/Valide'
import ErrorScrren from '../screen/Error/Error'
import Souscrire from '../screen/Souscrire/Souscrir'
import SouscrirV2 from '../screen/Souscrire/SouscrirV2'
import Payment from '../screen/CardPayment/Payment'
import Choose from '../screen/ChooseScreen/Choose'
import Renew from '../screen/Renew/Renew'
import RenwPolice from '../screen/RenweBefore'
import Validation from '../screen/ValidationScreen/Validation'

const AppNavigation = () => {
    
    const Stack = createNativeStackNavigator();
  return (
    
    // <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Notification' component={Notification}/>
            <Stack.Screen name='Document' component={Document}/>
            <Stack.Screen name='Support' component={Support}/>
            <Stack.Screen name='Valide' component={Valide}/>
            <Stack.Screen name='Error' component={ErrorScrren}/>
            <Stack.Screen name='Souscrire' component={Souscrire}/>
            <Stack.Screen name='SouscrirV2' component={SouscrirV2}/>
            <Stack.Screen name='Payment' component={Payment}/>
            <Stack.Screen name='Choose' component={Choose}/>
            <Stack.Screen name='Renew' component={Renew}/>
            <Stack.Screen name='RenewPolice' component={RenwPolice}/>
            <Stack.Screen name='ValidationScreen' component={Validation}/>
        </Stack.Navigator>
    // </NavigationContainer>
  )
}


export default AppNavigation