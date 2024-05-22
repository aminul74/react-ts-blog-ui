// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmAlert from "../components/ConfirmAlert";

describe("ConfirmAlert Component", () => {
  const isOpen = true;
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const title = "Test Title";
  const message = "Test Message";

  test("render confirm alert successfully", () => {
    render(
      <ConfirmAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
      />
    );
    const titleElement = screen.getByText(title);
    const messageElement = screen.getByText(message);

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("onClose when Cancel button is clicked", () => {
    render(
      <ConfirmAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("onConfirm when Confirm button is clicked", () => {
    render(
      <ConfirmAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
