import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGlobalStore from "../../../../store/globals";
import { TypeaheadSearch } from "../../../../features/TypeaheadSearch/TypeaheadSearch";
import logo from "./../../../../assets/img/brand/logo_orange.svg";
import logo_white from "./../../../../assets/img/brand/logo_white.svg";
import "./Header.scss";

const HeaderNavbar = () => {
  const [isProductsMenu, setIsProductsMenu] = useState(false);
  const [isServicesMenu, setIsServicesMenu] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Show only these categories in the Products menu
  const productMenuCategories = [
    "All",
    "API Standards",
    "Nitrosamines",
    "Carbohydrates",
    "Impurity Standards",
    "Research tools",
    "Environmental Contaminants",
  ];

  const updateSearchText = useGlobalStore(
    (state: any) => state.updateSearchText
  );
  const updateSelectedProductsCategory = useGlobalStore(
    (state: any) => state.updateSelectedProductsCategory
  );

  const handleChange = (inputText: string) => {
    setSearchQuery(inputText);
  };

  const productSelectionChange = (inputText: string) => {
    setSearchQuery(inputText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) {
      updateSearchText(searchQuery);
      navigate(`/products`);
    }
  };

  const getLinkClass = (path: string, classes: string) => {
    return location.pathname === path
      ? `${classes} nav-active text-orange`
      : classes;
  };

  const navigateToProducts = (section: string) => {
    updateSelectedProductsCategory([section]);
    navigate("/products");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`fixed left-0 w-full text-white z-50 transition-transform duration-100`}
      >
        <div className="haschem-navbar px-2 sm:px-3 lg:px-8">
          <div className="fixed w-full relative flex items-center justify-between whitespace-nowrap">
            <div className="absolute inset-y-0 right-0 z-1 flex items-center sm:hidden toggle-menu">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-gray-700 hover:bg-orange hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset toggle-menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center hb-logo">
              <Link
                to="/"
                className="text-lg font-bold h-18 flex items-center min-w-[100px]"
              >
                <img src={logo} width="151px" alt="Haschem Bharat Logo" />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end navbar-wrapper">
              <div className="hidden sm:ml-2 sm:block nav-items">
                <div className="flex sm:space-x-0 space-x-4">
                  <Link
                    to="/"
                    aria-current="page"
                    className={getLinkClass(
                      "/",
                      "text-gray-700 h-18 flex items-center px-3 py-2 text-sm font-medium hover:text-orange"
                    )}
                  >
                    Home
                  </Link>
                  <div className="relative group">
                    <button
                      type="button"
                      className={getLinkClass(
                        "/products",
                        "relative inline-flex w-full justify-center gap-x-1.5 h-18 flex items-center text-[#2d7da0] hover:text-orange px-3 py-2 text-sm font-medium"
                      )}
                      // className="relative inline-flex w-full justify-center gap-x-1.5 h-18 flex items-center text-gray-700 hover:text-orange px-3 py-2 text-sm font-medium"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Products
                      <svg
                        className="-mr-1 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="hb-dropdown absolute hidden group-hover:block bg-white shadow-md mt-0 py-2 z-10">
                      {productMenuCategories.map((category) => (
                        <Link
                          key={category}
                          to="/products"
                          className="block px-4 py-2 text-[#2d7da0] hover:text-orange"
                          onClick={() => navigateToProducts(category)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
                    <button
                      type="button"
                      className={getLinkClass(
                        "/services",
                        "relative inline-flex w-full justify-center gap-x-1.5 h-18 flex items-center text-[#2d7da0] hover:text-orange px-3 py-2 text-sm font-medium"
                      )}
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Services
                      <svg
                        className="-mr-1 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="small hb-dropdown absolute hidden group-hover:block bg-white shadow-md mt-0 py-2 w-56 z-10">
                      {[
                        "API Impurities",
                        "Custom Synthesis",
                        "CRO CDMO services",
                        "Chemical Sourcing",
                      ].map((item) => (
                        <Link
                          key={item}
                          to={`/services#${item.replace(/\s+/g, "").toLowerCase()}`}
                          className="block px-4 py-2 text-[#2d7da0] hover:text-orange"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/about-us"
                    className={getLinkClass(
                      "/about-us",
                      "text-[#2d7da0] hover:text-orange h-18 flex items-center px-3 py-2 text-sm font-medium"
                    )}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    className={getLinkClass(
                      "/contact-us",
                      "text-[#2d7da0] hover:text-orange h-18 flex items-center px-3 py-2 text-sm font-medium"
                    )}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            {/* Search Bar */}
            <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-3 sm:pr-0 hb-gbl-search">
              <form
                className="flex items-center border hb-border-primary rounded-md hb-border-primary-focus"
                onSubmit={handleSubmit}
              >
                <TypeaheadSearch
                  onSubmit={(text: string) => {
                    productSelectionChange(text);
                  }}
                  onInputChange={handleChange}
                />
                {/* TODO */}
                <button
                  type="submit"
                  className="hb-bg-primary text-white px-4 py-2"
                >
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
            <div className="flex justify-end ml-5 p-1 hideSocialOnMobile">
              <a
                href="https://www.linkedin.com/in/haschembharat/"
                target="_blank"
                className="text-[42px] text-[#0077B5] hover:text-[#0077B5]"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              {/* <a
                href="https://api.whatsapp.com/send?phone=8121333007"
                target="_blank"
                className="text-3xl text-[#2d7da0] hover:text-[#2d7da0]"
              >
                <i className="fab fa-whatsapp"></i>
              </a> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${isOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="flex items-center justify-between hb-logo pl-5">
            <Link to="/" className="text-lg font-bold h-18 flex items-center">
              <img src={logo_white} alt="Logo" />
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              className="rounded-full text-white hover:text-orange hover:bg-gray-200 text-5xl cursor-pointer close"
            >
              &times;
            </button>
          </div>

          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);
                setIsProductsMenu(false);
                setIsServicesMenu(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-[#2d7da0] hover:bg-gray-700 hover:text-orange"
            >
              Home
            </Link>
            {/* Dropdown for Products */}
            <div className="relative">
              <button
                type="button"
                className={getLinkClass(
                  "/products",
                  `relative inline-flex w-full justify-start gap-x-1.5 text-base block font-medium flex items-center text-[#2d7da0] hover:text-orange px-3 py-2 hover:bg-gray-700 ${
                    isProductsMenu ? "show bg-gray-700" : ""
                  }`
                )}
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsProductsMenu(!isProductsMenu)}
              >
                Products
                <svg
                  className="-mr-1 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={`hb-dropdown relative group-hover:block bg-white shadow-md mt-0 py-2 z-10 ${
                  isProductsMenu ? "" : "hidden"
                }`}
              >
                {productMenuCategories.map((category) => (
                  <Link
                    key={category}
                    to="/products"
                    className="block px-4 py-2 text-gray-700 hover:text-orange"
                    onClick={() => {
                      navigateToProducts(category);
                      setIsOpen(false);
                      setIsProductsMenu(false);
                      setIsServicesMenu(false);
                    }}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                className={getLinkClass(
                  "/services",
                  `relative inline-flex w-full justify-start gap-x-1.5 text-base block font-medium flex items-center text-[#2d7da0] hover:text-orange px-3 py-2 hover:bg-gray-700 ${
                    isServicesMenu ? "show bg-gray-700" : ""
                  }`
                )}
                onClick={() => setIsServicesMenu(!isServicesMenu)}
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Services
                <svg
                  className="-mr-1 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={`small hb-dropdown relative group-hover:block bg-white shadow-md mt-0 py-2 z-10 ${
                  isServicesMenu ? "" : "hidden"
                }`}
              >
                {[
                  "API Impurities",
                  "Custom Synthesis",
                  "CRO CDMO services",
                  "Chemical Sourcing",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/services#${item.replace(/\s+/g, "").toLowerCase()}`}
                    className="block px-4 py-2 text-gray-700 hover:text-orange"
                    onClick={() => {
                      setIsOpen(false);
                      setIsProductsMenu(false);
                      setIsServicesMenu(false);
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about-us"
              onClick={() => {
                setIsOpen(false);
                setIsProductsMenu(false);
                setIsServicesMenu(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-[#2d7da0] hover:bg-gray-700 hover:text-orange"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              onClick={() => {
                setIsOpen(false);
                setIsProductsMenu(false);
                setIsServicesMenu(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-[#2d7da0] hover:bg-gray-700 hover:text-orange"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* End of Mobile Menu */}
      </nav>
      <a
        href="https://api.whatsapp.com/send?phone=7032925939"
        target="_blank"
        className="fixed bottom-6 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] sm:w-[50px] sm:h-[50px] right-[5px] bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg z-50 transition duration-300 ease-in-out"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            fill="#fff"
            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
          />
          <path
            fill="#fff"
            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
          />
          <path
            fill="#cfd8dc"
            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
          />
          <path
            fill="#40c351"
            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
          />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </>
  );
};

export default HeaderNavbar;
