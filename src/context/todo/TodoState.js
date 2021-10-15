import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {API} from '../../api'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const [state, dispatch] = useReducer(todoReducer, initialState)
  const { changeScreen } = useContext(ScreenContext)



  const addTodo = async title => {+
    clearError()
    try {
      const data = await API.post('https://react-native-app-todo-default-rtdb.firebaseio.com/todos.json', {title})
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (e) {
      showError('Что то пошло не так...')
    }
  }

  const removeTodo = id => {
    let todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены что хотите удалить '${todo.title}' ?`,
      [
        {
          text: 'Назад',
          style: 'cancel'
        },
        {
          text: "Удалить",
          onPress: async () => {
            clearError()
            try {
              changeScreen(null)
              await API.delete(`https://react-native-app-todo-default-rtdb.firebaseio.com/todos/${id}.json`)
                dispatch({ type: REMOVE_TODO, id })
            } catch (e) {
              showError('Что то пошло не так...')
            }

          }
        }
      ],
      { cancelable: false },
    )
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await API.get('https://react-native-app-todo-default-rtdb.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      showError("Что то пошло не так!!!")
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await API.patch(`https://react-native-app-todo-default-rtdb.firebaseio.com/todos/${id}.json`,{ title })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError("Что то пошло не так!!!")
      console.log(e)
    }

  }
  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showError = error => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLEAR_ERROR })




  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos,

    }}>
      {children}
    </TodoContext.Provider>
  )
}