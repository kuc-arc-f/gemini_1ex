import { Router, Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { Database } from 'sqlite'; // Import Database from 'sqlite'
import sqlite3 from 'sqlite3';
import { todos } from '../db/schema';
import { Todo } from '../models/todo';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);

const router = Router();

// データベース接続 (修正)
/*
const sqlite = new Database({
  filename: './mydb.sqlite',
  driver: sqlite3.Database,
});
const db = drizzle(sqlite);
*/

// TODO一覧取得 (検索機能付き)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    let result;
    if (q) {
      result = await db
        .select()
        .from(todos)
        .where(like(todos.title, `%${q}%`))
        .all();
    } else {
      result = await db.select().from(todos).all();
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO詳細取得
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await db.select().from(todos).where(eq(todos.id, Number(id))).get();
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO作成
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTodo: Todo = req.body;

    // バリデーション (簡易的な例)
    if (!newTodo.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await db.insert(todos).values(newTodo).returning().get();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO更新
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo: Todo = req.body;

    // バリデーション (簡易的な例)
    if (!updatedTodo.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await db
      .update(todos)
      .set(updatedTodo)
      .where(eq(todos.id, Number(id)))
      .returning()
      .get();

    if (!result) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO削除
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.delete(todos).where(eq(todos.id, Number(id))).returning().get();

    if (!result) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
