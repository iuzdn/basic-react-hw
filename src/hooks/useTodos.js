import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getTodos = async () => {
  return await axios.get('/').then(res => res.data.records);
};

export default function useTodos() {
  const queryClient = useQueryClient();

  const todos = useQuery('todos', getTodos);

  const addTodo = useMutation(
    newTodo =>
      axios.post(
        '/',
        JSON.stringify({
          fields: {
            description: newTodo,
          },
        })
      ),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const updateTodo = useMutation(
    todo => {
      axios.patch(
        '/',
        JSON.stringify({
          records: [todo],
        })
      );
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const deleteTodo = useMutation(id => axios.delete('/' + id), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { todos, addTodo, updateTodo, deleteTodo };
}
