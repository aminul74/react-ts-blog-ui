import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import FloatButton from "../components/FloatButton";
import {
  useQuery,
  useMutation,
  QueryKey,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  MutationKey,
} from "@tanstack/react-query";
import api, { Blog } from "../utility/blogApis";
import { useBlogContext } from "../contextApi/UseBlogContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import BlogForm from "../components/BlogForm";
import { useAuth } from "../contextApi/UseAuthContext";
import { toast } from "react-toastify";

const BlogPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pageNumber } = useBlogContext();
  const nextPage: number = pageNumber + 1;
  const blogPerPage: number = 6;

  const queryKey: QueryKey = ["blogs", nextPage, blogPerPage];
  const mutationKey: MutationKey = ["createBlog", token];

  const { data, isLoading }: UseQueryResult<Blog> = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await api.fetchBlogs({ page: nextPage, pageSize: blogPerPage }),
    staleTime: 16000,
  });

  const blogs: Blog[] = data ? data[0] : [];
  const totalCount: number = data ? data[1] : [];

  const { mutate: createBlogMutate }: UseMutationResult<void, Error, Blog> =
    useMutation({
      mutationKey,
      mutationFn: async (data: Blog) => {
        await api.createBlog({ blog: data, token: token });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        toast.success("Blog Create Successfully !", { autoClose: 1000 });
        setOpenModal(false);
        navigate("/blogs");
      },
    });

  const handleCreateBlog = (blog: Blog) => {
    createBlogMutate(blog);
  };
  return (
    <div>
      <div>
        <BlogCard blogs={blogs} totalCount={totalCount} isLoading={isLoading} />
      </div>
      {token && (
        <div>
          <FloatButton onClick={() => setOpenModal(true)} />
        </div>
      )}
      <Modal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        title="Create Your Blog"
      >
        <BlogForm onSubmit={handleCreateBlog} />
      </Modal>
    </div>
  );
};

export default BlogPage;
