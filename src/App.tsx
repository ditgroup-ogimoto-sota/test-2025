import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`

const AppTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [nextId, setNextId] = useState(1)

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: nextId,
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }
    setTodos(prev => [...prev, newTodo])
    setNextId(prev => prev + 1)
  }, [nextId])

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const editTodo = useCallback((id: number, newText: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [])

  const completedCount = todos.filter(todo => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <AppContainer>
      <AppTitle>📝 TODO リスト</AppTitle>
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onEditTodo={editTodo}
      />
      {todos.length > 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>残り: {remainingCount}件 | 完了: {completedCount}件</p>
          {completedCount > 0 && (
            <button onClick={clearCompleted} style={{ marginLeft: '1rem' }}>
              完了済みを削除
            </button>
          )}
        </div>
      )}
    </AppContainer>
  )
}

export default App
