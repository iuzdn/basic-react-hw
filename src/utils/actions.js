import { ACTION_CONSTANTS } from './constants';

const {
  SET_INPUT,
  ADD_TODO,
  UPDATE_TODO_DESC,
  UPDATE_TODO_STATUS,
  SORT_TODOS,
  SELECT_TODO,
  REMOVE_TODO,
  FETCH_TODOS,
  RECEIVE_TODOS_SUCCESS,
  RECEIVE_TODOS_FAILURE,
  TRIGGER_LOADING,
} = ACTION_CONSTANTS;

export const setInput = value => {
  return {
    type: SET_INPUT,
    payload: value,
  };
};

export const addTodo = item => {
  return {
    type: ADD_TODO,
    payload: item,
  };
};

export const sortTodos = () => {
  return {
    type: SORT_TODOS,
  };
};

export const updateStatus = (id, status) => {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      id,
      status,
    },
  };
};

export const updateDesc = newDesc => {
  return {
    type: UPDATE_TODO_DESC,
    payload: newDesc,
  };
};

export const selectTodo = id => {
  return {
    type: SELECT_TODO,
    payload: id,
  };
};

export const deleteTodo = id => {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
};

export const fetchTodos = () => {
  return {
    type: FETCH_TODOS,
  };
};

export const receiveTodosSuccess = todos => {
  return {
    type: RECEIVE_TODOS_SUCCESS,
    payload: {
      todos,
      error: null,
      loading: false,
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

export const triggerLoading = () => {
  return {
    type: TRIGGER_LOADING,
    payload: {
      loading: true,
    },
  };
};
