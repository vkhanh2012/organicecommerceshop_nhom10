const images = import.meta.glob("../assets/images/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function getImageUrl(path = "") {
  if (!path || typeof path !== "string") return path;

  const normalizedPath = path
    .replace(/^\.\/src\/assets/, "")
    .replace(/^\/src\/assets/, "");
  const assetPath = normalizedPath.startsWith("/")
    ? normalizedPath
    : `/${normalizedPath}`;

  return images[`../assets${assetPath}`] || path;
}

export function attachImageUrls(items = []) {
  return items.map((item) => ({ ...item, image: getImageUrl(item.image) }));
}
