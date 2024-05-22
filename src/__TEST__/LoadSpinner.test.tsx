// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "../components/LoadSpinner";

describe("LoadSpinner Component", () => {
  test("should render the spinner when isLoading is true", () => {

    render(<LoadingSpinner isLoading={true} dataTestId="loadingSpinner" />);

    const spinnerElement = screen.getByTestId("loadingSpinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("should not render the spinner when isLoading is false", () => {

    render(<LoadingSpinner isLoading={false} />);

    const spinnerElement = screen.queryByTestId("loadingSpinner");
    expect(spinnerElement).toBeNull();
  });
});
