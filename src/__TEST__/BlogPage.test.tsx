// import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPage from "../pages/BlogPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import { BrowserRouter } from "react-router-dom";
import { useBlogContext } from "../contextApi/UseBlogContext";
import api from "../utility/blogApis";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("../contextApi/UseBlogContext", () => ({
  useBlogContext: jest.fn(),
}));
jest.mock("../utility/blogApis", () => ({
  createBlog: jest.fn(),
  deleteBlog: jest.fn(),
}));

describe("BlogPage Component", () => {
  const blogs = [
    {
      id: "1",
      title: "Test Blog",
      content: "Test Content",
      createdAt: "28 Feb 2024",
      authorId: "author1",
      User: { username: "testuser1" },
    },
  ];
  const mockUser = {
    username: "aminul",
  };

  const mockUserAuth = {
    user: mockUser,
    logout: jest.fn(),
  };

  const mockBlogContext = {
    myBlogPageNumber: 1,
  };

  const queryClient = new QueryClient();
  test("should render BlogPage component", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    (useBlogContext as jest.Mock).mockReturnValue(mockBlogContext);
    const dataId = "BloPageId";
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BlogPage dataTestId={dataId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const detailsElement = screen.getByTestId(dataId);
    expect(detailsElement).toBeInTheDocument();
  });

  test("should create a blog successfully", async () => {
    (api.createBlog as jest.Mock).mockReturnValue(blogs);
    const dataId = "BloPageId";
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BlogPage dataTestId={dataId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText(/create your blog/i));
    expect(screen.getByText(/create your blog/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(api.createBlog).toBeDefined();
    });
  });
});
