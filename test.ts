import { mockProducts } from './src/lib/mock/products';

const categories = ['pet', 'hdpe', 'hu-nhua', 'can-nhua', 'nap-nhua', 'phoi-pet'];

categories.forEach(cat => {
  const prods = mockProducts.filter(p => p.categoryId === cat);
  const materials = new Set(prods.map(p => p.material).filter(Boolean));
  const capacities = new Set(prods.map(p => p.capacity).filter(Boolean));
  const necks = new Set(prods.map(p => p.neck).filter(Boolean));
  const weights = new Set(prods.map(p => p.weight).filter(Boolean));
  const shapes = new Set(prods.map(p => p.shape).filter(Boolean));
  const colors = new Set(prods.map(p => p.color).filter(Boolean));
  const apps = new Set(prods.flatMap(p => p.applications || []).filter(Boolean));

  console.log(`\n${cat.toUpperCase()}`);
  console.log(`Products: ${prods.length}`);
  console.log(`Material distinct: ${Array.from(materials).join(', ') || 'None'}`);
  console.log(`Material facet: ${materials.size >= 2 ? 'SHOWN' : 'HIDDEN'}`);
  console.log(`Capacity distinct: ${Array.from(capacities).length}`);
  console.log(`Capacity facet: ${capacities.size >= 2 && cat !== 'nap-nhua' && cat !== 'phoi-pet' ? 'SHOWN' : 'HIDDEN'}`);
  console.log(`Neck distinct: ${Array.from(necks).length}`);
  console.log(`Neck facet: ${necks.size >= 2 ? 'SHOWN' : 'HIDDEN'}`);
  console.log(`Weight distinct: ${Array.from(weights).length}`);
  console.log(`Weight facet: ${weights.size >= 2 ? 'SHOWN' : 'HIDDEN'}`);
  console.log(`Shape distinct: ${Array.from(shapes).length}`);
  console.log(`Color distinct: ${Array.from(colors).length}`);
  console.log(`Application distinct: ${Array.from(apps).length}`);
});
