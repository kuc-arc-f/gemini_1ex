//import { int, sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
//import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  publicType: text('public_type', { enum: ['public', 'private'] }).notNull(),
  foodOrange: integer('food_orange', { mode: 'boolean' }),
  foodApple: integer('food_apple', { mode: 'boolean' }),
  foodBanana: integer('food_banana', { mode: 'boolean' }),
  pubDate1: text('pub_date1'),
  pubDate2: text('pub_date2'),
  pubDate3: text('pub_date3'),
  qty1: integer('qty1'),
  qty2: integer('qty2'),
  qty3: integer('qty3'),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;


