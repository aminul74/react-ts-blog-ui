import React, { useState } from "react";
import {
  QueryKey,
  useQuery,
  useMutation,
  UseQueryResult,
  MutationKey,
  UseMutationResult,
} from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import { fetchSingleBlog, updateBlog } from "../utility/blogApis";
import { useParams, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { dateFormatter } from "../utility/tools";
import { Blog } from "../pages//BlogPage";
import Button from "../components/Button";
import ActionButton from "../components/ActionButton";
import Modal from "../components/Modal";
import BlogForm from "../components/BlogForm";

const BlogDetails: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { token, user } = useAuth();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const blogQueryKey: QueryKey = ["blog", uuid, token];
  const blogUpdateKey: MutationKey = ["updateBlog", uuid, token];

  const { data: blog, isLoading }: UseQueryResult<Blog> = useQuery({
    queryKey: blogQueryKey,
    queryFn: async () => fetchSingleBlog({ uuId: uuid, token: token }),
  });

  const { mutate: updateBlogMutate }:UseMutationResult<void, Error, Blog> = useMutation({
    mutationKey: blogUpdateKey,
    mutationFn: async (blog: Blog) =>
      await updateBlog({ uuId: uuid, updatedBlog: blog, token: token }),
    onSuccess: () => {
      setOpenModal(false);
    },
  });
  const handleEditClick = (blog: Blog) => {
    updateBlogMutate(blog);
  };

  const handleDeleteClick = () => {
    // Handle delete button click
  };

  if (isLoading || !blog) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#312E81" loading={isLoading} />
      </div>
    );
  }
  return (
    <div className="bg-white min-h-screen py-16 p-5 sm:py-20">
      {user?.id == blog.authorId ? (
        <div className="sticky flex justify-end items-start mt-4 mr-5 mb-4">
          <div className="inline-flex items-center shadow-sm">
            <ActionButton type="edit" onClick={() => setOpenModal(true)}>
              Edit
            </ActionButton>

            <ActionButton type="delete" onClick={handleDeleteClick}>
              Delete
            </ActionButton>
          </div>
        </div>
      ) : null}

      {openModal && (
        <div>
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <BlogForm onSubmit={handleEditClick} blog={blog} />
          </Modal>
        </div>
      )}
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
          {blog.title}
        </div>
        <div className="mt-2">
          <div className="text-sm leading-6 mt-2">
            <p className="font-semibold text-gray-900 underline">
              {blog.User.username}
            </p>
            <time className="text-gray-500">
              {dateFormatter(blog.createdAt)}
            </time>
          </div>
        </div>
        <p className="mt-8 text-lg leading-8 text-gray-800 pb-10">
          {blog.content}
        </p>
        <div>
          <Button
            type="button"
            className="px-5 py-2 text-sm text-white duration-200 sm:w-auto dark:hover:bg-gray-700 dark:bg-gray-800 mb-10 rounded-md"
            onClick={() => navigate("/blogs")}
          >
            <span>&#8592; Go back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
