import { exampleCards } from "../../src/data/exampleCards";
import { useCartStore } from "../../src/store/cartStore";
import { act, renderHook } from "@testing-library/react";

describe("test in cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });
  test("should add Product", () => {
    const product1 = exampleCards[0];
    expect(useCartStore.getState().items.length).toBe(0);
    const { result } = renderHook(() => useCartStore());
    const { addToCart } = result.current;

    act(() => {
      addToCart({ ...product1, quantity: 1 });
    });
    expect(result.current.items.length).toBe(1);
  });
  test("should add Product, and if add the same product not be increase items length", () => {
    const product1 = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    expect(result.current.items.length).toBe(0);
    const { addToCart } = result.current;

    act(() => {
      addToCart({ ...product1, quantity: 1 });
    });

    expect(result.current.items.length).toBe(1);
    act(() => {
      addToCart({ ...product1, quantity: 1 });
    });
    expect(result.current.items.length).toBe(1);
  });
  test("should remove one from cart", () => {
    const product1 = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    const { addToCart, removeOneFromCart } = result.current;
    act(() => {
      addToCart({ ...product1, quantity: 1 });
    });
    expect(result.current.items.length).toBe(1);
    act(() => {
      removeOneFromCart(product1.id);
    });
    expect(result.current.items.length).toBe(0);
  });
  test("if add qty 2 of an product,the second call to removeOneFromCart, will remove from items", async () => {
    const product1 = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    const { removeOneFromCart } = result.current;

    act(() => {
      useCartStore.setState({ items: [{ ...product1, quantity: 2 }] });
    });
    expect(result.current.items.length).toBe(1);

    act(() => {
      removeOneFromCart(product1.id);
    });
    expect(result.current.items.length).toBe(1);
    act(() => {
      removeOneFromCart(product1.id);
    });
    expect(result.current.items.length).toBe(0);
  });
  test("should remove all from cart of a specific product", () => {
    const product1 = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    const { removeAllFromCart } = result.current;
    act(() => {
      useCartStore.setState({ items: [{ ...product1, quantity: 2 }] });
    });

    act(() => {
      removeAllFromCart(product1.id);
    });
    expect(result.current.items.length).toBe(0);
  });
  test("should get total qty of products", () => {
    const product1 = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    act(() => {
      useCartStore.setState({ items: [{ ...product1, quantity: 2 }] });
    });

    const { getTotalQuantity } = result.current;

    expect(getTotalQuantity()).toBe(2);
  });
  test("clearCart sholud clean cart", () => {
    const product1 = exampleCards[0];
    act(() => {
      useCartStore.setState({ items: [{ ...product1, quantity: 2 }] });
    });
    const { result } = renderHook(() => useCartStore());

    const { clearCart } = result.current;

    act(() => {
      clearCart();
    });

    expect(result.current.items.length).toBe(0);
  });
});
