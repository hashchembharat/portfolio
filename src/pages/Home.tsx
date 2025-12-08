import CarouselComponent from "../features/BannerCarousel/BannerCarousel";
import Partners from "../features/Partners/Partners";
import Product from "../components/common/Product/Product";
import { useProductsContext } from "../context/ProductsContext";
import { ProductModel } from "../types/ProductModel";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import FooterBand from "../components/common/FooterBand/FooterBand";

const Home = () => {
  const navigate = useNavigate();
  // const thumbnailsColors = ["primary", "danger", "info", "success", "warning"];
  const { products } = useProductsContext();
  const newProducts: any[] = (products || []).filter(
    (product) => product.productStatus?.toLowerCase() === "new"
  );

  const navigateToProducts = () => {
    navigate(`/products`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative w-full pb-0 home-carousel">
          <h1 className="sr-only">Welcome to Haschem Bharat - Pharmaceutical & Chemical Products</h1>
          {/* <div className="container mx-auto px-6 lg:px-8"> */}
          <CarouselComponent />
          {/* </div> */}
        </section>

        {/* <AutoComplete /> */}

        {/* Top Products Section */}
        <section id="topProductsSection" className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Header */}
            <h2 className="pb-8 text-center">
              <span className="inline-flex items-center rounded-full bg-yellow-50 px-5 py-2 text-sm font-medium text-orange ring-1 ring-yellow-600/20 ring-inset">
                TOP PRODUCTS
              </span>
            </h2>
            <p className="text-2xl text-center">
              Discover our most popular and highly-rated products, carefully
              curated for quality and customer satisfaction
            </p>

            {/* Products Grid */}
            <div className="flex flex-wrap gap-8 justify-center mt-8">
              {newProducts.map((topProduct: ProductModel) => (
                <Product key={topProduct.Sno} product={topProduct} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                data-content="More Products &#10095;"
                onClick={navigateToProducts}
                className="hb-btn text-gray-900 py-2 px-4 rounded border text-white bg-[#f79a06] border-orange hover:text-white"
              >
                <span className="hb-btn-text">More Products &nbsp;</span>
              </button>
            </div>
          </div>
        </section>

        <section id="ourPartners" className="pt-16 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <FooterBand></FooterBand>
          </div>
        </section>

        {/* Our Partners Section */}
        <section id="ourPartners" className="pt-16 pb-25">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center p-5 w-[45px] h-[45px] sm:w-[60px] md:h-[60px] bg-[#2d7da0] shadow-lg rounded-full">
                <i className="fa-solid fa-handshake text-orange text-3xl"></i>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#2d7da0]">
                  Our Partners
                </h2>
                <p className="text-gray-600">
                  At <strong>HASCHEM BHARAT</strong>, we believe in the power of
                  collaboration and partnership to drive innovation in the
                  pharmaceutical industry. Our strategic alliances help us
                  maintain leadership in the market.
                </p>
              </div>
            </div>

            {/* Partners Component */}
            <div className="mt-8">
              <Partners />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
