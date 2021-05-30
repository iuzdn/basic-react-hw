import React from 'react';
import { useTodosContext } from '../utils/context';

import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

export default function TodoList() {
  const {
    allTodos,
    functions: { handleChangeStatus, handleSelect, handleDelete },
  } = useTodosContext();

  return (
    <Col>
      <Form>
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
                        onChange={() => handleChangeStatus(id, statusDone)}
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
                  <Col className="justify-content-end">
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
      </Form>
    </Col>
  );
}
