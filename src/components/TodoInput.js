import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { addTodo, setInput, updateTodo } from '../redux/actions';

export default function TodoInput() {
  const dispatch = useDispatch();
  const { todo, todoLoading, error, message } = useSelector(state => state);
  const {
    id,
    fields: { description },
  } = todo;

  const handleSubmit = e => {
    e.preventDefault();
    todo.id ? dispatch(updateTodo(todo)) : dispatch(addTodo(description));
  };

  useEffect(() => {
    !error && dispatch(setInput(''));
  }, [error, dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formBasicTodo">
        <Form.Group as={Col}>
          <Form.Label>Todo input:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            placeholder="Enter todo"
            onChange={e => dispatch(setInput(e.target.value))}
          />
        </Form.Group>
      </Form.Group>
      <Form.Group as={Row} controlId="formBasicTodoButton">
        <Col xs="4">
          <Button type="submit">{!id ? 'Add Todo' : 'Update Todo'}</Button>
        </Col>
        <Col xs="8">
          <Form.Control
            type="text"
            placeholder={todoLoading ? 'Loading...' : error || message}
            isInvalid={!!error}
            isValid={!!message}
            readOnly
          />
        </Col>
      </Form.Group>
    </Form>
  );
}
