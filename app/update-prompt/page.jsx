"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = React.useState(false);
  const [post, setPost] = React.useState({
    prompt: "",
    tag: "",
  });

  React.useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  const getPromptDetails = async () => {
    try {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    } catch (error) {}
  };

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
