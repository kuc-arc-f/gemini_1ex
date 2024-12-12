# todo12

 Version: 0.9.1

 Author  :
 
 date    : 2024/12/11

 update :

***

d1 database + CF-workers , Gemini-2.0-flash-exp

***
### Prompt

```
コード生成して欲しいです。
CRUD アプリ、
バックエンド: cloudflare workers , D1 database
フロントエンド: React,  tailwindCSS 使用したいです。

・バックエンドのみ、生成してほしい。

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
```

***
### workers API + d1

https://github.com/kuc-arc-f/workers16


***
