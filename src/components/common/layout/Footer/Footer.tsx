import { Link, useNavigate } from "react-router-dom";
import FooterBand from "../../FooterBand/FooterBand";
import logoWhite from "./../../../../assets/img/brand/logo_white.svg";
import { useLocation } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  // const isoPdfUrl = new URL(
  //   `${
  //     import.meta.env.BASE_URL || "/"
  //   }assets/docs/ISO-17034-HASCHEM-BHARAT.pdf`,
  //   document.baseURI
  // ).href;
  const navigateToContactUs = () => {
    navigate("/contact-us");
    window.scrollTo(0, 0);
  };
  return (
    <footer className={`bg-gray-900 text-white pb-4${!isHome ? " pt-20" : ""}`}>
      <div className="container mx-auto px-6">
        {/* Hide FooterBand on the home (landing) page */}
        {!isHome && <FooterBand />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <Link to="/">
                <img src={logoWhite} alt="Haschem Bharat" width={190} />
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Our Genesis In 2023, HASCHEM Bharat was born in the heart of
              Hyderabad, a city renowned for its pharmaceutical prowess.
            </p>
            <div className="text-s font-semibold mt-4 mt-1 text-[#f79a06]">
              ISO 17034 Certified &nbsp;| &nbsp;
              {/* <a
                href="https://www.haschembharat.com/assets/docs/ISO-17034-HASCHEM-BHARAT.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:underline hover:text-white"
              >
                View Certificate
              </a> */}
              <Link to="/about-us#isoCertificate" className="hover:text-white">
                View Certificate
              </Link>
            </div>
            <button
              onClick={navigateToContactUs}
              className="inline-block mt-4 text-primary font-semibold hover:underline"
            >
              Contact Us →
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Contacts</h3>
            <p className="text-gray-400 text-sm">
              If you have any questions or need help:
            </p>
            <div className="flex items-center mt-4">
              <i className="fas fa-phone text-primary mr-3"></i>
              <h4>
                <a href="tel:+917032925939" className="hover:text-white">
                  +91 7032925939
                </a>{" "}
                /
                <a href="tel:+918121333007" className="hover:text-white">
                  +91 8121333007
                </a>
              </h4>
            </div>
            <p className="text-gray-400 mt-2">
              Haschem Bharat, H.No: 5-5-35/224/3, Plot No: 67 Shakthipuram
              Industrial Road, Prashanthi Nagar, Kukatpally, Hyderabad-500072
            </p>
            <a
              target="_blank"
              href="https://www.google.com/maps/dir//17.4828835,78.4259491/@17.4828835,78.4233742,17z/data=!4m8!1m5!3m4!2zMTfCsDI4JzU4LjQiTiA3OMKwMjUnMzMuNCJF!8m2!3d17.4828835!4d78.4259491!4m1!3e9?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
              className="inline-block mt-4 text-primary font-semibold hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row lg:justify-between gap-8 border-t border-gray-700 mt-8 pt-3 text-sm text-gray-500">
          <div className="text-center md:text-left flex-1 justify-center md:justify-end">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://haschembharat.com/"
              className="text-primary hover:underline"
            >
              HASCHEM BHARAT
            </a>
            . All rights reserved.
          </div>

          <div className="flex flex-1 flex-wrap justify-center md:justify-end sm:flex-nowrap space-x-4 sm:w-auto">
            <a
              href="https://www.linkedin.com/in/haschembharat/"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            {/* <a
              href="https://api.whatsapp.com/send?phone=8121333007"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
