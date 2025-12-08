import { useState, useRef, useEffect } from "react";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import "./TypeaheadSearch.scss";
import { useNavigate } from "react-router-dom";
// products.json is loaded from public/assets at runtime so it can be
// updated without rebuilding the bundle. Keep the file at
// public/assets/data/products.json and it will be available at
// `${import.meta.env.BASE_URL}assets/data/products.json`.
import { ProductModel } from "../../types/ProductModel";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useProductsContext } from '../../context/ProductsContext';
import { useDebounce } from '../../hooks/useDebounce';

interface TypeaheadSearchProps {
  onSubmit: (text: string) => void;
  onInputChange: (text: string) => void;
}

export const TypeaheadSearch: React.FC<TypeaheadSearchProps> = ({
  onSubmit,
  onInputChange,
}) => {
  const [selected, setSelected] = useState<ProductModel[]>([]);
  const { products, isLoading } = useProductsContext();
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<any>(null);
  const navigate = useNavigate();

  const debouncedInput = useDebounce(inputText, 300);

  // Notify parent only after debounced input changes
  useState(() => {
    // no-op placeholder to satisfy hooks ordering - actual notify below
    return undefined as unknown as void;
  });

  // inform parent after debounce
  // note: don't call onInputChange on first render unless inputText set
  useEffect(() => {
    onInputChange(debouncedInput);
  }, [debouncedInput]);

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightMatch = (text: string, query: string) => {
    if (!text || !query) return text;

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    console.log(`Highlighting matches for query: ${query} in text: ${text}`);
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 font-semibold">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const slugify = (str = "") =>
    (str || "")
      .normalize?.("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");

  const handleProductSelectionChange = (selectedOption: ProductModel) => {
    if (selectedOption) {
      const slug = slugify(selectedOption.impurityName);
      navigate(`/products/${encodeURIComponent(slug)}`);
    }
  };

  const onProductChange = (selected: ProductModel[]) => {
    setSelected(selected);
    if (selected.length > 0) {
      handleProductSelectionChange(selected[0]);
    }
  };

  const handleInputChange = (text: any) => {
    const searchedText = text.target.value ?? "";
    setInputText(searchedText);
    onInputChange(searchedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(inputText);
    }
  };

  const clearFilter = () => {
    if (inputRef.current) {
      inputRef.current.clear();
      setSelected([]);
      setInputText("");
    }
  };

  return (
    <>
  <div className="typeahead-search-container">
  <Typeahead
        className="typeaheadSearch"
        minLength={3}
        onChange={(selected) => {
          onProductChange(selected as ProductModel[]);
          inputRef.current?.blur();
        }}
        onInputChange={(text) => handleInputChange(text)}
  options={products}
  isLoading={isLoading}
  placeholder={isLoading ? 'Loading products...' : 'Enter #CAS No, Name, Category, Molecular Formula'}
        selected={selected}
        ref={inputRef}
        id="product-search"
        // Todo - Earlier search was only impurity Name. Now added for any text
        filterBy={[
          "impurityName",
          "parentAPI",
          "casNo",
          "category",
          "molecularFormula",
          "synonym",
        ]}
        labelKey={(option: any) =>
          `${option.impurityName} ${option.parentAPI} ${option.casNo} ${option.category} ${option.molecularFormula} ${option.synonym}`
        }
        aria-label="Search for products"
        aria-expanded={false}
        aria-owns="typeahead-menu"
        aria-haspopup="listbox"
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps} id="typeahead-menu" role="listbox">
            {results.map((result: any, index: number) => (
              <MenuItem
                key={index}
                option={result}
                position={index}
                onClick={() => {
                  onProductChange([result]);
                  handleProductSelectionChange(result);
                  inputRef.current?.blur();
                }}
                role="option"
                aria-selected={selected.includes(result)}
              >
                <div>
                  <div>
                    <strong>
                      {highlightMatch(result.impurityName ?? "", inputText)}
                    </strong>
                    ,{" "}
                    <span>
                      {highlightMatch(result.parentAPI ?? "", inputText)}
                    </span>{" "}
                    <small>
                      ({Array.isArray(result.category)
                        ? result.category.map((cat: string, i: number) => (
                            <span key={i}>
                              {i > 0 && ', '}
                              {highlightMatch(cat ?? '', inputText)}
                            </span>
                          ))
                        : highlightMatch(result.category ?? '', inputText)})
                    </small>
                  </div>
                  <div>
                    <span>{highlightMatch(result.casNo ?? "", inputText)}</span>
                    ,{" "}
                    <span>
                      {highlightMatch(
                        result.productDetails?.molecularFormula ?? "",
                        inputText
                      )}
                    </span>
                    ,{" "}
                    <span>
                      {highlightMatch(
                        result.productDetails?.synonym ?? "",
                        inputText
                      )}
                    </span>
                  </div>
                </div>
              </MenuItem>
            ))}
          </Menu>
        )}
        onKeyDown={handleKeyDown}
      />
      {isLoading && (
        <span className="typeahead-loader" aria-hidden="true"></span>
      )}
      </div>
      <button
        type="button"
        onClick={clearFilter}
        className="w-8 rounded-full text-black hover:bg-gray-200 link text-2xl"
        aria-label="Clear search"
      >
        &times;
      </button>
    </>
  );
};
