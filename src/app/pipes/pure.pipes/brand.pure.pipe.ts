

export const brandPurePipe = (products: any[], brand: string): any[] => {
  if (!brand) return products;
  return products.filter(product => brand.includes(product.brand));
};
