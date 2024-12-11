# todo11

 Version: 0.9.1

 Author  :
 
 date    : 2024/12/11

 update :

***

d1 database + CF-workers , Gemini-exp-1206 generate

***
### Prompt

```
コード生成して欲しいです。
CRUD アプリ、
バックエンド: cloudflare workers , D1 database
フロントエンド: React,  tailwindCSS 使用したいです。

・バックエンドのみ、生成してほしい。

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

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。

・バリデーション追加したい。react-hook-form未使用にしたい
npmは zod 使用したい。
検証内容は、下記です。
TODOデータ: 未入力は、エラー
```
***
### workers API + d1

https://github.com/kuc-arc-f/workers16


***
