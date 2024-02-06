import React from "react";
import BlogCard from "../components/BlogCard";
import FloatButton from "../components/FloatButton";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../utility/blogApis";
import { useBlogContext } from "../contextApi/UseBlogContext";

interface BlogPageProps {
  pageSize: number;
}
const BlogPage: React.FC<BlogPageProps> = ({ pageSize }) => {
  const { pageNumber } = useBlogContext();
  const nextPage = pageNumber + 1;
  const blogPerPage = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", pageNumber, pageSize],
    queryFn: async () => fetchBlogs({ page: nextPage, pageSize: blogPerPage }),
    staleTime: 16000,
  });

  const blogs = data ? data[0] : [];
  const totalCount = data ? data[1] : [];
  return (
    <div>
      <div>
        <BlogCard blogs={blogs} totalCount={totalCount} isLoading={isLoading} />
      </div>
      <div>
        <FloatButton />
      </div>
    </div>
  );
};

export default BlogPage;
