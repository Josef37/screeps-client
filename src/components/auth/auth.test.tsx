import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import Auth from "./auth.component";

describe("Auth component", () => {
  const handleSubmitMock = jest.fn();

  beforeEach(() => {
    handleSubmitMock.mockReset();
    render(<Auth isRegistration={true} handleSubmit={handleSubmitMock} />);
  });

  it("should call submit with user input", () => {
    const inputs = {
      serverUrl: "http://localhost",
      username: "name",
      email: "e@mail.com",
      password: "password",
      confirmPassword: "password",
    };

    setInputValues(inputs);
    fireEvent.click(screen.getByText("Register"));

    expect(handleSubmitMock).toBeCalledWith(inputs);
  });

  it("should trim whitespace but not from password", () => {
    const inputs = {
      serverUrl: "  http://localhost",
      username: " name ",
      email: " e@mail.com",
      password: "password  ",
      confirmPassword: "password  ",
    };

    setInputValues(inputs);
    fireEvent.click(screen.getByText("Register"));

    expect(handleSubmitMock).toBeCalledWith({
      serverUrl: "http://localhost",
      username: "name",
      email: "e@mail.com",
      password: "password  ",
      confirmPassword: "password  ",
    });
  });
});

function setInputValues(inputs: {
  serverUrl: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  setInputValue(screen.getByLabelText("Server URL"), inputs.serverUrl);
  setInputValue(screen.getByLabelText("Username"), inputs.username);
  setInputValue(
    screen.getByLabelText("E-Mail", { exact: false }),
    inputs.email
  );
  setInputValue(
    screen.getByLabelText("Password (can be empty)"),
    inputs.password
  );
  setInputValue(
    screen.getByLabelText("Confirm", { exact: false }),
    inputs.confirmPassword
  );
}

function setInputValue(input: any, value: string) {
  fireEvent.change(input, { target: { value } });
}
