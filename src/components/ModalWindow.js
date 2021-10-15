import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, StyleSheet, TextInput, View, Alert, Dimensions } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'


export const ModalWindow = ({ visible, onCancel, value, onSave}) => {
const [title, setTitle] = useState(value)

const saveHandler = () => {
  if (title.trim().length < 3) {
    Alert.alert(
      'Ошибка', 
       `Минимальная длинна заметки 3 символа. У вас ${title.trim().length} символов`
    )
  } else {
    onSave(title)
  }
}

const cancelHandler = () => {
  setTitle(value)
  onCancel()
}

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={false}>
      <View style={styles.wrap}>
        <TextInput 
        value={title}
        onChangeText={setTitle}
        placeholder='Введите текст...' 
        style={styles.input} 
        autoCapitalize='none'
        autoCorrect={false}
        maxLength={67}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={cancelHandler}>
              Отменить
          </AppButton>
          </View>
          <View style={styles.button}>
          <AppButton  onPress={saveHandler}>
            Сохранить 
          </AppButton>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',  
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginBottom: 20,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: Dimensions.get('window').width > 400 ? '40%' : '45%'
  }

})