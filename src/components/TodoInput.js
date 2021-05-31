import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { setInput } from '../utils/actions';

export default function TodoInput() {
  const { input, error, selectedTodoId } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    !error && dispatch(setInput(''));
  }, [error, dispatch]);

  return (
    <Form.Group as={Row} controlId="formBasicTodo">
      <Form.Group as={Col}>
        <Form.Label>Todo input:</Form.Label>
        <Form.Control
          type="text"
          value={input}
          placeholder="Enter todo"
          onChange={e => dispatch(setInput(e.target.value))}
          isInvalid={!!error}
        />
        <Form.Control.Feedback
          style={{ left: '1rem' }}
          type="invalid"
          tooltip={true}
        >
          {error}
        </Form.Control.Feedback>
        <br />
        <Button type="submit">
          {!selectedTodoId ? 'Add Todo' : 'Update Todo'}
        </Button>
      </Form.Group>
    </Form.Group>
  );
}
