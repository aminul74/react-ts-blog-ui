import React from "react";
import ReactPaginate from "react-paginate";

interface PaginateProps {
  pageNumber: number;
  totalCount: number;
  changePage: (selectedItem: { selected: number }) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  pageNumber,
  totalCount,
  changePage,
}: PaginateProps) => {
  const pageCount = Math.ceil(totalCount / 6);
  // console.log("Paginate :", pageCount);
  return (
    <div className="flex items-center justify-center mt-16">
      <ReactPaginate
        forcePage={Math.min(pageNumber, pageCount - 1)}
        pageCount={Math.ceil(totalCount / 6)}
        onPageChange={changePage}
        containerClassName="flex justify-center items-center text-black mt-8"
        pageClassName="px-4 py-2 m-2 border border-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:border-indigo-500"
        previousLinkClassName={`${
          pageNumber === 0 ? "hidden" : ""
        } bg-gray-200 px-4 py-2 rounded-l transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500 hover:text-white`}
        nextLinkClassName={`${
          pageNumber === Math.ceil(totalCount / 6) - 1 ? "hidden" : ""
        } bg-gray-200 px-4 py-2 rounded-r transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500 hover:text-white`}
        disabledClassName="opacity-50 cursor-not-allowed"
        activeClassName="bg-indigo-500 text-white px-4 py-2 rounded"
        previousLabel={pageNumber === 0 ? null : "Previous"}
        nextLabel={pageNumber === Math.ceil(totalCount / 6) - 1 ? null : "Next"}
      />
    </div>
  );
};

export default Paginate;
