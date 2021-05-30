import React from 'react';

import { Row } from 'react-bootstrap';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default function TodoForm() {
  return (
    <Row>
      <TodoInput />
      <TodoList />
    </Row>
  );
}
