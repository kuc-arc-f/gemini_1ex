// src/lib/validation.ts
import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  content: z.string().min(1, { message: '内容を入力してください' }),
  contentType: z.string().optional(),
  publicType: z.enum(['public', 'private']).optional(),
  foodOrange: z.boolean().optional(),
  foodApple: z.boolean().optional(),
  foodBanana: z.boolean().optional(),
  foodMelon: z.boolean().optional(),
  foodGrape: z.boolean().optional(),
  categoryFood: z.boolean().optional(),
  categoryDrink: z.boolean().optional(),
  categoryGadget: z.boolean().optional(),
  categorySport: z.boolean().optional(),
  categoryGovernment: z.boolean().optional(),
  categoryInternet: z.boolean().optional(),
  categorySmartphone: z.boolean().optional(),
  countryJp: z.string().optional(),
  countryEn: z.string().optional(),
  prefectureJp: z.string().optional(),
  prefectureEn: z.string().optional(),
  postNoJp: z.string().optional(),
  postNoEn: z.string().optional(),
  address1Jp: z.string().optional(),
  address1En: z.string().optional(),
  address2Jp: z.string().optional(),
  address2En: z.string().optional(),
  addressOtherJp: z.string().optional(),
  addressOtherEn: z.string().optional(),
  pubDate1: z.string().optional(),
  pubDate2: z.string().optional(),
  pubDate3: z.string().optional(),
  pubDate4: z.string().optional(),
  pubDate5: z.string().optional(),
  pubDate6: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
  qty4: z.string().optional(),
  qty5: z.string().optional(),
  qty6: z.string().optional(),
});

export type FormData = z.infer<typeof todoSchema>;
