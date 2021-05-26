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

const initialState = [
  { id: 1, description: 'Wash Car' },
  { id: 2, description: 'Feed Cat' },
  { id: 3, description: 'Shopping' },
];

const initialTodo = {
  id: null,
  description: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];
    case 'removeTodo':
      return [...state.filter(item => item.id !== action.payload)];
    default:
      throw new Error();
  }
}

function App() {
  const [todo, setTodo] = useState(initialTodo);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id, description } = todo;

  function createId() {
    const newId =
      state.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
    return newId;
  }

  function handleChange(e) {
    const updatedTodo = id
      ? { ...todo, description: e.target.value }
      : { id: createId(), description: e.target.value };
    setTodo(updatedTodo);
    console.log(todo);
  }

  function handleSubmit(e) {
    dispatch({ type: 'addTodo', payload: todo });
    setTodo(initialTodo);
    e.preventDefault();
  }

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
                  value={description}
                  placeholder="Enter todo"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Button type="submit">Add Todo</Button>
              </Form.Group>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Card>
            <Card.Header>ToDoList</Card.Header>
            <ListGroup>
              {state.map(({ id, description }) => (
                <ListGroup.Item key={id}>
                  <Row>
                    <Col>{description}</Col>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() =>
                        dispatch({ type: 'removeTodo', payload: id })
                      }
                    >
                      Delete
                    </Button>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
