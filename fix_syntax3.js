const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<ImageWithFallback src=\{article\.image\} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" \/>/g, '<ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />');
  fs.writeFileSync(file, content);
}

['src/app/san-pham/[categorySlug]/[productSlug]/page.tsx'].forEach(fixFile);
console.log('Fixed syntax 3');
