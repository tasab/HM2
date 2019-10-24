import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { getData } from "./api";

import "./styles.css";

function MainComponent({ startSetOfPost, url }) {
  let [posts, setPosts] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const fetchDataByUrl = async url => {
    const data = await getData(url);
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataByUrl(url);
  }, [url]);

  return posts.length > 0 ? (
    <PostList
      startSetOfPost={startSetOfPost}
      posts={posts}
      isLoading={isLoading}
    />
  ) : null;
}

const PostList = ({ startSetOfPost, posts, isLoading }) => {
  let [maxKlick, setMaxKlick] = useState(startSetOfPost);

  const onClick = () => {
    const steapOfPost = 10;
    if (maxKlick > posts.length) {
      setMaxKlick(posts.length);
    }
    setMaxKlick(maxKlick + steapOfPost);
  };

  return (
    <div>
      {isLoading
        ? "Loader"
        : posts
            .slice(0, maxKlick)
            .map((post, index) => <PostListItem post={post} key={post.id} />)}
      <button onClick={onClick}>onClick</button>
    </div>
  );
};

const PostListItem = ({ post }) => {
  return (
    <div className="post-block">
      <b>ID - </b>
      {post.id}
      <br />
      <b>Title - </b>
      {post.title}
      <br />
      <b>Body - </b>
      {post.body}
      <br />
    </div>
  );
};

const App = () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const startSetOfPost = 10;

  return (
    <>
      <MainComponent startSetOfPost={startSetOfPost} url={URL} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
