import React, { useState } from 'react';

const TodoContext = React.createContext({});

export default function TodoContextProvider(props) {
  const [todo, setTodo] = useState({
    id: null,
    fields: {
      description: '',
      completed: false,
    },
  });

  const contextValues = {
    todo,
    setTodo,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {props.children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => React.useContext(TodoContext);
