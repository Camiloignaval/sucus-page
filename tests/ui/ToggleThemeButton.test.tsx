import { render, screen } from "@testing-library/react";
import ToggleThemeButton from "../../src/components/ui/ToggleThemeButton";
import user from "@testing-library/user-event";

describe("test in ToggleThemeButton", () => {
  test("should call onToggle correctly", async () => {
    const onToggle = jest.fn();
    render(<ToggleThemeButton onToggle={onToggle} />);
    // screen.debug();
    const button = screen.getByRole("checkbox");
    await user.click(button);
    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(2);
  });
});
