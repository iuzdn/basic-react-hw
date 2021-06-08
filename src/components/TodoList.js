import React from 'react';

import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

import { useTodoContext } from '../hooks/useContext';
import useTodos from '../hooks/useTodos';
import { sortData } from '../utils/helperFns';

export default function TodoList() {
  const { setTodo } = useTodoContext();
  const { updateTodo, deleteTodo, isLoading, error, data } = useTodos();

  const sortedData = React.useMemo(() => data && sortData(data), [data]);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occured: ' + error.message;

  return (
    <Row className="mb-5">
      <Col>
        <Card>
          <Card.Header>ToDoList</Card.Header>
          <ListGroup>
            {sortedData.map(todo => {
              const {
                id,
                fields: { description, completed = false },
              } = todo;
              return (
                <ListGroup.Item key={id}>
                  <Row>
                    <Col>
                      <Form>
                        <Form.Check controlId="formBasicCheckbox">
                          <Form.Check.Input
                            type="checkbox"
                            checked={completed}
                            onChange={() =>
                              updateTodo({
                                ...todo,
                                fields: { description, completed: !completed },
                              })
                            }
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
                        onClick={() => setTodo(todo)}
                        disabled={completed}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mr-2"
                        onClick={() => deleteTodo(todo)}
                        disabled={completed}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
