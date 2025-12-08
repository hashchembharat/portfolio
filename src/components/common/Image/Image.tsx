import React from "react";

interface ImageLoadProps {
  imageName: string;
  altTxt?: string;
}

const ImageLoad: React.FC<ImageLoadProps> = ({ imageName, altTxt }) => {
  const base = import.meta.env.BASE_URL || '/';
  // Live site product images base (user requested)
  const liveProductsBase = 'https://www.haschembharat.com/assets/img/products/';

  const resolveSrc = (name?: string) => {
    // Use document.baseURI to build an absolute URL so nested routes don't
    // make the browser request a relative path under the current route.
    if (!name) return new URL(`${base}not_found.png`, document.baseURI).href;
    // full URLs
    if (/^(https?:)?\/\//.test(name)) return name;
    // absolute paths (start with '/')
    if (name.startsWith('/')) return new URL(name, document.baseURI).href;
    // already contains assets path or starts with './assets' - treat as relative to base
    if (name.startsWith('assets/') || name.startsWith('./assets/') || name.includes('assets/img')) {
      // strip leading './' if present
      const cleaned = name.replace(/^\.\//, '');
      return new URL(cleaned, document.baseURI).href;
    }

    // For plain filenames (e.g. '1234.png') use the live site product images base
    // so deployed pages always load images from the canonical host.
    return `${liveProductsBase}${name}`;
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const fallback = new URL(`${base}not_found.png`, document.baseURI).href;
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };

  return (
    <figure className="p-3 flex justify-center">
      <img
        src={resolveSrc(imageName)}
        alt={altTxt || "Product Image"}
        onError={handleError}
      />
    </figure>
  );
};

export default ImageLoad;
