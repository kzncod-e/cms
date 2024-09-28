import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";
import Toastify from "toastify-js";
export default function Add({ url }) {
  const navigate = useNavigate();
  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    const addData = { title, content, imgUrl, categoryId: +categoryId };
    try {
      const { data } = await axios.post(`${url}/apis/blog/posts`, addData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      Toastify({
        text: `new data has been added`,
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
      navigate("/");
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
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }
  return (
    <>
      <Form url={url} handleSubmit={handleSubmit} />
    </>
  );
}
