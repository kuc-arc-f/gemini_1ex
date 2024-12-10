import React from 'react';
import TodoList from './Home/TodoList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
      <TodoList />
    </div>
  );
}

export default App;
