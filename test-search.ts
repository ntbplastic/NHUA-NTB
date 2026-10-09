import { searchProducts } from './src/lib/catalog/searchUtils';
import { mockProducts } from './src/lib/mock/products';

const tests = [
  "phi 28",
  "Φ28",
  "co 28",
  "500ml",
  "500 ml",
  "pet 500",
  "500 phi 28"
];

tests.forEach(t => {
  const res = searchProducts(mockProducts, t);
  console.log(`TEST "${t}": ${res.length}`);
});
