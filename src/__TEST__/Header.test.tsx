// import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Header";
import { useAuth } from "../contextApi/UseAuthContext";

jest.mock("../contextApi/UseAuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUser = {
  token: "mockedToken",
};

describe("Header Component", () => {
  test("should render successfully Navbar component", () => {
    (useAuth as jest.Mock).mockReturnValue(mockUser);
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Home");
    const blogLink = screen.getByText("Blog");
    const aboutLink = screen.getByText("About");

    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test("should render authenticated Navbar", async () => {
    const dataId = "dropdownButton";
    (useAuth as jest.Mock).mockReturnValue(mockUser);

    render(
      <BrowserRouter>
        <Navbar dataTestId={dataId} />
      </BrowserRouter>
    );

    await waitFor(() => {
      const dropdownButton = screen.getByTestId(dataId);
      expect(dropdownButton).toBeInTheDocument();
    });
  });
});
