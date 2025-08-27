import React, { useState } from 'react'
import styled from 'styled-components'

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

const FormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const TodoInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #6c757d;
  }
`

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      onAddTodo(trimmedValue)
      setInputValue('')
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TodoInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="新しいTODOを入力してください..."
        maxLength={100}
      />
      <AddButton type="submit" disabled={!inputValue.trim()}>
        追加
      </AddButton>
    </FormContainer>
  )
}

export default TodoForm
