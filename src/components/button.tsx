import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps} from 'react-native';
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps{
    tittle: string;
}

export function Button( { tittle, ...rest } : ButtonProps){
    return(
        <>
            <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    {...rest}
                >
                    <Text style={styles.buttonText}>
                        {tittle}
                    </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({    
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 16,
        height: 56,
        width: 56
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
})