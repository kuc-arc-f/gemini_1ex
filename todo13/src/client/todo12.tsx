import React, { useState, useEffect } from 'react';
import  Head from "../components/Head";

let API_URL = "http://localhost:8787";
async function getSysApiUrl(){
  try{
    let ret = "";
    const response = await fetch(`/api/common/get_sys_items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    if (!response.ok) throw new Error("error, getSystemParam");
    const data = await response.json();
    //console.log(data.data);
    ret = data.data.api_url;
    return ret;
  } catch (err) {
    console.error(err);
  }
}
//
function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
    public_type: '公開',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    pub_date1: '',
    pub_date2: '',
    pub_date3: '',
    qty1: '',
    qty2: '',
    qty3: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');

   const fetchTodos = async () => {
       try{
          API_URL = await getSysApiUrl();
           let url = API_URL + '/api/todo15';
           if (searchQuery){
             url = API_URL + `/api/todo15?query=${searchQuery}`;
           }
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setTodos(data);
            } else {
              console.error('Failed to fetch todos', response);
            }
      } catch (e) {
           console.error('Failed to fetch todos', e);
       }
    };

  useEffect(() => {
    fetchTodos();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo(prevTodo => ({
      ...prevTodo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const openDialog = (mode, todo = null) => {
      if (todo){
        setEditingTodo(todo);
         setNewTodo(todo);
      } else {
         setNewTodo({
            title: '',
            content: '',
            public_type: '公開',
            food_orange: false,
            food_apple: false,
            food_banana: false,
            pub_date1: '',
            pub_date2: '',
            pub_date3: '',
            qty1: '',
            qty2: '',
            qty3: '',
         });
        setEditingTodo(null);
      }
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

    const closeDialog = () => {
      setIsDialogOpen(false);
    };

    const handleAddEditTodo = async () => {
      try {
        const method = dialogMode === 'add' ? 'POST' : 'PUT';
        let url = API_URL + '/api/todo15';
        if (dialogMode === 'edit') {
          url = API_URL + '/api/todo15';
        }
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dialogMode === 'add' ? newTodo: {...newTodo, id: editingTodo.id}),
        });
    
        if (response.ok) {
          fetchTodos();
          closeDialog();
        } else {
          console.error('Failed to add/edit todo', response);
        }
      } catch (e) {
        console.error('Failed to add/edit todo', e)
      }
    };

  const handleDeleteTodo = async (id) => {
    try {
       if (!window.confirm('本当に削除しますか？')) return;
      const response = await fetch(`${API_URL}/api/todo15?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTodos();
      } else {
        console.error('Failed to delete todo', response);
      }
    } catch (e) {
       console.error('Failed to delete todo', e);
    }
  };

  return (
  <>
    <Head />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
       <div className="flex mb-4">
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 mr-2"
            />
          <button onClick={()=> setSearchQuery("")} className="bg-blue-500 text-white rounded p-2">クリア</button>
        </div>
      <button
          onClick={() => openDialog('add')}
          className="bg-green-500 text-white rounded p-2 mb-4"
      >
        Add New TODO
        </button>
      
      <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="border rounded p-2 flex items-center justify-between">
              <div>
                 <p><b>Title:</b>{todo.title}</p>
                <p><b>Content:</b>{todo.content}</p>
                <p><b>公開設定:</b>{todo.public_type}</p>
                  <p><b>フルーツ:</b>
                  {todo.food_orange && "オレンジ"}
                  {todo.food_apple && "リンゴ"}
                  {todo.food_banana && "バナナ"}
                  </p>
                <p><b>日付:</b>
                 {todo.pub_date1 && `pub_date1: ${todo.pub_date1}`}
                 {todo.pub_date2 && ` pub_date2: ${todo.pub_date2}`}
                 {todo.pub_date3 && ` pub_date3: ${todo.pub_date3}`}
                </p>
                 <p><b>数量:</b>
                {todo.qty1 && ` qty1: ${todo.qty1}`}
                 {todo.qty2 && ` qty2: ${todo.qty2}`}
                 {todo.qty3 && ` qty3: ${todo.qty3}`}
                 </p>
              </div>
              <div className="space-x-2">
                 <button onClick={() => openDialog('edit', todo)} className="bg-blue-500 text-white rounded p-2">編集</button>
                 <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white rounded p-2">削除</button>
             </div>
            </li>
          ))}
        </ul>
        {isDialogOpen && (
           <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center ">
              <div className="bg-white p-8 rounded shadow-md w-1/2  max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{dialogMode === 'add' ? 'Add New TODO' : 'Edit TODO'}</h2>
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                      Title:
                    </label>
                      <input
                         type="text"
                        id="title"
                          name="title"
                        value={newTodo.title}
                         onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                  </div>
                 <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content:
                     </label>
                     <textarea
                       id="content"
                        name="content"
                       value={newTodo.content}
                        onChange={handleInputChange}
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                  </div>
                   <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                         公開タイプ:
                    </label>
                     <div className="flex">
                         <label className="mr-4">
                           <input
                              type="radio"
                               name="public_type"
                              value="公開"
                               checked={newTodo.public_type === '公開'}
                                onChange={handleInputChange}
                            />
                             公開
                        </label>
                         <label>
                           <input
                              type="radio"
                             name="public_type"
                               value="非公開"
                                checked={newTodo.public_type === '非公開'}
                             onChange={handleInputChange}
                            />
                            非公開
                        </label>
                    </div>
                  </div>

                     <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">
                          フルーツ:
                     </label>
                     <div className="flex">
                         <label className="mr-4">
                           <input
                             type="checkbox"
                              name="food_orange"
                               checked={newTodo.food_orange}
                              onChange={handleInputChange}
                            />
                            オレンジ
                         </label>
                           <label className="mr-4">
                           <input
                              type="checkbox"
                                name="food_apple"
                              checked={newTodo.food_apple}
                               onChange={handleInputChange}
                           />
                             リンゴ
                        </label>
                          <label>
                           <input
                             type="checkbox"
                             name="food_banana"
                               checked={newTodo.food_banana}
                                onChange={handleInputChange}
                            />
                             バナナ
                         </label>
                      </div>
                   </div>
                    <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pub_date1">
                         pub_date1:
                        </label>
                         <input
                            type="date"
                            id="pub_date1"
                             name="pub_date1"
                             value={newTodo.pub_date1}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>

                     <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pub_date2">
                         pub_date2:
                        </label>
                         <input
                            type="date"
                            id="pub_date2"
                             name="pub_date2"
                             value={newTodo.pub_date2}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>
                     <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pub_date3">
                         pub_date3:
                        </label>
                         <input
                            type="date"
                            id="pub_date3"
                             name="pub_date3"
                             value={newTodo.pub_date3}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>
                   <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty1">
                         qty1:
                        </label>
                         <input
                            type="text"
                            id="qty1"
                             name="qty1"
                             value={newTodo.qty1}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>
                   <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty2">
                         qty2:
                        </label>
                         <input
                            type="text"
                            id="qty2"
                             name="qty2"
                             value={newTodo.qty2}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>
                   <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty3">
                         qty3:
                        </label>
                         <input
                            type="text"
                            id="qty3"
                             name="qty3"
                             value={newTodo.qty3}
                           onChange={handleInputChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                   </div>

                <div className="flex justify-end">
                     <button onClick={closeDialog} className="bg-gray-500 text-white rounded p-2 mr-2">
                        Cancel
                     </button>
                    <button onClick={handleAddEditTodo} className="bg-blue-500 text-white rounded p-2">
                     {dialogMode === 'add' ? 'Add' : 'Update'}
                    </button>
                 </div>
              </div>
           </div>
      )}
    </div>
  </>

  );
}

export default App;