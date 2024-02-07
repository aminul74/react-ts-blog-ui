import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utility/blogFormValidation";
import InputField from "./InputField";
import Button from "./Button";
import { Blog } from "../pages//BlogPage";

interface BlogFormProps {
  onSubmit: SubmitHandler<Blog>;
  blog?: Blog;
}
const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Blog>({
    resolver: yupResolver(schema) as never,
  });

  const [localTitle, setLocalTitle] = useState(blog?.title || "");
  const [localContent, setLocalContent] = useState(blog?.content || "");

  useEffect(() => {
    setLocalTitle(blog?.title || "");
    setLocalContent(blog?.content || "");
  }, [blog]);

  // console.log("Title :", localTitle, "XXContent :", localContent);

  const submitForm: SubmitHandler<Blog> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(submitForm)}>
      <div className="relative z-0 w-full mb-5 group">
        <InputField
          label="Title"
          type="text"
          name="title"
          id="title"
          autoComplete="current-title"
          placeholder="title"
          required
          register={register}
          defaultValue={localTitle}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-white pb-1"
        >
          Content
        </label>
        <textarea
          {...register("content")}
          className="block w-full h-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 bg-white"
          id="content"
          placeholder="content"
          required
          defaultValue={localContent}
        />
        <p className="text-red-500">{errors.content?.message}</p>
      </div>
      <Button
        type="submit"
        className="text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-800 dark:hover:bg-indigo-900"
      >
        Submit
      </Button>
    </form>
  );
};

export default BlogForm;
