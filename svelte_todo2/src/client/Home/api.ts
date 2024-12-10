import type { Todo, NewTodo } from "../../db/schema";

//const BASE_URL = "http://localhost:3000/api/todos"; // バックエンドの URL
const BASE_URL = "/api/todos"; // バックエンドの URL

// TODO リストの取得
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await res.json();
}

// TODO の検索
export async function searchTodos(query: string): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  if (!res.ok) {
    throw new Error("Failed to search todos");
  }
  return await res.json();
}

// TODO の追加
export async function createTodo(todo: NewTodo): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  return await res.json();
}

// TODO の更新
export async function updateTodo(id: number, todo: NewTodo): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error("Failed to update todo");
  }
  return await res.json();
}

// TODO の削除
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}
