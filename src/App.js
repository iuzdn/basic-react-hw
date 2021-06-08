import { Container } from 'react-bootstrap';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container className="mt-5">
      <TodoInput />
      <TodoList />
    </Container>
  );
}

export default App;
