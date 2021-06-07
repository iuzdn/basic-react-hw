import './utils/airtable.config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Container } from 'react-bootstrap';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoContextProvider from './hooks/useContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoContextProvider>
        <Container className="mt-5">
          <TodoInput />
          <TodoList />
        </Container>
      </TodoContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
