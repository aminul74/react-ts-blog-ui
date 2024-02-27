// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("should render the Footer component", () => {
    render(<Footer />);

    const footerElement = screen.getByRole("footer");

    expect(footerElement).toBeInTheDocument();
  });

  test("should render the copyright text in the Footer", () => {
    render(<Footer />);

    const copyrightText = screen.getByText("© 2023 All Rights Reserved.");

    expect(copyrightText).toBeInTheDocument();
  });
});
