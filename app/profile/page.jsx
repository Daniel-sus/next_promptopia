"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    } else {
      router.push("/");
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        console.log("POST ID CLICKED: ", post._id);
        console.log(posts);

        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
