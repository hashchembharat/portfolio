import { ProductModel } from "../types/ProductModel";

// Utilities now accept the products array as an input so callers can use
// the runtime-loaded data (for example via the useProducts hook).
export const getCategories = (products: ProductModel[] = []) => {
  const uniqueCategories = [
    ...new Set(products.flatMap((item) => item.category || [])),
  ];
  return uniqueCategories;
};

export const getCategoriesObject = (products: ProductModel[] = []) => {
  // If products are provided, derive unique categories, otherwise fall
  // back to a curated list to avoid empty UI.
  const derived = getCategories(products);

  const uniqueCategories =
    derived.length > 0
      ? ["All", ...derived]
      : [
          "All",
          "API Standards",
          "Nitrosamines",
          "Carbohydrates",
          "Impurity Standards",
          "Research tools",
          "Environmental Contaminants",
        ];

  const uniqueCategoriesObj = uniqueCategories.map((item, index) => ({
    id: index + 1,
    name: item,
    isSelected: false,
  }));
  return uniqueCategoriesObj;
};
