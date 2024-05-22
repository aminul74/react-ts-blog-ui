import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FloatButton from "../components/FloatButton";

describe("FloatButton Component", () => {
  test("renders float button and handles click event", async () => {
    const onClickMock = jest.fn();
    render(<FloatButton onClick={onClickMock} dataTestId="symbol" />);

    const buttonElement = screen.getByTestId("symbol");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("data-testid", "symbol");
    expect(buttonElement).toHaveClass("p-10");

    fireEvent.click(buttonElement);
    await waitFor(() => {
      console.log("Button clicked directly");
    });
  });
});
