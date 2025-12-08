import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../types/ProductModel";
import ImageLoad from "../Image/Image";
import "./Product.scss";
import React from "react";
import { createPortal } from "react-dom";
import { createRoot, Root } from "react-dom/client";

// Global modal state (singleton for the app)
let globalImageModal: {
  show: (img: string, alt: string) => void;
  hide: () => void;
} | null = null;
let globalImageModalRoot: Root | null = null;
let globalImageModalContainer: HTMLDivElement | null = null;

const ImageModal: React.FC<{
  src: string;
  alt: string;
  onClose: () => void;
}> = ({ src, alt, onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-4 max-w-lg w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close image preview"
        >
          &times;
        </button>
         <ImageLoad
            imageName={src}
            altTxt={alt}
          />
        <div className="mt-2 text-center text-sm text-gray-700">{alt}</div>
      </div>
    </div>,
    document.body
  );
};

const showGlobalImageModal = (src: string, alt: string) => {
  if (globalImageModal) globalImageModal.hide();
  const container = document.createElement("div");
  document.body.appendChild(container);
  globalImageModalContainer = container;
  globalImageModalRoot = createRoot(container);
  const close = () => {
    if (globalImageModalRoot && globalImageModalContainer) {
      globalImageModalRoot.unmount();
      document.body.removeChild(globalImageModalContainer);
      globalImageModalRoot = null;
      globalImageModalContainer = null;
      globalImageModal = null;
    }
  };
  globalImageModalRoot.render(<ImageModal src={src} alt={alt} onClose={close} />);
  globalImageModal = { show: showGlobalImageModal, hide: close };
};

const Product = ({ product }: { product: ProductModel }) => {
  const navigate = useNavigate();

  const slugify = (str = "") =>
    (str || "")
      .normalize?.("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  
  const showProductDetails = () => {
    const slug = slugify(product.impurityName);
    navigate(`/products/${encodeURIComponent(slug)}`);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    showGlobalImageModal(
      product.productImageLarge || product.productImage,
      product.impurityName
    );
  };

  return (
    <div className="border-t-4 border-[#F79903] w-[320px] rounded-lg outline outline-1 outline-[#F79903] overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all duration-300 product-card">
      <div className="flex justify-between p-2 gap-5 bg-gray-100">
        <h3 className="relative text-l font-semibold text-[#2d7da0]">
          {product.impurityName}
        </h3>
        {/* <button
          type="button"
          className={`product-stock cursor-pointer ${
            product.readyStock === "Yes" ? "available" : ""
          }`}
        ></button> */}
      </div>

      {/* Image Container */}
      <div className="flex justify-center items-center h-60 w-full bg-gray-100">
        <div
          className="w-48 h-48 flex justify-center items-center overflow-hidden cursor-pointer"
          onClick={handleImageClick}
          title="Click to enlarge image"
        >
          <ImageLoad
            imageName={product.productImage}
            altTxt={product.impurityName}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 h-full">
        <h3 className="relative text-l font-semibold text-white bg-[#2d7da0] py-1 px-2 rounded-md text-center hb-m-t--35 card-title-band">
          <span className="text-[#f9f9f9]">CAS: </span>
          &nbsp;{product.casNo}
        </h3>
        <div className="flex gap-4 mt-2 flex-wrap justify-center">
          <span
            className="flex px-3 items-center py-1 text-xs font-semibold border-1 border-[#2d7da0] rounded-xl"
            title="Molecular Formula"
          >
            <span>M.F: </span>
            &nbsp;{product.molecularFormula}
          </span>
          <span
            className="flex px-3 items-center py-1 text-xs font-semibold border-1 border-[#2d7da0] rounded-xl"
            title="Molecular Weight"
          >
            <span>M.W: </span>
            &nbsp;{product.molecularWeight}
          </span>
          {/* <span
            className="flex px-3 items-center py-1 text-xs font-semibold border-1 border-[#F79901] text-white rounded-xl"
            title="CAS Number"
          >
            <span className="text-[#f9f9f9]">CAS: </span>
            &nbsp;{product.casNo}
          </span> */}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            data-content="Explore More &#10095;"
            onClick={showProductDetails}
            className="hb-btn text-gray-900 py-1 px-4 rounded border text-white bg-[#F79903] border-orange hover:text-white"
          >
            <span className="hb-btn-text">Explore</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
