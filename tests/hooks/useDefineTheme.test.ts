import { renderHook } from "@testing-library/react";
import { useDefineTheme } from "../../src/components/hooks/useDefineTheme";
import "../mocks/windowMock";
import { act } from "@testing-library/react";

describe("Test in useDefineThemes", () => {
  test("toggleTheme should change theme", () => {
    const { result } = renderHook(() => useDefineTheme());
    expect(result.current.theme.palette.mode).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme.palette.mode).toBe("dark");
  });
});
