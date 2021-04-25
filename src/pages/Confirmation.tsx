import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
    title: string;
    subtitle: string;
    buttonText: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😃'
}

export function Confirmation(){
    const navigator = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonText,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleConfirm(){
        navigator.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title={buttonText}
                        onPress={handleConfirm}
                    />
                </View>
            </View>            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 18,
        color: colors.heading
    },
    emoji: {
        fontSize: 78
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },

})