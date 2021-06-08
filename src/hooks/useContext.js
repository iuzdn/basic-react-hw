import React, { useState } from 'react';

const TodoContext = React.createContext({});

const initialTodo = {
  id: null,
  fields: {
    description: '',
    completed: false,
  },
};

export default function TodoContextProvider(props) {
  const [todo, setTodo] = useState(initialTodo);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const resetContext = () => {
    setTodo(initialTodo);
    setError(false);
    setSuccess(false);
    setMessage('');
  };

  const context = {
    isLoading,
    isError,
    isSuccess,
    message,
    todo,
    setTodo,
    resetContext,
    setLoading,
    setError,
    setMessage,
    setSuccess,
  };

  return (
    <TodoContext.Provider value={context}>
      {props.children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => React.useContext(TodoContext);
