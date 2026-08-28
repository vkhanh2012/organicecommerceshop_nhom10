// src/descriptions/RelatedProductCard.js

import productsData from "../data/products.json";
import { renderProductGrid } from "../components/productCard.js";

export function renderRelatedProducts(
  currentProduct = {},
  allProducts = productsData
) {
  const relatedIds = Array.isArray(currentProduct.relatedIds)
    ? currentProduct.relatedIds
    : [];

  let relatedProducts = allProducts.filter((product) =>
    relatedIds.includes(product.id)
  );

  if (relatedProducts.length < 4) {
    const selectedIds = new Set([
      currentProduct.id,
      ...relatedProducts.map((product) => product.id),
    ]);

    const currentCatName = typeof currentProduct.category === "object"
      ? currentProduct.category?.name
      : currentProduct.category;

    const sameCategoryProducts = allProducts.filter(
      (product) => {
        const catName = typeof product.category === "object"
          ? product.category?.name
          : product.category;
        return catName && currentCatName && catName.toLowerCase() === currentCatName.toLowerCase() && !selectedIds.has(product.id);
      }
    );

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
      (product) => !selectedIds.has(product.id)
    );

    relatedProducts = [
      ...relatedProducts,
      ...remainingProducts,
    ].slice(0, 4);
  }

  return `
    <section class="w-full py-8 mt-8 mb-12">
      <h2 class="mb-6 text-center text-[32px] font-semibold text-neutral-900 font-poppins">
        Related Products
      </h2>

      ${renderProductGrid(relatedProducts, "shop2")}
    </section>
  `;
}