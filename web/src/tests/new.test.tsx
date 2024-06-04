import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("renders hello world", () => {
  render(
    <>
      <div>hellow world</div>
    </>
  );
  const h = screen.getByText(/hellow world/);
  expect(h).toBeInTheDocument();
});
