import React from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import { Todo } from '../App'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
  onEditTodo: (id: number, newText: string) => void
}

const ListContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  font-style: italic;
`

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo 
}) => {
  if (todos.length === 0) {
    return (
      <ListContainer>
        <EmptyMessage>
          📋 TODOがありませんんん。
        </EmptyMessage>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </ListContainer>
  )
}

export default TodoList
