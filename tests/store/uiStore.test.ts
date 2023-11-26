import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/store/uiStore";

describe("test in uiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ showDetailCart: false });
  });
  test("openDetailCart should convert showDetailCart in true", () => {
    const { result } = renderHook(() => useUiStore());
    const { openDetailCart } = result.current;
    expect(result.current.showDetailCart).toBeFalsy();
    act(() => {
      openDetailCart();
    });
    expect(result.current.showDetailCart).toBeTruthy();
  });
  test("openDetailCart should convert showDetailCart in false", () => {
    const { result } = renderHook(() => useUiStore());
    const { closeDetailCart } = result.current;
    expect(result.current.showDetailCart).toBeFalsy();
    act(() => {
      closeDetailCart();
    });
    expect(result.current.showDetailCart).toBeFalsy();
  });
});
