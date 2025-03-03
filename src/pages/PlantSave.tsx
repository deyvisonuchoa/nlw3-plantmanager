import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Image, _Image, Platform } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps;
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] =useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    
    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();

    const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
        if(Platform.OS == 'android')
            setShowDatePicker(oldState => !oldState);

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro');
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    const handleOpenDateTimePickerAndroid = () => {
        setShowDatePicker(oldState => !oldState);
    }

    const handleSave = async () => {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })
            
            navigation.navigate('Confirmation', {
                title: 'Tudo certo!',
                subtitle: `Fique tranquilo que sempre vamos ${'\n'} lembrar você de cuidar da sua plantinha ${'\n'} com bastante cuidado`,
                buttonText: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch (error) {
            Alert.alert(`Não foi possivel salvar. 😥`);
        }
    }

    return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.container}>
            <View style={styles.plantInfo}>
              <SvgFromUri 
                uri={plant.photo}
                height={150}
                width={150}
              />
    
              <Text style={styles.plantName}>
                {plant.name}
              </Text>
              <Text style={styles.plantAbout}>
                {plant.about}
              </Text>
            </View>
            <View style={styles.controller}>
              <View style={styles.tipContainer}>
                <Image 
                  source={waterDrop}
                  style={styles.tipImage}
                />
                <Text style={styles.tipText}>
                  {plant.water_tips}
                </Text>
              </View>
    
              <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado:
              </Text>
    
              {
                showDatePicker && (
                  <DateTimePicker 
                    value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                  />
                )
              }
              {
                Platform.OS === 'android' && (
                  <TouchableOpacity
                    style={styles.dataTimePickerButton}
                    onPress={handleOpenDateTimePickerAndroid}
                  >
                    <Text style={styles.dataTimePickerText}>
                      {`Horário de lembrete: ${format(selectedDateTime, 'HH:mm')}`}
                    </Text>
                  </TouchableOpacity>
                )
              }
    
              <Button 
                title="Cadastrar Planta"
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
      },
      plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
      },
      controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
      },
      plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
      },
      plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
      },
      tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
      },
      tipImage: {
        width: 56,
        height: 56
      },
      tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
      },
      dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
      },
      dataTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
      }, 
      alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
      }
    }); 