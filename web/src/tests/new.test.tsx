import { render, screen } from "@testing-library/react";

it("renders hello world", () => {
  render(
    <>
      <div>hellow world</div>
    </>
  );
  const h = screen.getByText(/hellow world/);
  expect(h).toBeInTheDocument();
});
