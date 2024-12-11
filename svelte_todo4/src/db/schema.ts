import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  contentType: text("content_type"),
  publicType: text("public_type"), // "public" or "private"
  foodOrange: integer("food_orange", { mode: "boolean" }),
  foodApple: integer("food_apple", { mode: "boolean" }),
  foodBanana: integer("food_banana", { mode: "boolean" }),
  foodMelon: integer("food_melon", { mode: "boolean" }),
  foodGrape: integer("food_grape", { mode: "boolean" }),
  categoryFood: integer("category_food", { mode: "boolean" }),
  categoryDrink: integer("category_drink", { mode: "boolean" }),
  categoryGadget: integer("category_gadget", { mode: "boolean" }),
  categorySport: integer("category_sport", { mode: "boolean" }),
  categoryGovernment: integer("category_government", { mode: "boolean" }),
  categoryInternet: integer("category_internet", { mode: "boolean" }),
  categorySmartphone: integer("category_smartphone", { mode: "boolean" }),
  countryJp: text("country_jp"),
  countryEn: text("country_en"),
  prefectureJp: text("prefecture_jp"),
  prefectureEn: text("prefecture_en"),
  postNoJp: text("post_no_jp"),
  postNoEn: text("post_no_en"),
  address1Jp: text("address_1_jp"),
  address1En: text("address_1_en"),
  address2Jp: text("address_2_jp"),
  address2En: text("address_2_en"),
  addressOtherJp: text("address_other_jp"),
  addressOtherEn: text("address_other_en"),
  pubDate1: text("pub_date1"), // Store date as string in "YYYY-MM-DD" format
  pubDate2: text("pub_date2"),
  pubDate3: text("pub_date3"),
  pubDate4: text("pub_date4"),
  pubDate5: text("pub_date5"),
  pubDate6: text("pub_date6"),
  qty1: text("qty1"), // Store numbers as strings for simplicity
  qty2: text("qty2"),
  qty3: text("qty3"),
  qty4: text("qty4"),
  qty5: text("qty5"),
  qty6: text("qty6"),
});

export type Todo = typeof todos.$inferSelect; // Type for select queries
export type NewTodo = typeof todos.$inferInsert; // Type for insert queries
