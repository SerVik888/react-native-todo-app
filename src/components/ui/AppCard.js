import React from 'react'
import { StyleSheet, View } from 'react-native'


export const AppCard = props => <View style={{...styles.default, ...props.style}}>{props.children}</View>

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'red',
        shadowOpacity: 0.3,
        shadowOffset: {width: 10, height: 10},
        backgroundColor: '#fff',
        elevation: 8
    }
})