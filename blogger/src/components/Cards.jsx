import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import { useState } from "react";
import Button from "./Button";
export default function Card({ url, posts, fetchPost }) {
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${url}/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      Toastify({
        text: ` data has been deleted`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      fetchPost();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function handleUpload(id) {
    try {
      const formData = new FormData();
      formData.append("file", file[id]);

      const { data } = await axios.patch(
        `${url}/apis/blog/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      Toastify({
        text: data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      fetchPost();
    } catch (error) {
      Toastify({
        text: error.response.status.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>titke</th>
              <th>content</th>
              <th>imgUrl</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((el) => (
              <tr key={el.id}>
                <th>{el.id}</th>
                <td>{el.title}</td>
                <td>{el.content}</td>
                <td>
                  <img src={el.imgUrl} alt="" />
                </td>
                <td className="flex  gap-2 flex-col">
                  <button
                    className="btn"
                    onClick={() => navigate(`/edit/${el.id}`)}>
                    Edit
                  </button>
                  <Button
                    handleClick={handleDelete}
                    id={el.id}
                    propName="Delete"
                  />
                  <div className="flex flex-col items-center">
                    <label className="cursor-pointer bg-base-300 text-gray-700 px-4 py-2 rounded-md flex justify-center items-center w-full max-w-xs">
                      {file[el.id] ? file[el.id].name : "Choose File"}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setFile({ ...file, [el.id]: e.target.files[0] })
                        }
                      />
                    </label>
                    <button
                      className={file[el.id] ? `btn` : ""}
                      onClick={() => handleUpload(el.id)}>
                      {file[el.id] ? `edit img` : ""}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
