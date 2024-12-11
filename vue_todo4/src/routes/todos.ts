// routes/todos.js
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


//const express = require('express');
//const router = express.Router();
//const db = require('../db/index');
//const { todos } = require('../models/todo');
//const { eq, sql } = require('drizzle-orm');

// すべての TODO を取得する
router.get('/', async (req, res) => {
  try {
    const result = await db.select().from(todos);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// ID で TODO を取得する
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.select().from(todos).where(eq(todos.id, id));
    if (result.length === 0) {
      return res.status(404).send('TODO が見つかりません');
    }
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// TODO を作成する
router.post('/', async (req, res) => {
  try {
    const newTodo = req.body;

    // バリデーション (必要に応じて)

    const result = await db.insert(todos).values(newTodo).returning();
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// TODO を更新する
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTodo = req.body;

    // バリデーション (必要に応じて)

    const result = await db
      .update(todos)
      .set(updatedTodo)
      .where(eq(todos.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).send('TODO が見つかりません');
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// TODO を削除する
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.delete(todos).where(eq(todos.id, id)).returning();

    if (result.length === 0) {
      return res.status(404).send('TODO が見つかりません');
    }

    res.json({ message: 'TODO が削除されました' });
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// TODO を検索する
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const result = await db
      .select()
      .from(todos)
      .where(sql`${todos.title} LIKE ${'%' + query + '%'}`)
      .or(sql`${todos.content} LIKE ${'%' + query + '%'}`);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

//module.exports = router;
export default router;