// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Paginate from "../components/Paginate";

describe("Pagination Component", () => {
  const changeMock = jest.fn();
  test("should render Paginate with correct page count", () => {
    render(<Paginate pageNumber={0} totalCount={10} changePage={changeMock} />);

    const pageButtons = screen.getAllByRole("button", { name: /[0-9]/ });
    expect(pageButtons.length).toBe(2);
  });

  test("should not render Next button on the last page", () => {
    render(<Paginate pageNumber={2} totalCount={18} changePage={changeMock} />);

    const nextButton = screen.queryByRole("link", { name: /Next/ });
    expect(nextButton).toBeNull();
  });
});
