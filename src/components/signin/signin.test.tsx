import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Signin from "./signin.component";

import { useDispatch } from "react-redux";
jest.mock("react-redux");

describe("Signin component", () => {
  const dispatchMock = mockUseDispatch();

  beforeEach(() => {
    dispatchMock.mockReset();
    render(<Signin />);
  });

  it("should not show email and password confirm fields", () => {
    expect(() =>
      screen.getByLabelText("E-Mail", { exact: false })
    ).toThrowError("Unable to find a label with the text of");
    expect(() =>
      screen.getByLabelText("Confirm Password", { exact: false })
    ).toThrowError("Unable to find a label with the text of");
  });

  it("should not dispatch on empty server url", () => {
    clearInput(screen.getByLabelText("Server URL"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).not.toBeCalled();
  });

  it("should not dispatch on empty username", () => {
    clearInput(screen.getByLabelText("Username"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).not.toBeCalled();
  });

  it("should dispatch signin even when password is empty", () => {
    setInputValue(screen.getByLabelText("Server URL"), "http://localhost");
    setInputValue(screen.getByLabelText("Username"), "username");
    clearInput(screen.getByLabelText("Password (can be empty)"));
    fireEvent.click(screen.getByText("Sign In", { selector: "button" }));

    expect(dispatchMock).toBeCalledTimes(1);
  });
});

function mockUseDispatch() {
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
