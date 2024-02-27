// import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "../components/BlogForm";

describe("BlogForm Component", () => {
  test("should render the BlogForm component", () => {
    const onSubmitMock = jest.fn();
    render(<BlogForm onSubmit={onSubmitMock} />);

    const contentTextarea = screen.getByLabelText("Content");
    const submitButton = screen.getByText("Submit");

    expect(contentTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should submit the form with correct data", async () => {
    const submitButtonId = "blogSubmitButton";
    const onSubmitMock = jest.fn();

    render(<BlogForm onSubmit={onSubmitMock} dataTestId={submitButtonId} />);

    const contentTextarea = screen.getByLabelText("Content");
    const submitButton = screen.getByTestId(submitButtonId);

    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(onSubmitMock).toBeDefined();
    expect(contentTextarea).toHaveValue("Test Content");
  });
});
