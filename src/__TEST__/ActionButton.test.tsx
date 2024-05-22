// import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActionButton from "../components/ActionButton";

describe("ActionButton", () => {
  it("renders correctly", () => {
    const onClickMock = jest.fn();
    const type = "edit";
    const children = "Click me";

    const { getByText } = render(
      <ActionButton type={type} onClick={onClickMock}>
        {children}
      </ActionButton>
    );

    const button = getByText("Click me");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("hidden md:inline-block");
    expect(button).toHaveClass("hidden md:inline-block");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
