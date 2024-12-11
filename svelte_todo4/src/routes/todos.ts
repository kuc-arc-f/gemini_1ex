import { Router } from "express";
//import { db } from "../db";
import { todos, NewTodo, Todo } from "../db/schema";
import { eq, like, or } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);

const router = Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const result: Todo[] = await db.select().from(todos).all();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// Search todos
router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (typeof query !== "string") {
    res.status(400).json({ message: "Invalid query parameter" });
    return;
  }

  try {
    const result: Todo[] = await db
      .select()
      .from(todos)
      .where(
        or(
          like(todos.title, `%${query}%`),
          like(todos.content, `%${query}%`),
          like(todos.address1Jp, `%${query}%`),
          like(todos.address1En, `%${query}%`)
          // Add other fields as needed
        )
      )
      .all();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching todos" });
  }
});

// Get a single todo by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  try {
    const todo: Todo | undefined = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .get();
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(todo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching todo" });
  }
});

// Create a new todo
router.post("/", async (req, res) => {
  const newTodo: NewTodo = req.body;
  try {
    const insertedTodo = await db.insert(todos).values(newTodo).returning().get();
    res.status(201).json(insertedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating todo" });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo: NewTodo = req.body;

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  try {
    const result = await db
      .update(todos)
      .set(updatedTodo)
      .where(eq(todos.id, id))
      .returning()
      .get();
    if (!result) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating todo" });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  try {
    const result = await db.delete(todos).where(eq(todos.id, id)).returning().get();
    if (!result) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json({ message: "Todo deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting todo" });
  }
});

export default router;
