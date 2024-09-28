import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories({ url }) {
  const [categories, setCategories] = useState([]);
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setCategories(data.data);
      //   console.log(data.data);

      console.log("success read categories");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="overflow-x-auto pt-16">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>updatedAt</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((el) => (
              <tr key={el?.id}>
                <th>{el?.id}</th>
                <td>{el?.name}</td>
                <td>{el?.createdAt}</td>
                <td>{el?.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
