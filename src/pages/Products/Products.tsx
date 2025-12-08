import React, { useEffect, useState, useRef } from "react";
import useGlobalStore from "./../../store/globals";
import Product from "../../components/common/Product/Product";
import { ProductModel } from "../../types/ProductModel";
import { CategoryModel } from "../../types/models";
import { getCategoriesObject } from "../../services/utilities";
import { useProductsContext } from '../../context/ProductsContext';

export const Products: React.FC = () => {
  const { products } = useProductsContext();
  let categoriesList = getCategoriesObject(products);
  categoriesList = categoriesList.filter((category) => category.name !== "All");
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [categories, setCategories] = useState<CategoryModel[]>(categoriesList);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [isAccOpen, setIsAccOpen] = useState(true);
  const [windowWidth, setWindowSize] = useState(null as any);

  const toggleAccordion = () => {
    setIsAccOpen((prev) => !prev);
  };

  const searchedTxt = useGlobalStore((state) => state.searchedText);
  const selectedCategory = useGlobalStore(
    (state) => state.selectedProductsCategory
  );
  const selectedCategoriesList = useRef<string[]>([]);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      if (selectedCategory.includes("All")) {
        setSelectedLetter("");
        selectedCategoriesList.current = [];
      } else {
        selectedCategoriesList.current = [...selectedCategory];
      }
      setIsAccOpen(true); // Open accordion if categories are selected
    }
    if (searchedTxt) {
      setSearchText(searchedTxt);
    }
  }, []);

  // If products are loaded asynchronously, initialize categories and
  // the filtered products list when products change so the page shows
  // results when navigated to from the menu.
  useEffect(() => {
    const initCategories = getCategoriesObject(products).filter(
      (category) => category.name !== 'All'
    );
    setCategories(initCategories);
    // show all products initially when products arrive
    setFilteredProducts((products || []) as ProductModel[]);
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [searchText]);

  useEffect(() => {
    filterProducts();
  }, [categories]);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      if (selectedCategory.includes("All")) {
        setSelectedLetter(""); // Reset selected letter when "All" is selected
        selectedCategoriesList.current = [];
      } else {
        selectedCategoriesList.current = [...selectedCategory];
      }

      const updatedCategories = categories.map((cat) => {
        cat.isSelected = selectedCategory.includes(cat.name);
        return cat;
      });
      setCategories(updatedCategories); // Update categories state
    }

    filterProducts();
  }, [selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [selectedLetter]);

  const filterProducts = () => {
  let filteredProductsList: ProductModel[] = (products || []) as ProductModel[];

    if (selectedCategoriesList.current.length > 0) {
      filteredProductsList = filteredProductsList.filter((obj) =>
        obj.category.some((category: any) =>
          selectedCategoriesList.current.includes(category)
        )
      );
    }

    if (selectedLetter) {
      filteredProductsList = filterObjectsByCharacters(
        filteredProductsList,
        [selectedLetter]
      );
    }

    if (searchText) {
      filteredProductsList = filteredProductsList.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filteredProductsList);
  };

  const filterObjectsByCharacters = (
    productsList: ProductModel[],
    selectedCharacters: string[]
  ) => {
    if (!selectedCharacters || selectedCharacters.length === 0) {
      return productsList;
    }

    return productsList.filter((obj) => {
      const impurityName = obj.impurityName || "";
      const firstAlphabeticChar = impurityName
        .split("")
        .find((char) => /^[a-zA-Z]$/.test(char));
      const normalizedFirstChar = firstAlphabeticChar?.toLowerCase();
      const normalizedCharacter = selectedCharacters[0]?.toLowerCase();

      return (
        normalizedFirstChar &&
        normalizedCharacter === normalizedFirstChar
      );
    });
  };

  const handleCategoriesSelect = (category: CategoryModel) => {
    const updatedCategories = categories.map((c) =>
      c.id === category.id ? { ...c, isSelected: !c.isSelected } : c
    );
    setCategories(updatedCategories);
    selectedCategoriesList.current = updatedCategories
      .filter((c) => c.isSelected)
      .map((c) => c.name);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const clearCategory = () => {
    const updatedCategories = categories.map((category) => {
      category.isSelected = false;
      return category;
    });

    setCategories(updatedCategories);
    selectedCategoriesList.current = [];
  };

  useEffect(() => {
    // Handler to update window size
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    // Set initial window size
    handleResize();

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth && windowWidth < 640) {
      setIsAccOpen(false); // Close accordion on small screens
    }
  }, [windowWidth]);

  return (
    <>
      <section className="flex services-banner products-banner relative py-16 hb-h-350 items-center text-white">
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold pt-16">Products</h1>
        </div>
      </section>

      <section
        className="pt-8 pb-8 hb-products-section-1 shadow-lg"
        aria-label="Product filters"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 border hb-border-primary hb-bg-primary-hover rounded-sm ${
                  !selectedLetter
                    ? "hb-bg-brand border-orange hb-bg-brand-hover text-white"
                    : ""
                }`}
                onClick={() => setSelectedLetter("")}
                aria-pressed={!selectedLetter}
              >
                All
              </button>

              {alphabet.map((letter) => (
                <button
                  key={letter}
                  className={`w-10 py-1 border border-primary rounded-sm text-center ${
                    selectedLetter === letter ? "hb-bg-brand text-white" : ""
                  }`}
                  onClick={() =>
                    setSelectedLetter(
                      selectedLetter === letter ? "" : letter
                    )
                  }
                  aria-label={`Filter by letter ${letter}`}
                  aria-pressed={selectedLetter === letter}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                className="border py-2 px-3 rounded-sm min-w-[200px] h-[34px] flex-2"
                placeholder="Search Products"
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search products by text"
              />

              <button
                className={`px-4 py-1 rounded-sm h-[34px] ${
                  searchText
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!searchText}
                onClick={() => handleSearchChange("")}
                aria-label="Clear search text"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        {/* Filter by Category */}

        <div className="container mx-auto mt-4 px-4">
          <h4
            title="Click to Expand/Collapse"
            onClick={toggleAccordion}
            className={`text-l font-semibold rounded-tl-md rounded-tr-md  text-[#2d7da0] cursor-pointer flex justify-between items-center bg-gray-100 px-3 py-2 ${isAccOpen ? "" : "rounded-md"}`}
          >
            Filter By Category:
            <span className="text-gray-600">
              {isAccOpen ? (
                <i className="fa fa-chevron-up"></i>
              ) : (
                <i className="fa fa-chevron-down"></i>
              )}
            </span>
          </h4>
          <div
            className={`overflow-hidden transition-all pt-2 px-2 rounded-bl-md rounded-br-md border-1 border-gray-100 duration-300 ${
              isAccOpen ? "max-h-screen opacity-100 border-1 border-gray-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  hidden={category.name === "All"}
                  className={`inline-flex items-center rounded-full px-2 lg:px-3 py-1 text-xs font-medium text-black ring-1 text-gray-700 ring-inset ${
                    category.isSelected ? "bg-orange text-orange" : ""
                  }`}
                  onClick={() => handleCategoriesSelect(category)}
                >
                  {category.isSelected && (
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                  {category.name}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <button
                title="Clear Selection"
                className={`px-4 text-xs py-1 text-white rounded-full ${
                  selectedCategoriesList.current.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-red-500"
                }`}
                disabled={selectedCategoriesList.current.length === 0}
                onClick={clearCategory}
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-8 pb-30">
        <div className="flex flex-wrap justify-center gap-8">
          {filteredProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
