// import { render, screen } from "@testing-library/react";
// import { MainApp } from "../src/App";

describe("first", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  test("should first", () => {
    // render(<MainApp />);
    // screen.debug();
    expect(true).toBe(true);
  });
});
