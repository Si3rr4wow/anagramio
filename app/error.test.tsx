import Error from "./error";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Error page", () => {
  it("Renders an error page", () => {
    expect(
      // @ts-ignore
      render(<Error error={new Error("Badness 10000")} reset={() => {}} />),
    ).toMatchSnapshot();
  });
});
