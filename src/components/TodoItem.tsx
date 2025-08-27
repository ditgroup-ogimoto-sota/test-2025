import React, { useState } from 'react'
import styled from 'styled-components'
import { Todo } from '../App'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

const ItemContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background-color: ${props => props.completed ? '#f8f9fa' : 'white'};
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f3f4;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Checkbox = styled.input`
  margin-right: 1rem;
  transform: scale(1.2);
  cursor: pointer;
`

const TodoText = styled.span<{ completed: boolean }>`
  flex: 1;
  font-size: 1rem;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#6c757d' : '#333'};
  opacity: ${props => props.completed ? 0.7 : 1};
  transition: all 0.2s;
`

const EditInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' | 'save' | 'cancel' }>`
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background-color: #28a745;
          color: white;
          &:hover { background-color: #218838; }
        `
      case 'delete':
        return `
          background-color: #dc3545;
          color: white;
          &:hover { background-color: #c82333; }
        `
      case 'save':
        return `
          background-color: #007bff;
          color: white;
          &:hover { background-color: #0056b3; }
        `
      case 'cancel':
        return `
          background-color: #6c757d;
          color: white;
          &:hover { background-color: #5a6268; }
        `
      default:
        return `
          background-color: #f8f9fa;
          color: #333;
          &:hover { background-color: #e2e6ea; }
        `
    }
  }}
`

const CreatedDate = styled.small`
  color: #6c757d;
  margin-left: 1rem;
  font-size: 0.75rem;
`

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSave = () => {
    const trimmedText = editText.trim()
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <ItemContainer completed={todo.completed}>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <>
          <EditInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            maxLength={100}
          />
          <ButtonGroup>
            <ActionButton variant="save" onClick={handleSave}>
              保存
            </ActionButton>
            <ActionButton variant="cancel" onClick={handleCancel}>
              キャンセル
            </ActionButton>
          </ButtonGroup>
        </>
      ) : (
        <>
          <TodoText completed={todo.completed}>
            {todo.text}
          </TodoText>
          <CreatedDate>
            {formatDate(todo.createdAt)}
          </CreatedDate>
          <ButtonGroup>
            <ActionButton variant="edit" onClick={handleEdit} disabled={todo.completed}>
              編集
            </ActionButton>
            <ActionButton variant="delete" onClick={() => onDelete(todo.id)}>
              削除
            </ActionButton>
          </ButtonGroup>
        </>
      )}
    </ItemContainer>
  )
}

export default TodoItem
