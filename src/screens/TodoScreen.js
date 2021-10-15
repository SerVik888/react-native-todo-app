import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {StyleSheet, View } from 'react-native';

import { ModalWindow } from '../components/ModalWindow';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { AppText } from '../components/ui/AppText';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';

export const TodoScreen = () => {

  const {todos, removeTodo, updateTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const [modal, setModal] = useState(false)

  const todo = todos.find(t => t.id === todoId)

  const saveHandler = async title => {
    await updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View style={styles.container}>

      <ModalWindow
        onSave={saveHandler}
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)} />

      <AppCard style={styles.card}>
        <AppText style={styles.cardText}>{todo.title}</AppText>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
            <Entypo name='back' size={20} />
          </AppButton>
        </View>

        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
            <AntDesign name='delete' size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttons: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '40%'
  },
  cardText: {
    fontSize: 20
  },
  card: {
    marginBottom: 10,
    marginTop: 10
  }
})