import fs from 'node:fs/promises'
import express from "express";
import { z } from 'zod';
import { eq, like } from 'drizzle-orm';
import { todos, NewTodo, Todo } from './db/schema';

import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);

import { renderToString } from 'react-dom/server';
import cookieParser from "cookie-parser";
import session from "express-session";

import Top from './pages/App';
import About from './pages/about';
//
import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
} from './routes/todos';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
console.log("env= ", process.env.NODE_ENV);
//
const router = Router();
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/search', searchTodos);
//
app.use('/api/todos', router);
//app.use('/api/common', commonRouter);
const errorObj = {ret: "NG", messase: "Error"};

//SPA
app.get("/*", (req, res) => {
  res.send(renderToString(Top()));
});

//start
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
  