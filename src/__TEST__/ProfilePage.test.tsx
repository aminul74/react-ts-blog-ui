import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "../pages/ProfilePage";
import { useAuth } from "../contextApi/UseAuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "../utility/userApis";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../utility/userApis", () => ({
  deleteUser: jest.fn(),
}));

describe("ProfilePage Component", () => {
  const mockUser = {
    username: "aminul",
  };

  const mockUserAuth = {
    user: mockUser,
  };

  const dataTestId = "ProfileId";
  test("should render ProfilePage component", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <UserProfile dataTestId={dataTestId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const profileElement = screen.getByTestId(dataTestId);
    expect(profileElement).toBeInTheDocument();
  });

  test("should delete user account successfully", async () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    (api.deleteUser as jest.Mock).mockReturnValue({
      Message: "Dlelete Successfully",
    });
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <UserProfile dataTestId={dataTestId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Delete Account"));
    await waitFor(() => {
      expect(api.deleteUser).toHaveBeenCalledTimes(1);
    });
  });

  test("should UserUpdatePasswordForm successfully", async () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <UserProfile dataTestId={dataTestId} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const profileElement = screen.getByTestId(dataTestId);
    expect(profileElement).toBeInTheDocument();
  });
});
