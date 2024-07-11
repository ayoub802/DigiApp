import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView} from "react-native-safe-area-context"

import AppNavigation from './navigation/AppNavigation';
import {  AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider, useTranslation, initReactI18next  } from 'react-i18next';
import i18n from 'i18next';
import en from './language/translation/en.json';
import fr from './language/translation/fr.json';
import { StripeProvider } from '@stripe/stripe-react-native';
const App = () => {
  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content")
  }, [])
  const { i18n} = useTranslation();
  const bottomSheetModalRef = useRef(null);


  return (
   
    <I18nextProvider i18n={i18n}>
      <StripeProvider publishableKey='pk_test_51OwmUzCZhu3QvR8hO56YMseUODvOakMXijJP0CRP2W3nUIgoSt2U7L3vm92ullOn1zi31H8OFs39FtVoSayBOcLi004NrZ1zGh'>
          <NavigationContainer>
            <AuthProvider>
                <SafeAreaView style={{flex: 1}}>
                  <AppNavigation />
                </SafeAreaView>
            </AuthProvider>
          </NavigationContainer>
      </StripeProvider>
    </I18nextProvider>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default App