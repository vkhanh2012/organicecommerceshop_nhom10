import productsData from "../data/products.json";
import { renderProductGrid } from "../components/productcard.js";

export function renderRelatedProducts(
  currentProduct = {},
  allProducts = productsData,
) {
  const relatedIds = Array.isArray(currentProduct.relatedIds)
    ? currentProduct.relatedIds
    : [];

  let relatedProducts = allProducts.filter((product) =>
    relatedIds.includes(product.id),
  );

  if (relatedProducts.length < 4) {
    const selectedIds = new Set([
      currentProduct.id,
      ...relatedProducts.map((product) => product.id),
    ]);
    const currentCategory =
      typeof currentProduct.category === "object"
        ? currentProduct.category?.name
        : currentProduct.category;

    const sameCategoryProducts = allProducts.filter((product) => {
      const category =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      return (
        category &&
        currentCategory &&
        category.toLowerCase() === currentCategory.toLowerCase() &&
        !selectedIds.has(product.id)
      );
    });

    relatedProducts = [
      ...relatedProducts,
      ...sameCategoryProducts,
    ].slice(0, 4);
  }

  if (relatedProducts.length < 4) {
    const selectedIds = new Set([
      currentProduct.id,
      ...relatedProducts.map((product) => product.id),
    ]);
    const remainingProducts = allProducts.filter(
      (product) => !selectedIds.has(product.id),
    );

    relatedProducts = [...relatedProducts, ...remainingProducts].slice(0, 4);
  }

  return renderProductGrid(relatedProducts, "shop2");
}
