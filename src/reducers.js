import {
  ADD_TODO,
  SELECT_TODO,
  UPDATE_TODO,
  RESET_TODO,
  CHANGE_TODO_STATUS,
  REMOVE_TODO,
  VALUE_EXISTS,
  DESCRIPTION,
  STATUS_DONE,
} from './constants';

export const initialState = {
  selectedTodoId: null,
  error: null,
  allTodos: [
    { id: 1, description: 'Wash Car', statusDone: false },
    { id: 2, description: 'Feed Cat', statusDone: false },
    { id: 3, description: 'Shopping', statusDone: true },
    { id: 4, description: 'Haircut', statusDone: true },
    { id: 5, description: 'Learn to code', statusDone: true },
  ],
};

export default function reducer(state, { type, payload }) {
  const createId = () => {
    return state.allTodos.reduce((max, { id }) => Math.max(max, id), 0) + 1;
  };

  const addTodo = () => {
    if (checkExisting()) {
      return triggerError(VALUE_EXISTS);
    }
    const newTodo = {
      id: createId(),
      description: payload,
      statusDone: false,
    };
    const newFilteredArr = sortTodos([...state.allTodos, newTodo]);
    return { ...state, error: null, allTodos: [...newFilteredArr] };
  };

  //Checks if todo exists and returns true if todo exists
  const checkExisting = () => {
    const itemIdx = state.allTodos.findIndex(
      itm => itm.description.toLowerCase() === payload.toLowerCase()
    );
    console.log(itemIdx);
    return itemIdx > 0 ? true : false;
  };

  const triggerError = errorMsg => {
    return { ...state, error: errorMsg };
  };

  const selectTodo = id => {
    return { ...state, selectedTodoId: id };
  };

  const updateTodo = () => {
    if (checkExisting) {
      return triggerError(VALUE_EXISTS);
    }
    return findAndUpdate(state.selectedTodoId, DESCRIPTION, payload);
  };

  const changeStatus = ({ id, status }) => {
    return findAndUpdate(id, STATUS_DONE, !status);
  };

  const findAndUpdate = (id, key, value) => {
    const updatedTodos = state.allTodos.map(item => {
      if (item.id === id) {
        return { ...item, [key]: value };
      } else {
        return item;
      }
    });
    const sortedArr = sortTodos(updatedTodos);
    return { error: null, selectedTodoId: null, allTodos: [...sortedArr] };
  };

  const sortTodos = todos => {
    return todos.sort((a, b) => {
      const _a = a.statusDone;
      const _b = b.statusDone;
      return _a === _b ? 0 : _a > _b ? 1 : -1;
    });
  };

  const removeTodo = id => {
    return {
      ...state,
      allTodos: [...state.allTodos.filter(item => item.id !== id)],
    };
  };

  switch (type) {
    case ADD_TODO:
      return addTodo();
    case SELECT_TODO:
      return selectTodo(payload);
    case UPDATE_TODO:
      return updateTodo();
    case RESET_TODO:
      return [...state.allTodos, payload];
    case CHANGE_TODO_STATUS:
      return changeStatus(payload);
    case REMOVE_TODO:
      return removeTodo(payload);
    default:
      throw new Error();
  }
}
