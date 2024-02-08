import React from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useBlogContext } from "../contextApi/UseBlogContext";
import { dateFormatter } from "../utility/tools";
import Button from "./Button";
import Paginate from "./Paginate";
import { Blog, FetchBlogsResponse } from "../pages/BlogPage";

const BlogCard: React.FC<FetchBlogsResponse> = ({
  blogs,
  totalCount,
  isLoading,
}) => {
  const navigate = useNavigate();
  const { pageNumber, setPageNumber } = useBlogContext();

  const changePage = (data: { selected: number }) => {
    setPageNumber(data.selected);
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#312E81" loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Publish your passions, your way
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Create a unique and beautiful blog easily.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog: Blog) => (
            <article
              key={blog.id}
              className="flex max-w-xl flex-col items-start justify-between bg-slate-100 p-10 rounded hover:bg-indigo-100 transition transform hover:-translate-y-0.5"
            >
              <div className="relative mt-8 flex flex-col items-start gap-y-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-gray-700">
                      {dateFormatter(blog.createdAt)}
                    </time>
                    <div className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-500 hover:bg-gray-100">
                      {"published"}
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-1">
                    <div>{blog.title}</div>
                  </h3>
                  <div className="mt-5 line-clamp-3 text-md leading-6 text-gray-900">
                    {blog.content}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2 mt-2">
                      <svg
                        className="absolute w-6 h-8 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-semibold text-gray-900 text-xs leading-4 underline">
                      <div>
                        {blog.User.username}
                        <p className="text-gray-600">{"blogger"}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="inline-flex px-4 py-2 text-md font-medium text-black hover:bg-gray-300"
                    type={"button"}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    {"See more..."}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div>
        <Paginate
          pageNumber={pageNumber}
          totalCount={totalCount}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default BlogCard;
