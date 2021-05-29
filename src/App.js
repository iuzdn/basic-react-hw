import { useReducer, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import reducer, { initialState } from './reducers';

import {
  ADD_TODO,
  SELECT_TODO,
  UPDATE_TODO,
  CHANGE_TODO_STATUS,
  REMOVE_TODO,
} from './constants';

function App() {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const { error, selectedTodoId, allTodos } = state;
  const dispatchAction = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  console.log(error);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleChangeStatus = (id, status) => {
    dispatchAction(CHANGE_TODO_STATUS, { id, status });
  };

  const handleSubmit = e => {
    selectedTodoId
      ? dispatchAction(UPDATE_TODO, input)
      : dispatchAction(ADD_TODO, input);
    setInput('');
    e.preventDefault();
  };

  const handleSelect = (id, desc) => {
    dispatchAction(SELECT_TODO, id);
    setInput(desc);
  };

  const handleDelete = id => {
    dispatchAction(REMOVE_TODO, id);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Todo input:</Form.Label>
            <Form.Group as={Row} controlId="formBasicTodo">
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  value={input}
                  placeholder="Enter todo"
                  onChange={handleChange}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid" tooltip={true}>
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
      </Row>
    </Container>
  );
}

export default App;
