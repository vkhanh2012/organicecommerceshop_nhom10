const images = import.meta.glob("../assets/images/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function getImageUrl(path = "") {
  return images[`../assets${path}`] || path;
}

export function attachImageUrls(items = []) {
  return items.map((item) => ({ ...item, image: getImageUrl(item.image) }));
}
