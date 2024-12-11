import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { createTodo, updateTodo } from './api';
import { Todo, NewTodo, validateTodo, FormErrors } from './utils';

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  refreshTodos: () => void;
}

const TodoDialog: React.FC<TodoDialogProps> = ({
  isOpen,
  onClose,
  todo,
  refreshTodos,
}) => {
  const [formData, setFormData] = useState<NewTodo>({
    title: '',
    content: '',
    contentType: '',
    publicType: 'public',
    foodOrange: false,
    foodApple: false,
    foodBanana: false,
    foodMelon: false,
    foodGrape: false,
    categoryFood: false,
    categoryDrink: false,
    categoryGadget: false,
    categorySport: false,
    categoryGovernment: false,
    categoryInternet: false,
    categorySmartphone: false,
    countryJp: '',
    countryEn: '',
    prefectureJp: '',
    prefectureEn: '',
    postNoJp: '',
    postNoEn: '',
    address1Jp: '',
    address1En: '',
    address2Jp: '',
    address2En: '',
    addressOtherJp: '',
    addressOtherEn: '',
    pubDate1: '',
    pubDate2: '',
    pubDate3: '',
    pubDate4: '',
    pubDate5: '',
    pubDate6: '',
    qty1: '',
    qty2: '',
    qty3: '',
    qty4: '',
    qty5: '',
    qty6: '',
  });

  const [errors, setErrors] = useState<FormErrors<NewTodo> | null>(null);

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        content: todo.content,
        contentType: todo.contentType || '',
        publicType: todo.publicType || 'public',
        foodOrange: todo.foodOrange || false,
        foodApple: todo.foodApple || false,
        foodBanana: todo.foodBanana || false,
        foodMelon: todo.foodMelon || false,
        foodGrape: todo.foodGrape || false,
        categoryFood: todo.categoryFood || false,
        categoryDrink: todo.categoryDrink || false,
        categoryGadget: todo.categoryGadget || false,
        categorySport: todo.categorySport || false,
        categoryGovernment: todo.categoryGovernment || false,
        categoryInternet: todo.categoryInternet || false,
        categorySmartphone: todo.categorySmartphone || false,
        countryJp: todo.countryJp || '',
        countryEn: todo.countryEn || '',
        prefectureJp: todo.prefectureJp || '',
        prefectureEn: todo.prefectureEn || '',
        postNoJp: todo.postNoJp || '',
        postNoEn: todo.postNoEn || '',
        address1Jp: todo.address1Jp || '',
        address1En: todo.address1En || '',
        address2Jp: todo.address2Jp || '',
        address2En: todo.address2En || '',
        addressOtherJp: todo.addressOtherJp || '',
        addressOtherEn: todo.addressOtherEn || '',
        pubDate1: todo.pubDate1 || '',
        pubDate2: todo.pubDate2 || '',
        pubDate3: todo.pubDate3 || '',
        pubDate4: todo.pubDate4 || '',
        pubDate5: todo.pubDate5 || '',
        pubDate6: todo.pubDate6 || '',
        qty1: todo.qty1 || '',
        qty2: todo.qty2 || '',
        qty3: todo.qty3 || '',
        qty4: todo.qty4 || '',
        qty5: todo.qty5 || '',
        qty6: todo.qty6 || '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        contentType: '',
        publicType: 'public',
        foodOrange: false,
        foodApple: false,
        foodBanana: false,
        foodMelon: false,
        foodGrape: false,
        categoryFood: false,
        categoryDrink: false,
        categoryGadget: false,
        categorySport: false,
        categoryGovernment: false,
        categoryInternet: false,
        categorySmartphone: false,
        countryJp: '',
        countryEn: '',
        prefectureJp: '',
        prefectureEn: '',
        postNoJp: '',
        postNoEn: '',
        address1Jp: '',
        address1En: '',
        address2Jp: '',
        address2En: '',
        addressOtherJp: '',
        addressOtherEn: '',
        pubDate1: '',
        pubDate2: '',
        pubDate3: '',
        pubDate4: '',
        pubDate5: '',
        pubDate6: '',
        qty1: '',
        qty2: '',
        qty3: '',
        qty4: '',
        qty5: '',
        qty6: '',
      });
    }
  }, [todo, isOpen]);

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTodo(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (todo) {
        await updateTodo(todo.id, formData);
      } else {
        await createTodo(formData);
      }
      await refreshTodos();
      onClose();
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };
  //max-w-lg
  return (
    <div appear show={isOpen} as={Fragment}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-green-100 rounded-lg p-6 max-w-2xl w-full z-50">
            <h3
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {todo ? 'TODO編集' : 'TODO追加'}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  タイトル
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors?.title && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.title[0]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  内容
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors?.content && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.content[0]}
                  </p>
                )}
              </div>  
              <div>
                <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
                <input type="text" id="contentType" name="contentType" value={formData.contentType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div className="flex items-center">
                <input type="radio" id="public" name="publicType" value="public" checked={formData.publicType === 'public'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="public" className="ml-2 block text-sm text-gray-900">公開</label>

                <input type="radio" id="private" name="publicType" value="private" checked={formData.publicType === 'private'} onChange={handleChange} className="ml-4 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="private" className="ml-2 block text-sm text-gray-900">非公開</label>
              </div>
              <div>Food:</div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="foodOrange" checked={formData.foodOrange || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-green-600" />
                  <span className="ml-2">Orange</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="foodApple" checked={formData.foodApple || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-green-600" />
                  <span className="ml-2">Apple</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="foodBanana" checked={formData.foodBanana || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-green-600" />
                  <span className="ml-2">Banana</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="foodMelon" checked={formData.foodMelon || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-green-600" />
                  <span className="ml-2">Melon</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="foodGrape" checked={formData.foodGrape || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-green-600" />
                  <span className="ml-2">Grape</span>
                </label>
              </div>   
              <div>Category:</div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categoryFood" checked={formData.categoryFood || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Food</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categoryDrink" checked={formData.categoryDrink || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Drink</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categoryGadget" checked={formData.categoryGadget || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Gadget</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categorySport" checked={formData.categorySport || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Sport</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categoryGovernment" checked={formData.categoryGovernment || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Government</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categoryInternet" checked={formData.categoryInternet || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Internet</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="categorySmartphone" checked={formData.categorySmartphone || false} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2">Smartphone</span>
                </label>
              </div>                                     

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="countryJp" className="block text-sm font-medium text-gray-700">Country (JP)</label>
                <input type="text" id="countryJp" name="countryJp" value={formData.countryJp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="countryEn" className="block text-sm font-medium text-gray-700">Country (EN)</label>
                <input type="text" id="countryEn" name="countryEn" value={formData.countryEn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              {/* Add similar input fields for other text inputs */}

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="prefectureJp" className="block text-sm font-medium text-gray-700">Prefecture (JP)</label>
                <input type="text" id="prefectureJp" name="prefectureJp" value={formData.prefectureJp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="prefectureEn" className="block text-sm font-medium text-gray-700">Prefecture (EN)</label>
                <input type="text" id="prefectureEn" name="prefectureEn" value={formData.prefectureEn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              {/* Add similar input fields for other text inputs */}

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="postNoJp" className="block text-sm font-medium text-gray-700">Post No (JP)</label>
                <input type="text" id="postNoJp" name="postNoJp" value={formData.postNoJp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="postNoEn" className="block text-sm font-medium text-gray-700">Post No (EN)</label>
                <input type="text" id="postNoEn" name="postNoEn" value={formData.postNoEn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              {/* Add similar input fields for other text inputs */}

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="address1Jp" className="block text-sm font-medium text-gray-700">Address 1 (JP)</label>
                <input type="text" id="address1Jp" name="address1Jp" value={formData.address1Jp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="address1En" className="block text-sm font-medium text-gray-700">Address 1 (EN)</label>
                <input type="text" id="address1En" name="address1En" value={formData.address1En} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              {/* Add similar input fields for other text inputs */}

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="address2Jp" className="block text-sm font-medium text-gray-700">Address 2 (JP)</label>
                <input type="text" id="address2Jp" name="address2Jp" value={formData.address2Jp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="address2En" className="block text-sm font-medium text-gray-700">Address 2 (EN)</label>
                <input type="text" id="address2En" name="address2En" value={formData.address2En} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              {/* Add similar input fields for other text inputs */}

              {/* Add similar input fields for other text inputs */}
              <div>
                <label htmlFor="addressOtherJp" className="block text-sm font-medium text-gray-700">Address Other (JP)</label>
                <input type="text" id="addressOtherJp" name="addressOtherJp" value={formData.addressOtherJp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="addressOtherEn" className="block text-sm font-medium text-gray-700">Address Other (EN)</label>
                <input type="text" id="addressOtherEn" name="addressOtherEn" value={formData.addressOtherEn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>

              <div>
                <label htmlFor="pubDate1" className="block text-sm font-medium text-gray-700">日付1</label>
                <input type="date" id="pubDate1" name="pubDate1" value={formData.pubDate1} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="pubDate2" className="block text-sm font-medium text-gray-700">日付2</label>
                <input type="date" id="pubDate2" name="pubDate2" value={formData.pubDate2} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="pubDate3" className="block text-sm font-medium text-gray-700">日付3</label>
                <input type="date" id="pubDate3" name="pubDate3" value={formData.pubDate3} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="pubDate4" className="block text-sm font-medium text-gray-700">日付4</label>
                <input type="date" id="pubDate4" name="pubDate4" value={formData.pubDate4} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="pubDate5" className="block text-sm font-medium text-gray-700">日付5</label>
                <input type="date" id="pubDate5" name="pubDate5" value={formData.pubDate5} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="pubDate6" className="block text-sm font-medium text-gray-700">日付6</label>
                <input type="date" id="pubDate6" name="pubDate6" value={formData.pubDate6} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>

              <div>
                <label htmlFor="qty1" className="block text-sm font-medium text-gray-700">数量1</label>
                <input type="text" id="qty1" name="qty1" value={formData.qty1} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="qty2" className="block text-sm font-medium text-gray-700">数量2</label>
                <input type="text" id="qty2" name="qty2" value={formData.qty2} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="qty3" className="block text-sm font-medium text-gray-700">数量3</label>
                <input type="text" id="qty3" name="qty3" value={formData.qty3} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="qty4" className="block text-sm font-medium text-gray-700">数量4</label>
                <input type="text" id="qty4" name="qty4" value={formData.qty4} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="qty5" className="block text-sm font-medium text-gray-700">数量5</label>
                <input type="text" id="qty5" name="qty5" value={formData.qty5} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="qty6" className="block text-sm font-medium text-gray-700">数量6</label>
                <input type="text" id="qty6" name="qty6" value={formData.qty6} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>

              {/* button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  保存
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ml-3"
                  onClick={onClose}
                >
                  キャンセル
                </button>
              </div>
            </form>            
          </div>

        </div>
      </div>
    </div>
  )
};

export default TodoDialog;