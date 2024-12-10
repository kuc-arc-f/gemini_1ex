import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  content: z.string().min(1, { message: '内容は必須です' }),
  publicType: z.number(),
  foodOrange: z.boolean(),
  foodApple: z.boolean(),
  foodBanana: z.boolean(),
  pubDate1: z.string().nullable(),
  pubDate2: z.string().nullable(),
  pubDate3: z.string().nullable(),
  qty1: z.number().nullable(),
  qty2: z.number().nullable(),
  qty3: z.number().nullable(),
});

