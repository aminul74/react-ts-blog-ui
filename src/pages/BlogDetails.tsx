import React from "react";

interface BlogDetailsProps {
  post: {
    id: number;
    title: string;
    datetime: string;
    date: string;
    category: { title: string; href: string };
    author: {
      name: string;
      role: string;
      imageUrl: string;
    };
    description: string;
  };
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ post }) => {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h2>
        <div className="flex items-center gap-x-4 text-xs mt-4">
          <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time>
          <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.category.title}
          </a>
        </div>
        <div className="mt-8">
          <img
            src={post.author.imageUrl}
            alt=""
            className="h-16 w-16 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6 mt-2">
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-gray-600">{post.author.role}</p>
          </div>
        </div>
        <p className="mt-8 text-lg leading-8 text-gray-600">
          {post.description}
        </p>
      </div>
    </div>
  );
};

// Mock data for testing the component
const mockPost = {
  id: 1,
  title: "Mock Blog Post",
  datetime: "2022-01-31T12:00:00Z",
  date: "Jan 31, 2022",
  category: { title: "Mock Category", href: "#" },
  author: {
    name: "John Doe",
    role: "Author",
    imageUrl: "src/assets/user.png",
  },
  description:
    "This is a mock blog post. It contains some sample content for testing purposes.",
};

export default function MockBlogDetails() {
  return <BlogDetails post={mockPost} />;
}
