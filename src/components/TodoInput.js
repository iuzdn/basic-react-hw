import React from 'react';
import { useTodosContext } from '../utils/context';

import { Button, Col, Form, Row } from 'react-bootstrap';

export default function TodoInput() {
  const {
    input,
    error,
    selectedTodoId,
    inputEl,
    functions: { handleChange, handleSubmit },
  } = useTodosContext();

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Todo input:</Form.Label>
        <Form.Group as={Row} controlId="formBasicTodo">
          <Form.Group as={Col}>
            <Form.Control
              ref={inputEl}
              type="text"
              value={input}
              placeholder="Enter todo"
              onChange={handleChange}
              isInvalid={!!error}
            />
            <Form.Control.Feedback
              style={{ left: '1rem' }}
              type="invalid"
              tooltip={true}
            >
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit">
              {!selectedTodoId ? 'Add Todo' : 'Update Todo'}
            </Button>
          </Form.Group>
        </Form.Group>
      </Form>
    </Col>
  );
}
