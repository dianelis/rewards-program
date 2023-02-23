import { v4 as generateUUID } from "uuid";
import { MONTHS } from "./constants";
import { productsAvailable, customers } from "./dummyData";

export const getRandomSelectorNumber = (max = 2, min = 0) =>
  Math.round(Math.random() * (max - min) + min);

export const calculatePoints = (_amount) => {
  const amount = Math.floor(_amount);
  return Math.max(amount - 50, (amount - 100) * 2 + 50, 0);
};

export const getTotalAndPeriodPoints = (transactions) => {
  const { total, ...months } = transactions.reduce(
    (acc, current) => {
      const month = MONTHS[current.createDate.getMonth()];
      const points = calculatePoints(current.trxAmount);
      acc.total += points;
      if (acc[month]) acc[month] += points;
      acc[month] ??= points;
      return acc;
    },
    { total: 0 }
  );
  return { monthly: Object.entries(months), total };
};

export const getRandomProducts = () => {
  const products = {};
  Array.from({ length: getRandomSelectorNumber(10, 1) }).forEach(() => {
    const randomProduct = productsAvailable[getRandomSelectorNumber(9)];
    if (!randomProduct) return;
    products[randomProduct.id] ??= { ...randomProduct, quantity: 1 };
    if (products[randomProduct.id]) products[randomProduct.id].quantity++;
  });
  return Object.values(products);
};

export const generateTransactions = (maxTransactions = 100) =>
  Array.from({ length: maxTransactions }).map((_) => {
    const products = getRandomProducts();
    const trxAmount = products.reduce(
      (acc, current) => acc + current.productPrice * current.quantity,
      0
    );
    return {
      customerId: customers[getRandomSelectorNumber()].id,
      products,
      trxAmount,
      createDate: new Date(
        2022,
        getRandomSelectorNumber(11, 0),
        getRandomSelectorNumber(28, 1)
      ),
      trxId: generateUUID(),
    };
  });

export const getQuarter = (date) => Math.floor(date.getMonth() / 3 + 1);
