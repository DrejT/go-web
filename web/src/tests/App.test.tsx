function sum(a: number, b: number): number {
  return a + b;
}

it("sum two num", () => {
  expect(sum(2, 4)).toBe(6);
});
