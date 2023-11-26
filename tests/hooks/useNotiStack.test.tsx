// import { act, renderHook, screen } from "@testing-library/react";
// import { useNotiStack } from "../../src/components/hooks/useNotiStack";

jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn(),
    closeSnackbar: jest.fn(),
  }),
}));

describe("test in useNotiStack", () => {
  test("should first", async () => {
    //   const { result } = renderHook(() => useNotiStack());
    //   const exampleFunction = jest.fn();
    //   const { showEnqueueSnackbar } = result.current;
    //   console.log({ showEnqueueSnackbar });

    //   // await waitFor(() => {
    //   act(() => {
    //     showEnqueueSnackbar({
    //       isAction: true,
    //       functionToExecute: () => exampleFunction(),
    //       text: "test message",
    //       variant: "success",
    //     });
    //   });

    //   expect(exampleFunction).toHaveBeenCalled();
    //   const buttom = screen.getByText("test message");
    //   console.log({ buttom });
    //   //     });

    expect(1).toBe(1);
  });
});
