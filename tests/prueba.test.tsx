import { render, screen } from "@testing-library/react";
import { App } from "../src/App";
import React from "react";

describe("first", () => {
  test("should first", () => {
    render(<App />);
    screen.debug();
  });
});
