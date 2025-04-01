import React from 'react';
import TodoCard from './ToDoCard';

const TodoList = ({ todos, setTodos }) => {
  const updateStatus = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, status: todo.status === 'pending' ? 'done' : 'pending' } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updated);
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center', marginTop: '2rem' }}>No tasks added yet</p>
      ) : (
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onStatusChange={updateStatus}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
