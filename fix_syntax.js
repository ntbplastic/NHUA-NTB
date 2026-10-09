const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-\[1.08\] group-active:scale-\[1.02\]"\s*\/>/g, 'className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.02]" />');
  fs.writeFileSync(file, content);
}

['src/components/ui/ProductCard.tsx'].forEach(fixFile);
console.log('Syntax check done');
