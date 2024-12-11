# svelte_todo4

 Version: 0.9.1

 Author :
 
 date : 2024/12/09

 update :

***

Svelte + sqlite , Gemini-exp-1206 generate

***
### Setup

* .env

```
DB_FILE_NAME=file:local.db
```
***
* drizzle setting

https://orm.drizzle.team/docs/get-started/sqlite-new

***
* migrate

```
npx drizzle-kit generate
npx drizzle-kit migrate
```

***
### build

* build, dev-start

```
bun run build
bun run dev
```

***
### Prompt

```
コード生成して欲しいです。
CRUD アプリ、
バックエンド: Express.js
フロントエンド : Svelte , tailwindCSS 使用したいです。
データベース、Sqlite 連携してほしい。
ORMは、 drizzleを使用したい。

・バックエンドのみ、生成して欲しい。

・項目は、下記を追加したい。
title: INPUTタグ type=text
content: INPUTタグ textarea
content_type: INPUTタグ type=text
public_type (公開、非公開) INPUTタグ type=radio
food_orange: INPUTタグ type=checkbox
food_apple: INPUTタグ type=checkbox
food_banana:  INPUTタグ type=checkbox
food_melon:  INPUTタグ type=checkbox
food_grape:  INPUTタグ type=checkbox
category_food: INPUTタグ type=checkbox
category_drink: INPUTタグ type=checkbox
category_gadget: INPUTタグ type=checkbox
category_sport: INPUTタグ type=checkbox
category_government: INPUTタグ type=checkbox
category_internet: INPUTタグ type=checkbox
category_smartphone: INPUTタグ type=checkbox
country_jp:: INPUTタグ type=text
country_en:: INPUTタグ type=text
prefecture_jp: INPUTタグ type=text
prefecture_en: INPUTタグ type=text
post_no_jp: INPUTタグ type=text
post_no_en: INPUTタグ type=text
address_1_jp: INPUTタグ type=text
address_1_en: INPUTタグ type=text
address_2_jp: INPUTタグ type=text
address_2_en: INPUTタグ type=text
address_other_jp: INPUTタグ type=text
address_other_en: INPUTタグ type=text
pub_date1: INPUTタグ type=date
pub_date2: INPUTタグ type=date
pub_date3: INPUTタグ type=date
pub_date4: INPUTタグ type=date
pub_date5: INPUTタグ type=date
pub_date6: INPUTタグ type=date
qty1: INPUTタグ type=text
qty2: INPUTタグ type=text
qty3: INPUTタグ type=text
qty4: INPUTタグ type=text
qty5: INPUTタグ type=text
qty6: INPUTタグ type=text

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。

```

***
```
上記の、
フロントエンドのみ生成して欲しい。
Svelte , tailwindCSS 使用したいです。

・項目は、下記を追加したい。
title: INPUTタグ type=text
content: INPUTタグ textarea
content_type: INPUTタグ type=text
public_type (公開、非公開) INPUTタグ type=radio
food_orange: INPUTタグ type=checkbox
food_apple: INPUTタグ type=checkbox
food_banana:  INPUTタグ type=checkbox
food_melon:  INPUTタグ type=checkbox
food_grape:  INPUTタグ type=checkbox
category_food: INPUTタグ type=checkbox
category_drink: INPUTタグ type=checkbox
category_gadget: INPUTタグ type=checkbox
category_sport: INPUTタグ type=checkbox
category_government: INPUTタグ type=checkbox
category_internet: INPUTタグ type=checkbox
category_smartphone: INPUTタグ type=checkbox
country_jp:: INPUTタグ type=text
country_en:: INPUTタグ type=text
prefecture_jp: INPUTタグ type=text
prefecture_en: INPUTタグ type=text
post_no_jp: INPUTタグ type=text
post_no_en: INPUTタグ type=text
address_1_jp: INPUTタグ type=text
address_1_en: INPUTタグ type=text
address_2_jp: INPUTタグ type=text
address_2_en: INPUTタグ type=text
address_other_jp: INPUTタグ type=text
address_other_en: INPUTタグ type=text
pub_date1: INPUTタグ type=date
pub_date2: INPUTタグ type=date
pub_date3: INPUTタグ type=date
pub_date4: INPUTタグ type=date
pub_date5: INPUTタグ type=date
pub_date6: INPUTタグ type=date
qty1: INPUTタグ type=text
qty2: INPUTタグ type=text
qty3: INPUTタグ type=text
qty4: INPUTタグ type=text
qty5: INPUTタグ type=text
qty6: INPUTタグ type=text

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。

・バリデーション追加したい。
npmは zod 使用したい。
検証内容は、下記です。
title: 未入力は、エラー
content:未入力は、エラー


```
***
