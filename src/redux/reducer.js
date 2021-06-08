import { ACTION_CONSTANTS } from '../redux/constants';

const {
  SET_INPUT,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  SELECT_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  RECEIVE_TODOS_SUCCESS,
  RECEIVE_TODOS_FAILURE,
  TRIGGER_DATA_LOADING,
  TRIGGER_TODO_LOADING,
} = ACTION_CONSTANTS;

const setInput = (state, { value }) => {
  return { ...state, todo: { ...state.todo, fields: { description: value } } };
};

const addTodoSuccess = (state, { todo }) => {
  return {
    ...state,
    data: [...state.data, todo],
    message: 'Todo added successfully',
    todoLoading: false,
    todo: initialTodo,
  };
};

const addTodoFailure = (state, { error }) => {
  return { ...state, error };
};

const selectTodo = (state, todo) => {
  return { ...state, todo };
};

const updateTodoSuccess = (state, { todo }) => {
  const data = state.data.map(item => (item.id === todo.id ? todo : item));
  return {
    ...state,
    data,
    message: 'Todo updated Successfully',
    todoLoading: false,
    todo: initialTodo,
  };
};

const updateTodoFailure = (state, { error }) => {
  return { ...state, error };
};

const deleteTodoSuccess = (state, id) => {
  return {
    ...state,
    data: [...state.data.filter(item => item.id !== id)],
    message: 'Todo deleted successfully',
    todoLoading: false,
  };
};

const deleteTodoFailure = (state, { error }) => {
  return { ...state, error };
};

const triggerDataLoading = state => {
  return {
    ...state,
    dataLoading: true,
  };
};

const triggerTodoLoading = state => {
  return {
    ...state,
    todoLoading: true,
  };
};

const receiveTodosSuccess = (state, { data }) => {
  return {
    ...state,
    data,
    dataLoading: false,
    error: null,
  };
};

const receiveTodosFailure = (state, { error, loading }) => {
  return { ...state, error, loading };
};

const initialTodo = {
  id: null,
  fields: {
    description: '',
    completed: false,
  },
};

const initialState = {
  error: null,
  dataLoading: false,
  todoLoading: false,
  message: '',
  todo: initialTodo,
  data: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INPUT:
      return setInput(state, payload);
    case ADD_TODO_SUCCESS:
      return addTodoSuccess(state, payload);
    case ADD_TODO_FAILURE:
      return addTodoFailure(state, payload);
    case SELECT_TODO:
      return selectTodo(state, payload);
    case UPDATE_TODO_SUCCESS:
      return updateTodoSuccess(state, payload);
    case UPDATE_TODO_FAILURE:
      return updateTodoFailure(state, payload);
    case DELETE_TODO_SUCCESS:
      return deleteTodoSuccess(state, payload);
    case DELETE_TODO_FAILURE:
      return deleteTodoFailure(state, payload);
    case RECEIVE_TODOS_SUCCESS:
      return receiveTodosSuccess(state, payload);
    case RECEIVE_TODOS_FAILURE:
      return receiveTodosFailure(state, payload);
    case TRIGGER_DATA_LOADING:
      return triggerDataLoading(state);
    case TRIGGER_TODO_LOADING:
      return triggerTodoLoading(state);
    default:
      return state;
  }
}
