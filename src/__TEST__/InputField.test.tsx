// import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import InputField from "../components/InputField";

describe("InputField Component", () => {
  test("renders input field and handles user input", async () => {
    const useForm = jest.fn(() => ({
      register: jest.fn(),
      handleSubmit: jest.fn(),
    }));

    const { register, handleSubmit } = useForm();
    const onSubmit = jest.fn();

    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Username"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          placeholder="Username"
          required
          register={register}
        />
        <button type="submit">Submit</button>
      </form>
    );
    const inputField = screen.getByPlaceholderText("Username");
    expect(inputField).toBeInTheDocument();

    userEvent.type(inputField, "john_doe");
    await waitFor(() => {
      expect(inputField).toHaveValue("john_doe");
    });
    userEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(onSubmit).toBeDefined();
    });
  });
});
