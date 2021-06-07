import React from 'react';

import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

import { useTodoContext } from '../hooks/useContext';
import useTodos from '../hooks/useTodos';

export default function TodoList() {
  const { todo, setTodo } = useTodoContext();
  const {
    updateTodo: { mutate: checkTodo },
    deleteTodo: { mutate: deleteTodo },
    todos: { isLoading, error, data },
  } = useTodos();

  const handleSelect = (id, description) => {
    setTodo({ ...todo, id, fields: { description } });
  };

  const handleCheck = (id, completed) => {
    checkTodo({ ...todo, id, fields: { completed } });
  };

  const handleDelete = id => {
    deleteTodo(id);
  };

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occured: ' + error.message;

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>ToDoList</Card.Header>
          <ListGroup>
            {data.map(({ id, fields: { description, completed = false } }) => (
              <ListGroup.Item key={id}>
                <Row>
                  <Col>
                    <Form>
                      <Form.Check controlId="formBasicCheckbox">
                        <Form.Check.Input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleCheck(id, !completed)}
                        />
                        <Form.Check.Label
                          style={
                            completed
                              ? { textDecoration: 'line-through' }
                              : { textDecoration: 'none' }
                          }
                        >
                          {description}
                        </Form.Check.Label>
                      </Form.Check>
                    </Form>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="mr-2"
                      onClick={() => handleSelect(id, description)}
                      disabled={completed}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() => handleDelete(id)}
                      disabled={completed}
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
