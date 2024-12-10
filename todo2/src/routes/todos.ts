import { Request, Response } from 'express';
//import { db } from '../db';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { todos, NewTodo, Todo } from '../db/schema';
const db = drizzle(process.env.DB_FILE_NAME!);

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await db.select().from(todos).all();
    console.log(allTodos);
    res.json(allTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await db.select().from(todos).where(eq(todos.id, Number(id))).get();
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo: NewTodo = req.body;
    const insertedTodo = await db.insert(todos).values(newTodo).returning().get();
    res.status(201).json(insertedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData: NewTodo = req.body;
    const updatedTodo = await db.update(todos)
      .set(updatedData)
      .where(eq(todos.id, Number(id)))
      .returning()
      .get();
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await db.delete(todos).where(eq(todos.id, Number(id))).returning().get();
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};

export const searchTodos = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const searchResults = await db.select().from(todos)
      .where(like(todos.title, `%${query}%`))
      .all();
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: 'Error searching todos', error });
  }
};