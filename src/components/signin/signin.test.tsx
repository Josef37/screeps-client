import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Signin from "./signin.component";

import { useDispatch } from "react-redux";
jest.mock("react-redux");

describe("Signin component", () => {
  it("should not dispatch on empty server url", () => {
    const dispatchMock = mockUseDispatch();

    render(<Signin />);
    clearInput(screen.getByLabelText("Server URL"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).not.toBeCalled();
  });

  it("should not dispatch on empty username", () => {
    const dispatchMock = mockUseDispatch();

    render(<Signin />);
    clearInput(screen.getByLabelText("Username"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).not.toBeCalled();
  });

  it("should dispatch signin even when password is empty", () => {
    const dispatchMock = mockUseDispatch();

    render(<Signin />);
    setInputValue(screen.getByLabelText("Server URL"), "http://localhost");
    setInputValue(screen.getByLabelText("Username"), "username");
    clearInput(screen.getByLabelText("Password"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).toBeCalledTimes(1);
  });
});

function mockUseDispatch() {
  useDispatch.mockReset();
  const dispatchMock = jest.fn();
  const useDispatchMock = jest.fn(() => dispatchMock);
  useDispatch.mockImplementation(useDispatchMock);
  return dispatchMock;
}

function clearInput(input: any) {
  setInputValue(input, "");
}

function setInputValue(input: any, value: string) {
  fireEvent.change(input, { target: { value } });
}
