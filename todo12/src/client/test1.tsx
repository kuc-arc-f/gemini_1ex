import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

// Zod バリデーションスキーマ
const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
});

const API_URL="http://localhost:8787"

function App() {


  return (
    <div className="container mx-auto p-4">test1
      <div id="dialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4">ダイアログのタイトル</h2>
          <p class="mb-4">これはダイアログのコンテンツです。</p>
          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onclick="closeDialog()">キャンセル</button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="confirmDialog()">確認</button>
          </div>
        </div>
      </div>

    </div>
  );
}


export default App;
