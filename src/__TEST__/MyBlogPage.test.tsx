// import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyBlogPage from "../pages/MyBlogPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuth } from "../contextApi/UseAuthContext";
import { useBlogContext } from "../contextApi/UseBlogContext";
import { BrowserRouter } from "react-router-dom";
import api from "../utility/blogApis";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("../contextApi/UseBlogContext", () => ({
  useBlogContext: jest.fn(),
}));
jest.mock("../utility/blogApis", () => ({
  fetchUserBlogs: jest.fn(),
}));

describe("MyBlogPage Component", () => {
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

  test("should render MyBlogPage component", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    (useBlogContext as jest.Mock).mockReturnValue(mockBlogContext);
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MyBlogPage dataTestId="MyBlogPageId" />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const toggleButtonElement = screen.getByTestId("MyBlogPageId");
    expect(toggleButtonElement).toBeInTheDocument();
  });

  test("should fetch user blogs successfully", async () => {
    (api.fetchUserBlogs as jest.Mock).mockReturnValue(blogs);
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MyBlogPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(api.fetchUserBlogs).toHaveBeenCalledTimes(2);
    });
  });
});
