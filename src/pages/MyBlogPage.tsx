import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import api, { Blog } from "../utility/blogApis";
import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import LoadingSpinner from "../components/LoadSpinner";
import { useBlogContext } from "../contextApi/UseBlogContext";

const MyBlogPage: React.FC = () => {
  const { myBlogPageNumber } = useBlogContext();
  const blogPerPage: number = 6;
  const nextPage: number = myBlogPageNumber + 1;
  const [isMyBlogsPage] = useState<boolean>(true);
  const { token } = useAuth();

  const userBlogQueryKey: QueryKey = ["userBlog", token, nextPage, blogPerPage];
  const { data, isLoading }: UseQueryResult<Blog> = useQuery({
    queryKey: userBlogQueryKey,
    queryFn: async () =>
      await api.fetchUserBlogs({
        token: token,
        page: nextPage,
        pageSize: blogPerPage,
      }),
  });

  const blogs: Blog[] = data ? data[0] : [];
  const totalCount: number = data ? data[1] : [];

  return (
    <div>
      <LoadingSpinner isLoading={isLoading} hasData={!!data} />
      <BlogCard
        blogs={blogs}
        totalCount={totalCount}
        isLoading={isLoading}
        isMyBlogsPage={isMyBlogsPage}
      />
    </div>
  );
};

export default MyBlogPage;
