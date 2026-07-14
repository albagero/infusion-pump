// Helper to resolve asset paths with the Vite base URL
// This ensures images work correctly on GitHub Pages
export const assetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
