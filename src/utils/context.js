import React, { useCallback, useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './reducers';
import {
  ADD_TODO,
  SORT_TODOS,
  SELECT_TODO,
  UPDATE_TODO_DESC,
  UPDATE_TODO_STATUS,
  REMOVE_TODO,
} from './constants';

const TodosContext = React.createContext({});

export function TodosContextProvider(props) {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const { error, selectedTodoId, allTodos } = state;
  const dispatchAction = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  const sortItems = useCallback(() => dispatchAction(SORT_TODOS), []);

  useEffect(() => {
    sortItems();
  }, [sortItems]);

  useEffect(() => {
    !error && setInput('');
  }, [error]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleChangeStatus = (id, status) => {
    dispatchAction(UPDATE_TODO_STATUS, { id, status });
  };

  const handleSubmit = e => {
    selectedTodoId
      ? dispatchAction(UPDATE_TODO_DESC, input)
      : dispatchAction(ADD_TODO, input);
    e.preventDefault();
  };

  const handleSelect = (id, desc) => {
    dispatchAction(SELECT_TODO, id);
    setInput(desc);
  };

  const handleDelete = id => {
    dispatchAction(REMOVE_TODO, id);
  };

  const contextObject = {
    input,
    error,
    selectedTodoId,
    allTodos,
    functions: {
      handleChange,
      handleChangeStatus,
      handleSubmit,
      handleSelect,
      handleDelete,
    },
  };

  return (
    <TodosContext.Provider value={contextObject}>
      {props.children}
    </TodosContext.Provider>
  );
}

export const useTodosContext = () => React.useContext(TodosContext);
