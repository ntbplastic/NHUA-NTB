const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<ImageWithFallback src=\{product\.image\} className="w-full h-full object-contain mix-blend-multiply" \/>/g, '<ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />');
  fs.writeFileSync(file, content);
}

['src/app/san-pham/[categorySlug]/[productSlug]/page.tsx'].forEach(fixFile);
console.log('Fixed syntax 2');
