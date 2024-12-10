import { Router } from "express";
//import db from "../db";
import { todos, NewTodo, Todo } from "../db/schema";
import { eq, sql } from "drizzle-orm";

//import { eq, like } from 'drizzle-orm';
//import { sql } from "drizzle-orm";
//import { todos } from './db/schema';
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);


const router = Router();

// TODO リストの取得
router.get("/", async (req, res) => {
  try {
    const todoList: Todo[] = await db.select().from(todos);
    //console.log(todoList);
    res.json(todoList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// TODO の検索
router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (typeof q !== "string") {
    res.status(400).json({ error: "Invalid query parameter" });
    return;
  }

  try {
    const results = await db
      .select()
      .from(todos)
      .where(sql`${todos.title} LIKE ${"%" + q + "%"}`)
      .all();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search todos" });
  }
});

// TODO の追加
router.post("/", async (req, res) => {
  const newTodo: NewTodo = req.body;

  try {
    const result = await db.insert(todos).values(newTodo).returning();
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// TODO の更新
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo: NewTodo = req.body;

  try {
    const result = await db
      .update(todos)
      .set(updatedTodo)
      .where(eq(todos.id, Number(id)))
      .returning();
    if (result.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.json(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// TODO の削除
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db
      .delete(todos)
      .where(eq(todos.id, Number(id)))
      .returning();
    if (result.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.json({ message: "Todo deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;