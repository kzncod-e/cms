import { useEffect, useState } from "react";

import axios from "axios";
import Card from "../components/Cards";

export default function Home({ url }) {
  const [posts, setPosts] = useState([]);

  async function fetchPost() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      // console.log(data.data);

      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);
  // console.log(posts);
  return (
    <>
      <div className="pt-20">
        <Card posts={posts} url={url} fetchPost={fetchPost} />
        {/* <Login /> */}
      </div>
    </>
  );
}
