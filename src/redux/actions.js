import { ACTION_CONSTANTS } from './constants';

const {
  SET_INPUT,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  SELECT_TODO,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  FETCH_TODOS,
  RECEIVE_TODOS_SUCCESS,
  RECEIVE_TODOS_FAILURE,
  TRIGGER_DATA_LOADING,
  TRIGGER_TODO_LOADING,
} = ACTION_CONSTANTS;

export const setInput = value => {
  return {
    type: SET_INPUT,
    payload: {
      value,
    },
  };
};

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  };
};

export const addTodoSuccess = todo => {
  return {
    type: ADD_TODO_SUCCESS,
    payload: {
      todo,
    },
  };
};

export const addTodoFailure = error => {
  return {
    type: ADD_TODO_FAILURE,
    payload: {
      error,
    },
  };
};

export const updateTodo = todo => {
  return {
    type: UPDATE_TODO,
    payload: {
      id: todo.id,
      fields: {
        description: todo.fields.description,
        completed: todo.fields.completed,
      },
    },
  };
};

export const updateTodoSuccess = todo => {
  return {
    type: UPDATE_TODO_SUCCESS,
    payload: {
      todo,
    },
  };
};

export const updateTodoFailure = error => {
  return {
    type: UPDATE_TODO_FAILURE,
    payload: {
      error,
    },
  };
};

export const selectTodo = todo => {
  return {
    type: SELECT_TODO,
    payload: todo,
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const deleteTodoSuccess = id => {
  return {
    type: DELETE_TODO_SUCCESS,
    payload: id,
  };
};

export const deleteTodoFailure = error => {
  return {
    type: DELETE_TODO_FAILURE,
    payload: {
      error,
    },
  };
};

export const fetchTodos = () => {
  return {
    type: FETCH_TODOS,
  };
};

export const receiveTodosSuccess = data => {
  return {
    type: RECEIVE_TODOS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const receiveTodosFailure = error => {
  return {
    type: RECEIVE_TODOS_FAILURE,
    payload: {
      error,
      loading: false,
    },
  };
};

export const triggerDataLoading = () => {
  return {
    type: TRIGGER_DATA_LOADING,
  };
};

export const triggerTodoLoading = () => {
  return {
    type: TRIGGER_TODO_LOADING,
  };
};
