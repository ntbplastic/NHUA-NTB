import { FilterConfig } from '@/components/catalog/FilterSheet';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

function normalizeLabel(facetId: string, value: string): string {
  if (facetId === 'capacity') {
    const numMatch = value.match(/[0-9.]+/);
    if (numMatch) {
      let num = parseFloat(numMatch[0]);
      if (value.toLowerCase().includes('l') && !value.toLowerCase().includes('ml')) {
        return `${num} L`;
      } else {
        if (num >= 1000 && num % 100 === 0) {
          return `${num / 1000} L`;
        }
        return `${num} ml`;
      }
    }
  } else if (facetId === 'weight') {
    const numMatch = value.match(/[0-9.]+/);
    if (numMatch) return `${numMatch[0]} g`;
  } else if (facetId === 'neck') {
    if (!value.startsWith('Φ')) return `Φ${value}`;
  }
  return value;
}

export function getDerivedFilterConfigs(
  baseProducts: any[],
  filteredProducts: any[],
  selectedFilters: Record<string, string[]>,
  categoryId?: string
): FilterConfig[] {
  const configs: FilterConfig[] = [];

  // Allowed facets and their priority
  const facetKeys = [
    { id: 'capacity', label: 'Dung tích' },
    { id: 'neck', label: 'Cổ chai / Ren' },
    { id: 'shape', label: 'Kiểu dáng' },
    { id: 'application', label: 'Ứng dụng' },
    { id: 'weight', label: 'Khối lượng' },
    { id: 'color', label: 'Màu sắc' },
    { id: 'material', label: 'Vật liệu' },
  ];

  for (const facet of facetKeys) {
    if (facet.id === 'capacity' && (categoryId === 'nap-nhua' || categoryId === 'phoi-pet')) {
      continue;
    }
    
    let label = facet.label;
    if (facet.id === 'neck') {
      if (categoryId === 'nap-nhua') label = 'Cỡ cổ tương thích';
      else if (categoryId === 'phoi-pet') label = 'Cổ phôi / Neck finish';
      else if (categoryId === 'can-nhua') label = 'Cổ / Miệng can';
      else if (categoryId === 'hu-nhua') label = 'Đường kính miệng / Cổ';
    }
    // 1. Get all distinct values in the BASE universe for this facet
    const baseValues = new Set<string>();
    baseProducts.forEach(p => {
      if (facet.id === 'application') {
        if (p.applications) p.applications.forEach((a: string) => baseValues.add(a));
      } else {
        const val = p[facet.id];
        if (val && val !== '-' && val !== 'N/A') {
          // Hide 'mm' from capacity facet (since they are cap/preform sizes, not capacities)
          if (facet.id === 'capacity' && val.includes('mm')) return;
          baseValues.add(val);
        }
      }
    });

    // 2. Hide facet if less than 2 distinct meaningful values exist in the entire category
    if (baseValues.size < 2) continue;

    // 3. Compute available options and counts based on CURRENT filter state
    // To do this correctly (faceted search), the count for a given option X in facet Y 
    // should be evaluated by applying all current filters EXCEPT facet Y.
    const options: FilterOption[] = Array.from(baseValues).map(val => {
      // Create a hypothetical filter state where facet.id is just this value
      // Wait, standard faceted search count: "how many results if I click this option?"
      // It means taking all active filters EXCEPT this facet, and adding this option.
      const hypotheticalFilters = { ...selectedFilters, [facet.id]: [val] };
      
      let count = 0;
      baseProducts.forEach(p => {
        let matches = true;
        Object.entries(hypotheticalFilters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            if (key === 'application') {
              if (!p.applications || !p.applications.some((a: string) => values.includes(a))) matches = false;
            } else {
              if (!values.includes(p[key])) matches = false;
            }
          }
        });
        if (matches) count++;
      });

      return {
        value: val,
        label: normalizeLabel(facet.id, val),
        count
      };
    });

    // Filter out options that have 0 count to hide impossible combinations,
    // UNLESS the option is currently selected.
    const validOptions = options.filter(o => {
      const isSelected = selectedFilters[facet.id]?.includes(o.value);
      return o.count > 0 || isSelected;
    });

    // Sort options if needed (e.g. numeric sort for capacity/weight)
    validOptions.sort((a, b) => {
      if (facet.id === 'capacity' || facet.id === 'weight') {
        const numA = parseFloat(a.value.replace(/[^0-9.]/g, '')) || 0;
        const numB = parseFloat(b.value.replace(/[^0-9.]/g, '')) || 0;
        return numA - numB;
      }
      return a.label.localeCompare(b.label);
    });

    if (validOptions.length > 0) {
      configs.push({
        id: facet.id,
        label: label,
        type: 'checkbox',
        options: validOptions
      });
    }
  }

  return configs;
}
