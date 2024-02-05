import axios from "axios";

export interface BlogProps {
  page?: number;
  pageSize?: number;
  blog?: unknown;
  token?: string;
  uuId?: string;
  updatedBlog?: unknown;
}

export const fetchBlogs = async ({ page, pageSize }: BlogProps) => {
  const response = await axios.get(
    `http://localhost:4001/api/v1/blogs?page=${page}&size=${pageSize}`
  );
  return response.data;
};

export const createBlogMutation = async ({ blog, token }: BlogProps) => {
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

export const fetchSingleBlog = async ({ uuId, token }: BlogProps) => {
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

export const updateBlog = async ({ uuId, updatedBlog, token }: BlogProps) => {
  await axios.put(`http://localhost:4001/api/v1/blogs/${uuId}`, updatedBlog, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBlog = async ({ uuId, token }: BlogProps) => {
  await axios.delete(`http://localhost:4001/api/v1/blogs/${uuId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
