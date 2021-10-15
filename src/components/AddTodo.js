import React, { useState } from 'react'
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { THEME } from '../theme'
import { Entypo } from '@expo/vector-icons'
import { AppButton } from './ui/AppButton'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value.trim())
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Введите название задачи!')
    }

  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder={'Введите текст...'}
        onChangeText={setValue}
        value={value}
        autoCapitalize={'none'}
        autoCorrect={false}
      />
      <AppButton onPress={pressHandler}>
        <Entypo name='circle-with-plus' size={20}/>
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    width: '75%',
    borderStyle: 'solid',
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  }
})