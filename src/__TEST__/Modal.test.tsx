// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  test("should render the modal when isOpen is true", () => {
    render(<Modal isOpen={true} dataTestId="modal" />);

    const modalElement = screen.getByTestId("modal");

    expect(modalElement).toBeInTheDocument();
  });

  test("should not render the modal when isOpen is false", () => {
    render(<Modal isOpen={false} />);

    const modalElement = screen.queryByTestId("modal");

    expect(modalElement).toBeNull();
  });
});
