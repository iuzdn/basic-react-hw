import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTodo,
  selectTodo,
  deleteTodo,
  fetchTodos,
} from '../redux/actions';

import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { sortData } from '../utils/helperFns';

export default function TodoList() {
  const dispatch = useDispatch();
  const { data, dataLoading } = useSelector(state => state);

  const sortedData = React.useMemo(() => data && sortData(data), [data]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (dataLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Row className="mb-5">
      <Col>
        <Card>
          <Card.Header>ToDoList</Card.Header>
          <ListGroup>
            {sortedData.map(todo => {
              const {
                id,
                fields: { description, completed },
              } = todo;
              return (
                <ListGroup.Item key={id}>
                  <Row>
                    <Col>
                      <Form>
                        <Form.Check controlId="formBasicCheckbox">
                          <Form.Check.Input
                            type="checkbox"
                            checked={completed !== undefined ? completed : false}
                            onChange={() =>
                              dispatch(
                                updateTodo({
                                  ...todo,
                                  fields: { completed: !completed },
                                })
                              )
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
                        onClick={() => dispatch(selectTodo(todo))}
                        disabled={completed}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mr-2"
                        onClick={() => dispatch(deleteTodo(id))}
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
