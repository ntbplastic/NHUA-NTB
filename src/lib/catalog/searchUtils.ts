export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeTechnicalAlias(token: string): string {
  // Normalize necks
  if (/^(phi|co|co chai|o|ø)[\s]*([0-9]+)$/.test(token)) {
    return token.replace(/^(phi|co|co chai|o|ø)[\s]*([0-9]+)$/, 'φ$2');
  }
  if (/^([0-9]+)[\s]*(mm)$/.test(token)) {
    return `φ${token.replace(/^([0-9]+)[\s]*(mm)$/, '$1')}`;
  }

  // Normalize capacities
  if (/^([0-9]+(\.[0-9]+)?)[\s]*(l|lit|liter)$/.test(token)) {
    const match = token.match(/^([0-9]+(\.[0-9]+)?)[\s]*(l|lit|liter)$/);
    if (match) {
      const liters = parseFloat(match[1]);
      return `${liters * 1000}ml`;
    }
  }
  if (/^([0-9]+)[\s]*(ml)$/.test(token)) {
    return token.replace(/\s+/g, ''); // e.g. 500 ml -> 500ml
  }
  
  return token;
}

function getSearchTokens(query: string): string[] {
  // First, extract explicit tokens if needed, but a simple split works if we normalize spaces
  // Better: normalize vietnamese, then split by space, then map to technical alias
  
  // Actually, wait, "phi 28" is two tokens if split by space, but one technical alias.
  // Let's do some pre-processing before splitting:
  let normalizedQuery = query.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
    
  // Pre-merge aliases
  normalizedQuery = normalizedQuery
    .replace(/(phi|co|o|ø)\s+([0-9]+)/g, 'φ$2')
    .replace(/([0-9]+)\s*(mm)/g, 'φ$1')
    .replace(/([0-9]+(\.[0-9]+)?)\s*(l|lit|liter)\b/g, (m, p1) => {
       return `${parseFloat(p1) * 1000}ml`;
    })
    .replace(/([0-9]+)\s*(ml)\b/g, '$1ml');

  return normalizedQuery.split(/[^a-z0-9φ]+/).filter(Boolean);
}

function scoreProduct(product: any, tokens: string[]): number {
  if (!tokens.length) return 1;
  
  // Normalize product fields
  const name = normalizeVietnamese(product.name || '');
  const sku = normalizeVietnamese(product.sku || '');
  const material = normalizeVietnamese(product.material || '');
  
  // Normalize technical fields
  const capacity = (product.capacity || '').toLowerCase().replace(/\s/g, ''); // 500 ml -> 500ml, 1 l -> 1l
  const capacityVal = capacity.includes('l') && !capacity.includes('ml') ? `${parseFloat(capacity) * 1000}ml` : capacity;
  const neck = (product.neck || '').toLowerCase().replace('Φ', 'φ').replace('φ', 'φ').replace(/\s/g, '');
  const apps = (product.applications || []).map((a: string) => normalizeVietnamese(a)).join(' ');
  const category = normalizeVietnamese(product.categoryName || product.categoryId || '');
  const shape = normalizeVietnamese(product.shape || '');

  // Exact matches get massive boost
  let score = 0;
  
  // Token match logic (AND logic mostly)
  // All meaningful tokens must match SOMETHING in the product for it to be a strong result.
  let matchedTokens = 0;

  for (const token of tokens) {
    let tokenMatched = false;
    
    if (sku === token) { score += 100; tokenMatched = true; }
    else if (sku.includes(token)) { score += 20; tokenMatched = true; }
    
    if (name === token) { score += 50; tokenMatched = true; }
    else if (name.includes(token)) { score += 10; tokenMatched = true; }
    
    if (material === token) { score += 5; tokenMatched = true; }
    else if (material.includes(token)) { score += 2; tokenMatched = true; }
    
    if (capacityVal === token) { score += 15; tokenMatched = true; }
    else if (capacityVal.includes(token)) { score += 5; tokenMatched = true; }
    
    if (neck === token) { score += 15; tokenMatched = true; }
    else if (neck.includes(token)) { score += 5; tokenMatched = true; }
    
    if (category === token || category.includes(token)) { score += 5; tokenMatched = true; }
    if (shape === token || shape.includes(token)) { score += 5; tokenMatched = true; }
    if (apps.includes(token)) { score += 2; tokenMatched = true; }
    
    if (tokenMatched) {
      matchedTokens++;
    }
  }

  // To enforce AND semantics, we penalize or reject if not all tokens match
  if (matchedTokens < tokens.length) {
    return 0; // Require all tokens to match something
  }

  return score;
}

export interface SearchSuggestion {
  type: 'product' | 'facet';
  label: string;
  value: string;
  categorySlug?: string;
  productSlug?: string;
}

export function getSearchSuggestions(products: any[], query: string): SearchSuggestion[] {
  if (!query || !query.trim()) return [];
  
  const suggestions: SearchSuggestion[] = [];
  const normalizedQuery = normalizeVietnamese(query);
  
  // 1. Facet suggestions
  const uniqueFacets = new Set<string>();
  
  products.forEach(p => {
    // Capacity
    if (p.capacity && normalizeVietnamese(p.capacity).includes(normalizedQuery)) {
      uniqueFacets.add(`facet:capacity:${p.capacity}`);
    }
    // Neck
    // Handle 'phi' to 'Φ' mapping for suggestions
    const neckQ = normalizedQuery.replace(/phi|co|o|ø/, 'φ').replace(/\s/g, '');
    if (p.neck && normalizeVietnamese(p.neck).replace('Φ', 'φ').replace('φ', 'φ').replace(/\s/g, '').includes(neckQ)) {
      uniqueFacets.add(`facet:neck:${p.neck}`);
    }
    // Material
    if (p.material && normalizeVietnamese(p.material).includes(normalizedQuery)) {
      uniqueFacets.add(`facet:material:${p.material}`);
    }
    // Application
    if (p.applications) {
      p.applications.forEach((a: string) => {
        if (normalizeVietnamese(a).includes(normalizedQuery)) {
          uniqueFacets.add(`facet:application:${a}`);
        }
      });
    }
  });

  const facetArr = Array.from(uniqueFacets).slice(0, 5);
  facetArr.forEach(f => {
    const parts = f.split(':');
    const val = parts.slice(2).join(':'); // handle case where value has colon
    suggestions.push({
      type: 'facet',
      label: val,
      value: val
    });
  });

  // 2. Product suggestions
  const matchedProducts = searchProducts(products, query);
  matchedProducts.slice(0, 4).forEach(p => {
    suggestions.push({
      type: 'product',
      label: p.name,
      value: p.name,
      categorySlug: p.categoryId,
      productSlug: p.slug
    });
  });

  return suggestions;
}

export function searchProducts(products: any[], query: string): any[] {
  if (!query || !query.trim()) return products;
  
  const tokens = getSearchTokens(query);
  if (!tokens.length) return products;

  const scored = products.map(p => ({
    product: p,
    score: scoreProduct(p, tokens)
  })).filter(x => x.score > 0);
  
  // Rank by score descending
  scored.sort((a, b) => b.score - a.score);
  
  return scored.map(x => x.product);
}
