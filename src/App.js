import { Container } from 'react-bootstrap';

import { TodosContextProvider } from './utils/context';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <Container className="mt-5">
      <TodosContextProvider>
        <TodoForm />
      </TodosContextProvider>
    </Container>
  );
}

export default App;
