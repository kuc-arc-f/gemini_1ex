const express = require('express');
const router = express.Router();
//const db = require('../db/db');
const { todos } = require('../db/schema');
//const { like } = require('drizzle-orm');
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);


// TODOリストの全件取得
router.get('/', async (req, res) => {
  try {
    const allTodos = await db.select().from(todos).all();
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TODOの検索
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: '検索キーワードが指定されていません' });
  }
  try {
    const result = await db.select().from(todos).where(like(todos.title, `%${q}%`)).all();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TODOの追加
router.post('/', async (req, res) => {
  try {
    //console.log(req.body);
    const newTodo = await db.insert(todos).values(req.body).returning();
    res.status(201).json(newTodo[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// TODOの取得
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db.select().from(todos).where({ id }).first();
    if (!todo) {
      return res.status(404).json({ message: 'TODOが見つかりません' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TODOの更新
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    //.where(eq(todos.id, Number(id)))
    //const updatedTodo = await db.update(todos).set(req.body).where({ id }).returning();
    const updatedTodo = await db.update(todos)
    .set(req.body)
    .where(eq(todos.id, Number(id)))
    .returning();

    if (updatedTodo.length === 0) {
      return res.status(404).json({ message: 'TODOが見つかりません' });
    }
    res.json(updatedTodo[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// TODOの削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id=", id);
    //const deletedTodo = await db.delete(todos).where({ Number(id) }).returning();
    const deletedTodo = await db.delete(todos).where(eq(todos.id, Number(id))).returning();
    if (deletedTodo.length === 0) {
      return res.status(404).json({ message: 'TODOが見つかりません' });
    }
    res.json({ message: 'TODOを削除しました', todo: deletedTodo[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
