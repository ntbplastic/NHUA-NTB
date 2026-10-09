export interface Partner {
  id: string;
  name: string;
  image: string;
}

export const mockPartners: Partner[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `p${i + 1}`,
  name: `PARTNER 0${i + 1}`,
  image: `/mock/partner-${i + 1}.svg`,
}));
