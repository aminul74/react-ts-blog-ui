// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../components/Button";

describe("Button Component", () => {
  test("button render successfully", () => {
    const buttonText = "Click me";
    const buttonId = "myButton";
    const buttonClassName = "myButtonClass";
    const onClickMock = jest.fn();

    render(
      <Button
        type="button"
        id={buttonId}
        className={buttonClassName}
        onClick={onClickMock}
      >
        {buttonText}
      </Button>
    );

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).toHaveAttribute("id", buttonId);
    expect(buttonElement).toHaveClass("myButtonClass", buttonClassName);

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
