import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdatePassword from "../components/UserUpdateForm";
import { useAuth } from "../contextApi/UseAuthContext";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

describe("", () => {
  const mockUserAuth = {
    user: "mockUser",
    logout: jest.fn(),
  };
  const mockProps = {
    confirmPassword: "mockConfirmPassword",
    old_password: "mockOldPassword",
    new_password: "mockNewPassword",
    token: "mockToken",
    userId: "mockUserId",
  };

  const queryClient = new QueryClient();
  test("should render UpdatePassword form", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UpdatePassword {...mockProps} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const updatePasswordForm = screen.getByText("Update Your Password");
    expect(updatePasswordForm).toBeInTheDocument();
  });

  test("should call useMutation when UpdatePassword form is submitted", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UpdatePassword {...mockProps} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.input(screen.getByPlaceholderText("old-password"), {
      target: { value: "oldPassword" },
    });
    fireEvent.input(screen.getByPlaceholderText("new-password"), {
      target: { value: "newPassword" },
    });
    fireEvent.input(screen.getByPlaceholderText("confirm-password"), {
      target: { value: "newPassword" },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Update"));
      expect(useMutation).toHaveBeenCalled();
    });
    expect(useMutation).toHaveBeenCalledTimes(2);
  });
});
