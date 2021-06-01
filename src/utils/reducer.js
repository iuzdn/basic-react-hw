import { ACTION_CONSTANTS } from './constants';

const {
  SET_INPUT,
  ADD_TODO,
  SELECT_TODO,
  SORT_TODOS,
  UPDATE_TODO_DESC,
  UPDATE_TODO_STATUS,
  REMOVE_TODO,
  VALUE_EXISTS,
  DESCRIPTION,
  STATUS_DONE,
  RECEIVE_TODOS_SUCCESS,
  RECEIVE_TODOS_FAILURE,
  TRIGGER_LOADING,
} = ACTION_CONSTANTS;

const setInput = (state, input) => {
  return { ...state, input };
};

const createId = todos => {
  return todos.reduce((max, { id }) => Math.max(max, id), 0) + 1;
};

const addTodo = (state, description) => {
  const itemExists = checkExisting(state.allTodos, description);
  if (itemExists) {
    return triggerError(state, VALUE_EXISTS);
  }
  const newTodo = {
    id: createId(state.allTodos),
    description,
    statusDone: false,
  };
  const updatedTodos = [...state.allTodos, newTodo];
  return sortTodos(resetState(state), updatedTodos);
};

//Checks if todo exists and returns true if todo exists
const checkExisting = (todos, desc) => {
  const itemIdx = todos.findIndex(
    itm => itm.description.toLowerCase() === desc.toLowerCase()
  );
  return itemIdx > -1 ? true : false;
};

const triggerError = (state, errorMsg) => {
  return { ...state, error: errorMsg };
};

const selectTodo = (state, id) => {
  return { ...state, selectedTodoId: id };
};

const updateDesc = (state, desc) => {
  if (checkExisting(state.allTodos, desc)) {
    console.log('error');
    return triggerError(state, VALUE_EXISTS);
  }
  return findAndUpdate(state, {
    id: state.selectedTodoId,
    key: DESCRIPTION,
    value: desc,
  });
};

const updateStatus = (state, { id, status }) => {
  return findAndUpdate(state, { id, key: STATUS_DONE, value: !status });
};

const findAndUpdate = (state, { id, key, value }) => {
  const updatedTodos = state.allTodos.map(item => {
    if (item.id === id) {
      return { ...item, [key]: value };
    } else {
      return item;
    }
  });

  return sortTodos(resetState(state), updatedTodos);
};

const resetState = state => {
  return { ...state, error: null, selectedTodoId: null, input: '' };
};

const sortTodos = (state, todos) => {
  const sortedArr = todos.sort((a, b) => {
    const _a = a.statusDone;
    const _b = b.statusDone;
    return _a === _b ? 0 : _a > _b ? 1 : -1;
  });
  return { ...state, allTodos: [...sortedArr] };
};

const removeTodo = (state, id) => {
  return {
    ...state,
    allTodos: [...state.allTodos.filter(item => item.id !== id)],
  };
};

const triggerLoading = (state, payload) => {
  return {
    ...state,
    loading: payload.loading,
  };
};

const receiveTodosSuccess = (state, payload) => {
  return {
    ...state,
    allTodos: payload.todos,
    loading: payload.loading,
    error: payload.error,
  };
};

const receiveTodosFailure = (state, { error, loading }) => {
  return { ...state, error, loading };
};

export const initialState = {
  input: '',
  selectedTodoId: null,
  error: null,
  loading: false,
  allTodos: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INPUT:
      return setInput(state, payload);
    case ADD_TODO:
      return addTodo(state, payload);
    case SELECT_TODO:
      return selectTodo(state, payload);
    case SORT_TODOS:
      return sortTodos(state, state.allTodos);
    case UPDATE_TODO_DESC:
      return updateDesc(state, payload);
    case UPDATE_TODO_STATUS:
      return updateStatus(state, payload);
    case REMOVE_TODO:
      return removeTodo(state, payload);
    case RECEIVE_TODOS_SUCCESS:
      return receiveTodosSuccess(state, payload);
    case RECEIVE_TODOS_FAILURE:
      return receiveTodosFailure(state, payload);
    case TRIGGER_LOADING:
      return triggerLoading(state, payload);
    default:
      return state;
  }
}
