import axios from "axios";
import Toastify from "toastify-js";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({ url }) {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      //   console.log(data.data);

      setProduct(data.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.status.error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    const addData = { title, content, imgUrl, categoryId: +categoryId };
    try {
      const { data } = await axios.put(
        `${url}/apis/blog/posts/${id}`,
        addData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      Toastify({
        text: `succed editted data`,
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
      console.log(error);

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
      <Form handleSubmit={handleSubmit} url={url} product={product} />
    </>
  );
}
