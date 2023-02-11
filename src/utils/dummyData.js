import { v4 as generateUUID } from "uuid";

export const customers = [
  {
    id: generateUUID(),
    email: "dianelisi@example.com",
    name: "Dianelis",
    lastName: "Insua",
    gender: "female",
  },
  {
    id: generateUUID(),
    email: "johnd@example.com",
    name: "John",
    lastName: "Doe",
    gender: "male",
  },
  {
    id: generateUUID(),
    email: "georges@example.com",
    name: "George",
    lastName: "Smith",
    gender: "male",
  },
];

export const productsAvailable = [
  { id: generateUUID(), productName: "Iphone 14", productPrice: 1200.0 },
  { id: generateUUID(), productName: "Mackbook Pro ", productPrice: 1900.5 },
  { id: generateUUID(), productName: "Mackbook Air", productPrice: 1200.0 },
  { id: generateUUID(), productName: "Mac Studio", productPrice: 1500.0 },
  { id: generateUUID(), productName: "Iphone 12", productPrice: 799.99 },
];
