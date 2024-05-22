import { useContext } from "react";
import { BlogContext, BlogContextProps } from "./BlogContext";

export const useBlogContext = (): BlogContextProps => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
