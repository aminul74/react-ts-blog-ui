import React from "react";
import BlogCard from "../components/BlogCard";
import api, { Blog } from "../utility/blogApis";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import LoadingSpinner from "../components/LoadSpinner";

const MyBlogPage: React.FC = () => {
  const { token, user } = useAuth();
  const userBlogQueryKey: QueryKey = ["userBlog", token, user?.id];

  const { data, isLoading } = useQuery({
    queryKey: userBlogQueryKey,
    queryFn: async () => await api.fetchUserBlogs({ token: token }),
  });

  const blogs: Blog[] = data ? data[0] : [];
  const totalCount: number = data ? data[1] : 0;
  console.log("first", blogs);

  return (
    <div>
      <LoadingSpinner isLoading={isLoading} hasData={data} />
      <BlogCard
        blogs={blogs}
        totalCount={totalCount}
        isLoading={isLoading} message={"Hello"}        
      />
    </div>
  );
};

export default MyBlogPage;
