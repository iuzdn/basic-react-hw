import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';

const initialTodos = [
  { id: 1, description: 'Wash Car' },
  { id: 2, description: 'Feed Cat' },
  { id: 3, description: 'Shopping' },
];

const initialTodo = {
  id: null,
  description: '',
};

function App() {
  const [todo, setTodo] = useState(initialTodo);
  const [todos, setTodos] = useState(initialTodos);

  const { id, description } = todo;

  function createId() {
    const newId =
      todos.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
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
    setTodos([...todos, todo]);
    setTodo(initialTodo);
    e.preventDefault();
  }

  function handleDelete(id) {
    setTodos(todos.filter(item => item.id !== id));
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
              {todos.map(({ id, description }) => (
                <ListGroup.Item key={id}>
                  <Row>
                    <Col>{description}</Col>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() => handleDelete(id)}
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
