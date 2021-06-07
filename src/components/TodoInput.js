import React from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTodoContext } from '../hooks/useContext';
import useTodos from '../hooks/useTodos';

export default function TodoInput() {
  const { todo, setTodo } = useTodoContext();
  const {
    addTodo: {
      mutate: addTodo,
      isError: addIsError,
      error: addError,
      isLoading: addIsLoading,
    },
    updateTodo: {
      mutate: updateTodo,
      isError: updateIsError,
      error: updateError,
      isLoading: updateIsLoading,
    },
  } = useTodos();

  const {
    id,
    fields: { description },
  } = todo;

  const handleChange = value => {
    setTodo({ ...todo, fields: { description: value } });
  };

  const handleSubmit = e => {
    e.preventDefault();
    id ? updateTodo(todo) : addTodo(description);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formBasicTodo">
        <Form.Group as={Col}>
          <Form.Label>Todo input:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            placeholder="Enter todo"
            onChange={e => handleChange(e.target.value)}
            isInvalid={addIsError || updateIsError}
          />
          {(addIsError || updateIsError) && (
            <Form.Control.Feedback
              style={{ left: '1rem' }}
              type="invalid"
              tooltip={true}
            >
              {addError.message || updateError.message}
            </Form.Control.Feedback>
          )}

          <br />
          <Button type="submit">{!id ? 'Add Todo' : 'Update Todo'}</Button>
          {(addIsLoading || updateIsLoading) && <span>Loading...</span>}
        </Form.Group>
      </Form.Group>
    </Form>
  );
}
