# todo2

 Version: 0.9.1

 Author :
 
 date : 2024/12/07

 update :

***

React + sqlite , gemini-exp-1206 generate

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


```
コード生成して欲しいです。
CRUDアプリ、
バックエンド: Express.js
フロントエンド : React , tailwindCSS 使用したいです。
データベース、Sqlite 連携してほしい。
ORMは、 drizzleを使用したい。

・バックエンドのみ、生成して欲しい。


項目は、下記を追加したい。
title: INPUTタグ type=text
content: INPUTタグ textarea
public_type (公開、非公開) INPUTタグ type=radio
food_orange: INPUTタグ type=checkbox
food_apple: INPUTタグ type=checkbox
food_banana:  INPUTタグ type=checkbox
pub_date1: INPUTタグ type=date
pub_date2: INPUTタグ type=date
pub_date3: INPUTタグ type=date
qty1: INPUTタグ type=text
qty2: INPUTタグ type=text
qty3: INPUTタグ type=text

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。

```
***

```
上記、
フロントエンドのみ生成して欲しい。
React , tailwindCSS 使用したいです。

・項目は、下記を追加したい。
title: INPUTタグ type=text
content: INPUTタグ textarea
public_type (公開、非公開) INPUTタグ type=radio
food_orange: INPUTタグ type=checkbox
food_apple: INPUTタグ type=checkbox
food_banana:  INPUTタグ type=checkbox
pub_date1: INPUTタグ type=date
pub_date2: INPUTタグ type=date
pub_date3: INPUTタグ type=date
qty1: INPUTタグ type=text
qty2: INPUTタグ type=text
qty3: INPUTタグ type=text

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。

・バリデーション追加したい。react-hook-form未使用にしたい
npmは zod 使用したい。
検証内容は、下記です。
title: 未入力は、エラー
content:未入力は、エラー

```


***
