import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import MenuSelect from "../lib/MenuSelect";

function MenuSelectTestWrapper(props) {
  const options = [
    { text: "French", value: "fr" },
    { text: "English", value: "en" },
    { text: "Chinese", value: "zh" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <MenuSelect
      options={options}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
      {...props}
    />
  );
}

describe("The MenuSelect component", () => {
  it("should render without crashing", () => {
    render(<MenuSelectTestWrapper />);
  });

  it("should open/close options list when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    const selectBtn = screen.getByTestId("select-btn");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(selectBtn);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(selectBtn);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should close the listbox on esc keydown", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    await user.click(screen.getByTestId("select-btn"));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should show all possible options when it is opened", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    await user.click(screen.getByTestId("select-btn"));

    expect(screen.getByRole("option", { name: "French" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Chinese" })).toBeInTheDocument();
  });

  it("should change the selected option and close the listbox when an option is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    const button = screen.getByTestId("select-btn");
    expect(button.textContent).toBe("French");
    await user.click(button);
    await user.click(screen.getByRole("option", { name: "Chinese" }));

    expect(button.textContent).toBe("Chinese");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should close the listbox on click out", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <p>Lorem Ipsum</p>
        <MenuSelectTestWrapper />
      </div>,
    );

    await user.click(screen.getByTestId("select-btn"));
    await user.click(screen.getByText("Lorem Ipsum"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should allow the user to navigate between options using arrow keys and select one with the keyboard", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    await user.tab();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByTestId("select-btn").textContent).toBe("Chinese");

    await user.keyboard(" ");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{ArrowUp}");
    await user.keyboard(" ");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByTestId("select-btn").textContent).toBe("English");
  });

  it("should not navigate to another option when user presses arrow up when already on first option", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("select-btn").textContent).toBe("French");
  });

  it("should not navigate to another option when user presses arrow down when already on last option", async () => {
    const user = userEvent.setup();
    render(<MenuSelectTestWrapper />);

    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("select-btn").textContent).toBe("Chinese");

    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("select-btn").textContent).toBe("Chinese");
  });

  it("should accept a className prop", () => {
    render(<MenuSelectTestWrapper className="bold uppercase" />);

    expect(screen.getByTestId("select-wrapper")).toHaveClass("bold");
    expect(screen.getByTestId("select-wrapper")).toHaveClass("uppercase");
  });

  it("should accept a labelledby prop", () => {
    render(<MenuSelectTestWrapper labelledby="mock-id" />);

    expect(screen.getByTestId("select-btn")).toHaveAttribute(
      "aria-labelledby",
      "mock-id",
    );
  });

  it("should accept a focusedOptionBgColor prop and a focusedOptionTextColor prop", async () => {
    const user = userEvent.setup();
    render(
      <MenuSelectTestWrapper
        focusedOptionBgColor="#FF99DA"
        focusedOptionTextColor="#570037"
      />,
    );

    await user.click(screen.getByTestId("select-btn"));
    expect(screen.getByRole("option", { name: "French" })).toHaveStyle({
      backgroundColor: "#FF99DA",
      color: "#570037",
    });
  });

  it("should accept a size prop", () => {
    render(<MenuSelectTestWrapper size="small" />);
    expect(screen.getByTestId("select-wrapper")).toHaveClass("small");
  });
});
