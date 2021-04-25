import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../styles/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/imgPerfil.png';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageName(){            
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || ``);
        }

        loadStorageName();
    },[])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            
            <Image 
                source={userImg} 
                style={styles.image}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },
})