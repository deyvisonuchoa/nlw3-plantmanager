import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import {useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';

export default function App(){ 
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data)
    //   }
    // );

    // return () => subscription.remove();

    async function notifications() {
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(data);
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    notifications();
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <Routes />
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