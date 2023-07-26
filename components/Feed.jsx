"use client";

import React from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [timerId, setTimerId] = React.useState(null);

  console.log(posts);

  const filteredPosts = posts.filter((post) =>
    !searchText
      ? true
      : post.tag.includes(searchText) ||
        post.prompt.includes(searchText) ||
        post.creator.username.includes(searchText)
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt/");
      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
