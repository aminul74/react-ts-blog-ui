// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ListItem from "../components/NavListItem";

describe("NavList Component", () => {
  test("should render NavLink with correct text", () => {
    render(
      <BrowserRouter>
        <ListItem to="/example">Example</ListItem>
      </BrowserRouter>
    );

    const navLinkElement = screen.getByText("Example");
    expect(navLinkElement).toBeInTheDocument();
  });

  test("should active when route matches", () => {
    render(
      <BrowserRouter>
        <ListItem to="/test">Test Link</ListItem>
      </BrowserRouter>
    );

    const navLinkElement = screen.getByText("Test Link");

    expect(navLinkElement).toHaveClass("flex py-2");
  });
});
