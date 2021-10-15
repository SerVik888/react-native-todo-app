import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppTextBold } from './ui/AppTextBold';

export const Todo = ({ todo, onRemove, openTodo}) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.5}
    onPress={() => {openTodo(todo.id)}}
    onLongPress = {onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <AppTextBold>{todo.title}</AppTextBold>
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  }
})