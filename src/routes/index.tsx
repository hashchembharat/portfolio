import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import { Services } from "../pages/Services/Services";
// import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { Products } from "../pages/Products/Products";
import { ProductDetails } from "../pages/ProductsDetails/ProductsDetails";
import ScrollToTop from "../components/common/ScrollToTop";

// import other pages as needed

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />

        <Route path="/products" element={<Products />} />

        {/* new prettier URL */}
        <Route path="/products/:prodName" element={<ProductDetails />} />

        {/* legacy/compatibility route (optional) */}
        <Route path="/products-details/:id" element={<ProductDetails />} />
        {/* <Route path="/career" element={<Career />} /> */}

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
