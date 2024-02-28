// import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlogContext } from "../contextApi/UseBlogContext";

jest.mock("../contextApi/UseBlogContext", () => ({
  useBlogContext: jest.fn(),
}));

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

describe("BlogCard Component", () => {
  test("should render the BlogCard component with blogs", () => {
    (useBlogContext as jest.Mock).mockReturnValue({
      pageNumber: 1,
      setPageNumber: jest.fn(),
      myBlogPageNumber: 1,
      setMyBlogPageNumber: jest.fn(),
    });

    render(
      <BrowserRouter>
        <BlogCard blogs={blogs} totalCount={blogs.length} isLoading={false} />
      </BrowserRouter>
    );

    const blogElements = screen.getAllByRole("card");

    expect(blogElements).toHaveLength(blogs.length);
    blogElements.forEach((blogElement, index) => {
      const blog = blogs[index];
      expect(blogElement).toHaveTextContent(blog.title);
      expect(blogElement).toHaveTextContent(blog.content);
    });
  });

  test("should render the loading spinner when isLoading is true", () => {
    const dataId = "loadingSpinner";
    const isLoading = true;
    render(
      <BrowserRouter>
        <BlogCard
          blogs={[]}
          totalCount={0}
          isLoading={isLoading}
          dataTestId={dataId}
        />
      </BrowserRouter>
    );

    const loadingSpinner = screen.getByTestId(dataId);

    expect(loadingSpinner).toBeInTheDocument();
  });

  test("should navigate to blog details page when 'See more...' button is clicked", () => {
    render(
      <BrowserRouter>
        <BlogCard blogs={blogs} totalCount={blogs.length} isLoading={false} />
      </BrowserRouter>
    );

    const seeMoreButton = screen.getByText("See more...");
    fireEvent.click(seeMoreButton);
    expect(seeMoreButton).toBeInTheDocument();
  });
});
