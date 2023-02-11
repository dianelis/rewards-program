import {
  calculatePoints,
  generateTransactions,
  getQuarter,
  getRandomSelectorNumber,
} from "../utils";

describe("Utils", () => {
  it("generateTransactions", () => {
    const transactions = generateTransactions(1);
    expect(transactions).toHaveLength(1);
  });

  it("calculatePoints", () => {
    expect(calculatePoints(120)).toEqual(90);
  });

  it("getQuarter", () => {
    expect(getQuarter(new Date(2022, 1, 1))).toEqual(1);
  });
  
  it("getRandomSelectorNumber", () => {
    expect(getRandomSelectorNumber(1, 1)).toEqual(1);
  });
});
