//import { int, sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
//import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  public_type: text('public_type').notNull(), // 'public' or 'private'
  food_orange: integer('food_orange', { mode: 'boolean' }),
  food_apple: integer('food_apple', { mode: 'boolean' }),
  food_banana: integer('food_banana', { mode: 'boolean' }),
  food_melon: integer('food_melon', { mode: 'boolean' }),
  food_grape: integer('food_grape', { mode: 'boolean' }),
  pub_date1: text('pub_date1'),
  pub_date2: text('pub_date2'),
  pub_date3: text('pub_date3'),
  pub_date4: text('pub_date4'),
  pub_date5: text('pub_date5'),
  pub_date6: text('pub_date6'),
  qty1: text('qty1'),
  qty2: text('qty2'),
  qty3: text('qty3'),
  qty4: text('qty4'),
  qty5: text('qty5'),
  qty6: text('qty6'),
});

export type Todo = typeof todos.$inferSelect;
//export type NewTodo = typeof todos.$inferInsert;



