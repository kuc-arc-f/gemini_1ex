import React from 'react';

const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <p className="text-gray-700">{todo.content}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={onEdit}
        >
          編集
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onDelete}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
