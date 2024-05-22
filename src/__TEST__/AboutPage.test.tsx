// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutSection from "../pages/AboutPage";

describe("AboutPage Component", () => {
  test("should render AboutSection", () => {
    render(<AboutSection />);

    const sectionElement = screen.getByRole("about");
    expect(sectionElement).toBeInTheDocument();
  });
});
