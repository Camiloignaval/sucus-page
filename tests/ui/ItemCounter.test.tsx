import { act, render, renderHook, screen } from "@testing-library/react";
import { ItemCounter } from "../../src/components/ui/ItemCounter";
import userEvent from "@testing-library/user-event";
import { exampleCards } from "../../src/data/exampleCards";
import { useCartStore } from "../../src/store/cartStore";
import { SnackbarProvider } from "notistack";

describe("test in ItemCounter", () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({ items: [{ ...exampleCards[0], quantity: 2 }] });
    });
  });

  test("button plus sholud work", async () => {
    const product = exampleCards[0];
    const { result } = renderHook(() => useCartStore());

    render(
      <ItemCounter
        prod={product}
        maxValue={undefined}
        addQuantity={() =>
          result.current.addToCart({ ...product, quantity: 1 })
        }
        removeQuantity={() => {}}
        isPossibleZero={false}
        blockButtonPlus={false}
      />
    );

    const btnPlus = screen.getByLabelText("plusBtn");

    await act(async () => {
      await userEvent.click(btnPlus);
      await userEvent.click(btnPlus);
    });

    expect(screen.getByLabelText("qtyProduct").innerHTML).toBe("4");
  });
  test("addQuantity function should been call 2 times", async () => {
    const product = exampleCards[0];

    const fnPlus = jest.fn();
    render(
      <ItemCounter
        prod={product}
        maxValue={undefined}
        addQuantity={fnPlus}
        removeQuantity={() => {}}
        isPossibleZero={false}
        blockButtonPlus={false}
      />
    );
    const btnPlus = screen.getByLabelText("plusBtn");
    await act(async () => {
      await userEvent.click(btnPlus);
      await userEvent.click(btnPlus);
    });

    expect(fnPlus).toHaveBeenCalledTimes(2);
  });
  test("removeQuantity function should been call", async () => {
    const product = exampleCards[0];

    const fnMinus = jest.fn();
    render(
      <ItemCounter
        prod={product}
        maxValue={undefined}
        addQuantity={() => {}}
        removeQuantity={fnMinus}
        isPossibleZero={false}
        blockButtonPlus={false}
      />,
      { wrapper: SnackbarProvider }
    );
    const btnMinus = screen.getByLabelText("minusBtn");
    await act(async () => {
      await userEvent.click(btnMinus);
      //   await userEvent.click(btnMinus);
    });

    expect(fnMinus).toHaveBeenCalled();
  });
  test("removeQuantity function should been call, and when rest one, push confirm delete, and should be 0", async () => {
    const product = exampleCards[0];
    const { result } = renderHook(() => useCartStore());
    // const fnMinus = jest.fn();
    render(
      <ItemCounter
        prod={product}
        maxValue={undefined}
        addQuantity={() => {}}
        removeQuantity={() => result.current.removeOneFromCart(product.id)}
        isPossibleZero={false}
        blockButtonPlus={false}
      />,
      { wrapper: SnackbarProvider }
    );
    const btnMinus = screen.getByLabelText("minusBtn");
    await act(async () => {
      await userEvent.click(btnMinus);
    });

    await act(async () => {
      await userEvent.click(btnMinus);
    });

    const confirmButton = screen.getByText(/Confirmar/i);
    await act(async () => {
      await userEvent.click(confirmButton);
    });

    expect(screen.getByLabelText("qtyProduct").innerHTML).toBe("0");
  });
  test("should disable plus button if instock qty is equal to qty in cart", async () => {
    act(() => {
      useCartStore.setState({ items: [] });
    });
    const product = exampleCards[0];
    const inStock = product.inStock;
    const { result } = renderHook(() => useCartStore());

    render(
      <ItemCounter
        prod={product}
        maxValue={undefined}
        addQuantity={() =>
          result.current.addToCart({ ...product, quantity: 1 })
        }
        removeQuantity={() => {}}
        isPossibleZero={false}
        blockButtonPlus={false}
      />,
      { wrapper: SnackbarProvider }
    );
    const btnPlus = screen.getByLabelText("plusBtn");
    for (let i = 0; i < inStock; i++) {
      await userEvent.click(btnPlus);
    }

    expect(btnPlus.classList.contains("Mui-disabled")).toBeTruthy();
  });
});
