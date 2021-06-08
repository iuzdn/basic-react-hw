import React from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTodoContext } from '../hooks/useContext';
import useTodos from '../hooks/useTodos';

export default function TodoInput() {
  const { message, isLoading, isError, isSuccess, todo, setTodo } =
    useTodoContext();
  const { addTodo, updateTodo } = useTodos();

  const handleSubmit = e => {
    e.preventDefault();
    todo.id ? updateTodo(todo) : addTodo(todo);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formBasicTodo">
        <Form.Group as={Col}>
          <Form.Label>Todo input:</Form.Label>
          <Form.Control
            type="text"
            value={todo.fields.description}
            placeholder="Enter todo"
            onChange={e =>
              setTodo({ ...todo, fields: { description: e.target.value } })
            }
          />
        </Form.Group>
      </Form.Group>
      <Form.Group as={Row} controlId="formBasicTodoButton">
        <Col xs="4">
          <Button type="submit">{!todo.id ? 'Add Todo' : 'Update Todo'}</Button>
        </Col>
        <Col xs="8">
          <Form.Control
            type="text"
            placeholder={isLoading ? 'Loading...' : message || ''}
            isInvalid={isError || false}
            isValid={isSuccess || false}
            readOnly
          />
        </Col>
      </Form.Group>
    </Form>
  );
}
