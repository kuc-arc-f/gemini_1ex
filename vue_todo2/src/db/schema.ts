import { sqliteTable, text, integer, SQLiteBoolean } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  publicType: integer('public_type').notNull(), // 0: 非公開, 1: 公開
  foodOrange: integer('food_orange', { mode: 'boolean' }).notNull(),
  foodApple: integer('food_apple', { mode: 'boolean' }).notNull(),
  foodBanana: integer('food_banana', { mode: 'boolean' }).notNull(),
  pubDate1: text('pub_date1'), // ISO形式の文字列で保存 (YYYY-MM-DD)
  pubDate2: text('pub_date2'),
  pubDate3: text('pub_date3'),
  qty1: integer('qty1'),
  qty2: integer('qty2'),
  qty3: integer('qty3'),
});