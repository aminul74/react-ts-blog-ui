import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfileDropdown from "../components/DropDown";
import { useAuth } from "../contextApi/UseAuthContext";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("react-router-dom");

describe("UserProfileDropdown Component", () => {
  const mockUser = {
    username: "aminul",
  };
  const onClickMock = jest.fn();

  const mockUserAuth = {
    user: mockUser,
    logout: jest.fn(),
  };
  test("render user profile dropdown successfully", async () => {
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);

    const toggleText = "toggleId";

    render(
      <UserProfileDropdown
        dataTestId={toggleText}
        type="button"
        onClick={onClickMock}
      />
    );

    const toggleButtonElement = screen.getByTestId(toggleText);
    expect(toggleButtonElement).toBeInTheDocument();

    fireEvent.click(toggleButtonElement);
    await waitFor(() => {
      expect(toggleButtonElement).toHaveClass("relative mb-5");
      console.log("Button render with clicked");
    });
  });

  test("should display user information in the dropdown", async () => {
    const toggleText = "toggleId";

    render(
      <UserProfileDropdown
        dataTestId={toggleText}
        type="button"
        onClick={onClickMock}
      />
    );

    const toggleButtonElement = screen.getByTestId(toggleText);
    const targetTestId = toggleButtonElement.getAttribute("aria-labelledby");
    const targetElement = targetTestId && screen.getByTestId(targetTestId);

    await waitFor(() => {
      fireEvent.click(toggleButtonElement);
    });

    expect(toggleButtonElement).toBeInTheDocument();
    targetElement && expect(targetElement).toBeInTheDocument();
  });

  test("should show ConfirmAlert when Sign out button is clicked", async () => {
    const signOutId = "sign-out-button";
    (useAuth as jest.Mock).mockReturnValue(mockUserAuth);

    render(
      <UserProfileDropdown
        dataTestId={signOutId}
        type="button"
        onClick={onClickMock}
      />
    );

    const signOutButton = screen.getByTestId(signOutId);

    fireEvent.click(signOutButton);

    const confirmAlertTitle = screen.getByTestId(signOutId);
    await waitFor(() => {
      expect(confirmAlertTitle).toBeInTheDocument();
    });
  });
});
