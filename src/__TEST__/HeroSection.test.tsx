/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSection from "../components/HeroSection";
import { BrowserRouter } from "react-router-dom";

test("hero section render successfully", () => {
  render(
    <BrowserRouter>
      <HeroSection />
    </BrowserRouter>
  );
});
