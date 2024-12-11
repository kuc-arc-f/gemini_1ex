// src/utils.ts
import { z } from 'zod';

// Zodを用いたバリデーションスキーマ
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

// データの型
export type Todo = {
  id: number;
  title: string;
  content: string;
  contentType: string | null;
  publicType: 'public' | 'private' | null;
  foodOrange: boolean | null;
  foodApple: boolean | null;
  foodBanana: boolean | null;
  foodMelon: boolean | null;
  foodGrape: boolean | null;
  categoryFood: boolean | null;
  categoryDrink: boolean | null;
  categoryGadget: boolean | null;
  categorySport: boolean | null;
  categoryGovernment: boolean | null;
  categoryInternet: boolean | null;
  categorySmartphone: boolean | null;
  countryJp: string | null;
  countryEn: string | null;
  prefectureJp: string | null;
  prefectureEn: string | null;
  postNoJp: string | null;
  postNoEn: string | null;
  address1Jp: string | null;
  address1En: string | null;
  address2Jp: string | null;
  address2En: string | null;
  addressOtherJp: string | null;
  addressOtherEn: string | null;
  pubDate1: string | null;
  pubDate2: string | null;
  pubDate3: string | null;
  pubDate4: string | null;
  pubDate5: string | null;
  pubDate6: string | null;
  qty1: string | null;
  qty2: string | null;
  qty3: string | null;
  qty4: string | null;
  qty5: string | null;
  qty6: string | null;
};

export type NewTodo = z.infer<typeof todoSchema>;

// バリデーションエラーの型
export type FormErrors<T> = {
  [K in keyof T]?: string[];
};

// バリデーション関数
export const validateTodo = (todo: NewTodo): FormErrors<NewTodo> | null => {
  const result = todoSchema.safeParse(todo);
  if (!result.success) {
    const errors: FormErrors<NewTodo> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.') as keyof NewTodo;
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path]?.push(issue.message);
    });
    return errors;
  }
  return null;
};