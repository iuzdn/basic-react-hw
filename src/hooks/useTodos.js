import { useMutation, useQuery, useQueryClient } from 'react-query';
import uuid from 'react-uuid';
import {
  getTodosApi,
  addTodoApi,
  deleteTodoApi,
  updateTodoApi,
} from '../utils/api';
import { sortData } from '../utils/helperFns';
import { useTodoContext } from './useContext';
import { TODOS, ADD, UPDATE, DELETE } from '../utils/constants';

export default function useTodos() {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults();

  //----------------------------//
  //           Context          //
  //----------------------------//

  const {
    resetContext,
    setLoading,
    setSuccess,
    setMessage,
    setError,
    setTodo,
  } = useTodoContext();

  //----------------------------//
  //     Mutation Options       //
  //----------------------------//

  const optionsOn = action => ({
    onMutate: async todo => {
      resetContext();
      setLoading(true);
      await queryClient.cancelQueries('todos');
      const optimisticTodo = !todo.id ? { ...todo, id: uuid() } : todo;
      const previousTodos = queryClient.getQueryData(TODOS);
      let newData;

      switch (action) {
        case ADD:
          newData = [...previousTodos, optimisticTodo];
          break;
        case UPDATE:
          newData = previousTodos.map(item =>
            item.id === todo.id ? todo : item
          );
          break;
        case DELETE:
          newData = previousTodos.filter(item => item.id !== todo.id);
          break;
        default: {
          newData = previousTodos;
        }
      }

      queryClient.setQueryData(TODOS, sortData(newData));

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      setLoading(false);
      setError(true);
      setMessage(error.message);
      console.log(newTodo);
      setTodo(newTodo);
      queryClient.setQueryData(TODOS, context.previousTodos);
    },
    onSuccess: () => {
      setLoading(false);
      setSuccess(true);
      setMessage(`Todo ${action} successfully`);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  //----------------------------//
  //      Data fetching         //
  //----------------------------//

  const { data, isLoading, error } = useQuery(TODOS, getTodosApi, {
    refetchInterval: 2 * 1000,
  });

  //----------------------------//
  //         Mutations          //
  //----------------------------//

  const { mutate: addTodo } = useMutation(addTodoApi, optionsOn(ADD));
  const { mutate: updateTodo } = useMutation(updateTodoApi, optionsOn(UPDATE));
  const { mutate: deleteTodo } = useMutation(deleteTodoApi, optionsOn(DELETE));

  return { data, isLoading, error, addTodo, updateTodo, deleteTodo };
}
