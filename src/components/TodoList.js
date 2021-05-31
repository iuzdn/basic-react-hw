import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateStatus,
  sortTodos,
  selectTodo,
  deleteTodo,
  setInput,
} from '../utils/actions';

import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

export default function TodoList() {
  const dispatch = useDispatch();
  const { allTodos } = useSelector(state => state);

  const sortItems = useCallback(() => dispatch(sortTodos()), [dispatch]);

  useEffect(() => {
    sortItems();
  }, [sortItems]);

  const handleSelect = (id, desc) => {
    dispatch(selectTodo(id));
    dispatch(setInput(desc));
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>ToDoList</Card.Header>
          <ListGroup>
            {allTodos.map(({ id, description, statusDone }) => (
              <ListGroup.Item key={id}>
                <Row>
                  <Col>
                    <Form.Check controlId="formBasicCheckbox">
                      <Form.Check.Input
                        type="checkbox"
                        checked={statusDone}
                        onChange={() => dispatch(updateStatus(id, statusDone))}
                      />
                      <Form.Check.Label
                        style={
                          statusDone
                            ? { textDecoration: 'line-through' }
                            : { textDecoration: 'none' }
                        }
                      >
                        {description}
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="mr-2"
                      onClick={() => handleSelect(id, description)}
                      disabled={statusDone}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() => handleDelete(id)}
                      disabled={statusDone}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
