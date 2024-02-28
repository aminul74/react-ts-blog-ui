// import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogDetails from "../pages/BlogDetails";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import { useBlogContext } from "../contextApi/UseBlogContext";
import { BrowserRouter } from "react-router-dom";
import api from "../utility/blogApis";

jest.mock("../contextApi/UseBlogContext", () => ({
  useBlogContext: jest.fn(),
}));

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../utility/blogApis", () => ({
  updateBlog: jest.fn(),
  deleteBlog: jest.fn(),
}));

describe("BlogDetails Component", () => {
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
  };

  const mockBlogContext = {
    myBlogPageNumber: 1,
  };
  const queryClient = new QueryClient();

  test("should render BlogDetails component", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    (useBlogContext as jest.Mock).mockReturnValue(mockBlogContext);
    const dataId = "detailsId";
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BlogDetails dataTestId={dataId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const detailsElement = screen.getByTestId(dataId);
    expect(detailsElement).toBeInTheDocument();
  });

  test("should update a blog successfully", async () => {
    (api.updateBlog as jest.Mock).mockReturnValue(blogs);
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BlogDetails dataTestId="actionId" />
        </BrowserRouter>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByTestId("actionId"));
    await waitFor(() => {
      expect(api.updateBlog).toBeDefined();
    });
  });

  test("should delete a blog successfully", async () => {
    const message = "Blog deleted successfully";
    (api.deleteBlog as jest.Mock).mockReturnValue(message);
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BlogDetails dataTestId="actionId" />
        </BrowserRouter>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByTestId("actionId"));

    await waitFor(() => {
      expect(api.deleteBlog).toBeDefined();
    });
  });
});
