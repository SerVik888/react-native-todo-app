// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { THEME } from '../theme'
import { AppTextBold } from './ui/AppTextBold';

export const Navbar = ({ title }) => {

  return (
    <View style={{...styles.navbar, ...Platform.select({
      ios: styles.iosStyle,
      android: styles.androidStyle
    })}}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  },
  androidStyle: {
    backgroundColor: THEME.MAIN_COLOR
  },
  iosStyle: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR
  },
  text: {
    color: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    fontSize: 20
  }
})