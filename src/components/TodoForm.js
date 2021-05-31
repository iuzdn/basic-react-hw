import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateDesc } from '../utils/actions';

import { Form } from 'react-bootstrap';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default function TodoForm() {
  const dispatch = useDispatch();
  const { input, selectedTodoId } = useSelector(state => state);

  const handleSubmit = e => {
    selectedTodoId ? dispatch(updateDesc(input)) : dispatch(addTodo(input));
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TodoInput />
      <TodoList />
    </Form>
  );
}
