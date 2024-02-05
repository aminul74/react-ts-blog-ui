import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

export interface BlogContextProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<SetStateAction<number>>;
  totalCount: number | null;
  setTotalCount: React.Dispatch<SetStateAction<number | null>>;
}

export const BlogContext = createContext<BlogContextProps | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const contextValue: BlogContextProps = {
    pageNumber,
    setPageNumber,
    totalCount,
    setTotalCount,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
