import React, { useState } from "react";
import {
  QueryKey,
  useQuery,
  useMutation,
  UseQueryResult,
  MutationKey,
  UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../contextApi/UseAuthContext";
import api from "../utility/blogApis";
import { useParams, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { dateFormatter } from "../utility/tools";
import { Blog } from "../utility/blogApis";
import Button from "../components/Button";
import ActionButton from "../components/ActionButton";
import Modal from "../components/Modal";
import BlogForm from "../components/BlogForm";
import ConfirmAlert from "../components/ConfirmAlert";

const BlogDetails: React.FC = () => {
  const [isModal, setModal] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false);
  const { token, user } = useAuth();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const blogQueryKey: QueryKey = ["blog", uuid, token];
  const blogUpdateKey: MutationKey = ["updateBlog", uuid, token];
  const blogDeleteKey: MutationKey = ["deleteBlog", uuid];

  const { data: blog, isLoading }: UseQueryResult<Blog> = useQuery({
    queryKey: blogQueryKey,
    queryFn: async () => api.fetchSingleBlog({ uuId: uuid, token: token }),
  });

  const { mutate: updateBlogMutate }: UseMutationResult<void, Error, Blog> =
    useMutation({
      mutationKey: blogUpdateKey,
      mutationFn: async (blog: Blog) =>
        await api.updateBlog({ uuId: uuid, updatedBlog: blog, token: token }),
      onSuccess: () => {
        toast.success("Your Blog Update Successfully !", {
          autoClose: 1000,
        });
        setModal(false);
      },
    });

  const { mutate: deleteBlogMutate }: UseMutationResult<void, Error, Blog> =
    useMutation({
      mutationKey: blogDeleteKey,
      mutationFn: async () =>
        await api.deleteBlog({ uuId: uuid, token: token }),
      onSuccess: () => {
        toast.success("Your Blog Delete Successfully !", {
          autoClose: 1000,
        });
        navigate("/blogs");
      },
    });

  const handleEditClick = (blog: Blog) => {
    updateBlogMutate(blog);
  };

  const handleDeleteClick = (blog: Blog) => {
    deleteBlogMutate(blog);
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
      <div className="flex justify-between items-center mb-4 mt-2">
        <div>
          <Button
            type="button"
            className="text-sm text-black hover:text-green-600 bg-white hover:bg-slate-100 border border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={() => navigate("/blogs")}
          >
            <span>&#8592; Go back</span>
          </Button>
        </div>

        {user?.id == blog.authorId ? (
          <div className="inline-flex items-center shadow-sm">
            <ActionButton type="edit" onClick={() => setModal(true)}>
              Edit
            </ActionButton>

            <ActionButton type="delete" onClick={() => setAlert(true)}>
              Delete
            </ActionButton>
          </div>
        ) : null}
      </div>
      {isAlert && (
        <div>
          <ConfirmAlert
            isOpen={isAlert}
            onClose={() => setAlert(false)}
            onConfirm={() => handleDeleteClick(blog)}
            title="Attention !"
            message="Are you sure you would like to Delete?"
          />
        </div>
      )}
      {isModal && (
        <div>
          <Modal isOpen={isModal} onClose={() => setModal(false)}>
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
      </div>
    </div>
  );
};

export default BlogDetails;
