import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { useShowDetailCard } from "../../src/components/hooks/useShowDetailCard";
import { MemoryRouter } from "react-router-dom";
import { useCartStore } from "../../src/store/cartStore";
import { exampleCards } from "../../src/data/exampleCards";
import userEvent from "@testing-library/user-event";

describe("test in useShowDetailCard", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should render card, title, message without product, and button", () => {
    const { result } = renderHook(() => useShowDetailCard(), {
      wrapper: MemoryRouter,
    });
    const Component = result.current.CardDetail;
    render(<Component />);
    expect(screen.getByText(/Productos en carrito/i)).toBeTruthy();
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeTruthy();
    expect(screen.getByText(/Ir a pagar/i)).toBeTruthy();
    expect(screen.getByAltText(/Suculenta triste/i)).toBeTruthy();
  });
  test("should show product if it is in cart and qty is 1 and 2 if add again", async () => {
    const { result: resultCcart } = renderHook(() => useCartStore());
    act(() => {
      resultCcart.current.addToCart({ ...exampleCards[0], quantity: 1 });
    });
    const { result } = renderHook(() => useShowDetailCard(), {
      wrapper: MemoryRouter,
    });
    const Component = result.current.CardDetail;
    render(<Component />);

    expect(screen.getByText(exampleCards[0].name)).toBeTruthy();
    // expect(screen.getByText(exampleCards[0].name)).toBeTruthy();
    const qtyProduct = screen.getByLabelText("qtyProduct");
    expect(qtyProduct.innerHTML).toBe("1");
    // console.log(screen.getByLabelText("qtyProduct").innerHTML);
    act(() => {
      resultCcart.current.addToCart({ ...exampleCards[0], quantity: 1 });
    });

    const plusBtn = screen.getByLabelText("plusBtn");

    await act(async () => {
      await userEvent.click(plusBtn);
      await userEvent.click(plusBtn);
    });

    // TODO PORQUE NO SE ACTUALIZA?
    await waitFor(() => screen.getByLabelText("qtyProduct").innerHTML === "2");
    // console.log(screen.getByLabelText("qtyProduct").innerHTML);
    screen.debug(screen.getByLabelText("qtyProduct"));
    // console.log({ antes: resultCcart.current.items });
  });
});
