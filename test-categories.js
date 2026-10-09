const fs = require('fs');

// Simple regex to parse mockProducts.ts roughly
const content = fs.readFileSync('src/lib/mock/products.ts', 'utf-8');
const productsMatch = content.match(/export const mockProducts.*?\=\s*(\[[\s\S]*?\]);/);
let products = [];
if (productsMatch) {
  // It's not pure JSON because of string interpolation or whatever? 
  // Wait, I can just compile it!
}
