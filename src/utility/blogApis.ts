import axios from "axios";

interface User {
  username: string;
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  User: User;
}

export interface FetchBlogsProps {
  page?: number;
  pageSize?: number;
}
export interface CreateBlogProps {
  blog: Blog;
  token: string | null;
}

export interface FetchSingleBlogProps {
  uuId?: string | null;
  token: string | null;
}

export interface UpdateBlogProps {
  uuId?: string;
  updatedBlog: Blog;
  token: string | null;
}

export interface DeleteBlogProps {
  uuId?: string;
  token: string | null;
}

export interface FetchUserBlogsProps {
  token: string | null;
}

const USER_BLOG_URL = "http://localhost:4001/api/v1/blogs/my-blogs";

const fetchBlogs = async ({ page, pageSize }: FetchBlogsProps) => {
  const response = await axios.get(
    `http://localhost:4001/api/v1/blogs?page=${page}&size=${pageSize}`
  );
  return response.data;
};

const createBlog = async ({ blog, token }: CreateBlogProps) => {
  const response = await axios.post(
    "http://localhost:4001/api/v1/blogs/create",
    blog,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const fetchSingleBlog = async ({ uuId, token }: FetchSingleBlogProps) => {
  const response = await axios.get(
    `http://localhost:4001/api/v1/blogs/${uuId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data ? response.data[0] : [];
};

const updateBlog = async ({ uuId, updatedBlog, token }: UpdateBlogProps) => {
  await axios.put(`http://localhost:4001/api/v1/blogs/${uuId}`, updatedBlog, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteBlog = async ({ uuId, token }: DeleteBlogProps) => {
  await axios.delete(`http://localhost:4001/api/v1/blogs/${uuId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchUserBlogs = async ({ token }: FetchUserBlogsProps) => {
  const response = await axios.get(USER_BLOG_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  createBlog,
  fetchBlogs,
  fetchSingleBlog,
  updateBlog,
  deleteBlog,
  fetchUserBlogs,
};
