import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const todos = sqliteTable(
  "todos",
  {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content"),
    public_type: text("public_type", { enum: ["public", "private"] }).notNull(),
    food_orange: integer("food_orange", { mode: "boolean" }),
    food_apple: integer("food_apple", { mode: "boolean" }),
    food_banana: integer("food_banana", { mode: "boolean" }),
    pub_date1: text("pub_date1"),
    pub_date2: text("pub_date2"),
    pub_date3: text("pub_date3"),
    qty1: integer("qty1"),
    qty2: integer("qty2"),
    qty3: integer("qty3"),
  },
  (todos) => ({
    titleIdx: uniqueIndex("titleIdx").on(todos.title),
  })
);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

