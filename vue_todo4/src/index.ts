
import express from 'express';
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
const app = express();
import 'dotenv/config'
import { eq, like } from 'drizzle-orm';
import { todos } from './db/schema'; 
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle(process.env.DB_FILE_NAME!);

//
import App from './pages/App.vue'
//
import commonRouter from './routes/commonRouter';
import todoRoutes from './routes/todos';
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log("EXTERNAL_API_URL=", process.env.EXTERNAL_API_URL)
//
const errorObj = {ret: "NG", messase: "Error"};
// route
app.use('/api/common', commonRouter);
app.use('/api/todos', todoRoutes);


//SPA
app.get('/*', async (req: any, res: any) => {
  const app = createSSRApp(App)
  const html = await renderToString(app, {})
  try { res.send(html); } catch (error) { res.sendStatus(500); }
});


//start
const PORT = 3000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
