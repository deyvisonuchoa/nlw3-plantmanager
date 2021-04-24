import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Confirmation } from './src/pages/Confirmation';
import AppLoading from 'expo-app-loading';
import {useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost';

export default function App(){ 
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <Confirmation />
  )
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
     justifyContent: 'center',
      alignItems: 'center'
  }
}
)