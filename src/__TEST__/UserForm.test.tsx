// import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "../components/UserForm";

describe("UserForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockErrorMsg = jest.fn();
  test("should render Sign In form", () => {
    render(
      <UserForm
        isSignIn={true}
        isSignUp={false}
        onSubmit={mockOnSubmit}
        errorMessage={null}
        setErrorMessage={mockErrorMsg}
      />
    );

    const signInForm = screen.getByText("Sign in to your account");
    expect(signInForm).toBeInTheDocument();
  });

  test("should render Sign Up form", () => {
    render(
      <UserForm
        isSignIn={false}
        isSignUp={true}
        onSubmit={mockOnSubmit}
        errorMessage={null}
        setErrorMessage={mockErrorMsg}
      />
    );

    const signUpForm = screen.getByText("Sign up in to your account");
    expect(signUpForm).toBeInTheDocument();
  });

  test("should call onSubmit when Sign In form is submitted", async () => {
    render(
      <UserForm
        isSignIn={true}
        isSignUp={false}
        onSubmit={mockOnSubmit}
        errorMessage={null}
        setErrorMessage={mockErrorMsg}
      />
    );

    fireEvent.input(screen.getByPlaceholderText("username"), {
      target: { value: "testUsername" },
    });
    fireEvent.input(screen.getByPlaceholderText("password"), {
      target: { value: "testPassword" },
    });
    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
