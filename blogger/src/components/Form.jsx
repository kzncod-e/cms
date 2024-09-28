import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
export default function Form({ url, handleSubmit, product }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      // console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setContent(product.content || "");
      setImgUrl(product.imgUrl || "");
      setCategoryId(product.categoryId || 0);
    }
  }, [product]);

  return (
    <>
      <div className="flex h-screen items-center">
        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => handleSubmit(e, title, content, imgUrl, categoryId)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              content
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              imgUrl
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              onChange={(e) => setCategoryId(e.target.value)}>
              <option defaultValue={"choose catagories"}></option>
              {categories.map((el) => (
                <option
                  className="bg-base-300 border-none"
                  key={el.id}
                  value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <Button propName="submit" />
        </form>
      </div>
    </>
  );
}
