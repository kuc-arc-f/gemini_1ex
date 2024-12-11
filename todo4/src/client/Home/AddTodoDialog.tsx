import React, { useState } from 'react';
import { z } from 'zod';

const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  content: z.string().min(1, { message: '内容を入力してください' }),
  public_type: z.enum(['public', 'private']),
  food_orange: z.boolean().optional(),
  food_apple: z.boolean().optional(),
  food_banana: z.boolean().optional(),
  food_melon: z.boolean().optional(),
  food_grape: z.boolean().optional(),
  pub_date1: z.string().optional(),
  pub_date2: z.string().optional(),
  pub_date3: z.string().optional(),
  pub_date4: z.string().optional(),
  pub_date5: z.string().optional(),
  pub_date6: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
  qty4: z.string().optional(),
  qty5: z.string().optional(),
  qty6: z.string().optional(),
});

const AddTodoDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    public_type: 'public',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    food_melon: false,
    food_grape: false,
    pub_date1: '',
    pub_date2: '',
    pub_date3: '',
    pub_date4: '',
    pub_date5: '',
    pub_date6: '',
    qty1: '',
    qty2: '',
    qty3: '',
    qty4: '',
    qty5: '',
    qty6: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = todoSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
    } else {
      onSubmit(formData);
      onClose();
      // フォームの初期化
      setFormData({
        title: '',
        content: '',
        public_type: 'public',
        food_orange: false,
        food_apple: false,
        food_banana: false,
        food_melon: false,
        food_grape: false,
        pub_date1: '',
        pub_date2: '',
        pub_date3: '',
        pub_date4: '',
        pub_date5: '',
        pub_date6: '',
        qty1: '',
        qty2: '',
        qty3: '',
        qty4: '',
        qty5: '',
        qty6: '',
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  // 
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
        <h3 className="text-xl font-bold mb-4">TODO追加</h3>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          {/* content */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              内容
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
          </div>
          {/* public_type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">公開設定</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="public_type"
                  value="public"
                  checked={formData.public_type === 'public'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">公開</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="public_type"
                  value="private"
                  checked={formData.public_type === 'private'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">非公開</span>
              </label>
            </div>
          </div>
          {/* food checkboxes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Food</label>
            <div className="mt-2">
              {['orange', 'apple', 'banana', 'melon', 'grape'].map((food) => (
                <label key={food} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={`food_${food}`}
                    checked={formData[`food_${food}`]}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{food}</span>
                </label>
              ))}
            </div>
          </div>
          {/* pub_date inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">日付</label>
            <div className="grid grid-cols-3 gap-4">
              {['pub_date1', 'pub_date2', 'pub_date3', 'pub_date4', 'pub_date5', 'pub_date6'].map((date, index) => (
                <input
                  key={index}
                  type="date"
                  name={date}
                  value={formData[date]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ))}
            </div>
          </div>
          {/* qty inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">数量</label>
            <div className="grid grid-cols-3 gap-4">
              {['qty1', 'qty2', 'qty3', 'qty4', 'qty5', 'qty6'].map((qty, index) => (
                <input
                  key={index}
                  type="text"
                  name={qty}
                  value={formData[qty]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ))}
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              保存
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoDialog;
