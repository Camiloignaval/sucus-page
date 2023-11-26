import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
  //   waitFor,
} from "@testing-library/react";
import { CardItem } from "../../src/components/ui/CardItem";
import { exampleCards } from "../../src/data/exampleCards";
import { useCartStore } from "../../src/store/cartStore";
import userEvent from "@testing-library/user-event";
import { useUiStore } from "../../src/store/uiStore";

describe("test in CardItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    useUiStore.setState({ showDetailCart: false });
    useCartStore.setState({ items: [] });
  });
  test("should render information", () => {
    render(<CardItem product={exampleCards[0]} />);

    const title = screen.getByText(exampleCards[0].name);
    const description = screen.getByText(exampleCards[0].description);

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
  });
  test("should add to cart to push in carticon", async () => {
    render(<CardItem product={exampleCards[0]} />);

    const button = screen.getByRole("button", { name: /add_cart_card/i });
    const { result } = renderHook(() => useCartStore());
    const { items } = result.current;
    expect(items.length).toBe(0);

    await userEvent.click(button);

    expect(result.current.items.length).toBe(1);
  });
  test("should open cartinfo at add for first time, but second not", async () => {
    render(<CardItem product={exampleCards[0]} />);

    const button = screen.getByRole("button", { name: /add_cart_card/i });
    // const { result: resulttCard } = renderHook(() => useCartStore());
    const { result: resultUi } = renderHook(() => useUiStore());
    expect(screen.queryByText(/Productos en carrito/i)).toBeNull();
    await userEvent.click(button);
    // await waitFor(() => expect(resultUi.current.showDetailCart).toBeTruthy());

    act(() => {
      resultUi.current.closeDetailCart();
    });
    await userEvent.click(button);

    expect(resultUi.current.showDetailCart).toBeFalsy();
  });
});
