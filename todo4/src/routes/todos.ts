import { Router } from 'express';
//import { db } from '../db';
import { Todo, NewTodo, todos } from '../db/schema';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);

const router = Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const result: Todo[] = await db.select().from(todos).all();
    //console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Get a specific todo
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo: Todo | undefined = await db.select().from(todos).where(eq(todos.id, id)).get();
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send({ message: 'Todo not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const newTodo: NewTodo = req.body;
    const insertedTodo = await db.insert(todos).values(newTodo).returning().get();
    res.status(201).json(insertedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedTodo: NewTodo = req.body;
    const result = await db.update(todos).set(updatedTodo).where(eq(todos.id, id)).returning().get();
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Todo not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTodo = await db.delete(todos).where(eq(todos.id, id)).returning().get();
    if (deletedTodo) {
      res.json(deletedTodo);
    } else {
      res.status(404).send({ message: 'Todo not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Search todos
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const results = await db.select().from(todos).where(like(todos.title, `%${query}%`)).all();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
