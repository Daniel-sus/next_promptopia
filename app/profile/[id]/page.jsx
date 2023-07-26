"use client";

import React from "react";

import Profile from "@components/Profile";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (session?.user.id !== params.id) {
      fetchPosts();
    } else {
      router.push("/profile");
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default UserProfile;
