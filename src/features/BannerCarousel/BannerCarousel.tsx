import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./BannerCarousel.scss";
import { useNavigate } from "react-router-dom";

const CarouselComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    navigate(`/services#${section}`);
  };

  return (
    <section aria-label="Featured products carousel">
      <OwlCarousel
        className="owl-theme"
        margin={10}
        loop
        autoplay
        autoplayTimeout={5000}
        autoplayHoverPause
        responsiveClass
        items={1}
        aria-roledescription="carousel"
      >
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center">
          <div className="flex flex-col sm:flex-1 flex-2 items-center md:items-start justify-center md:justify-start banner-text-box">
            <h3 className="text-center md:text-left capitalize ">
              API Impurities/Reference Standards
            </h3>
            <p className="pb-4 text-center md:text-left">
              Our mission is to deliver premium-grade API impurities and Reference
              standards, setting the benchmark for quality and reliability in the
              industry.
            </p>

            <button
              onClick={() => handleNavigation("apiimpurities")}
              data-content="Know More &#10095;"
              className="hb-btn text-gray-900 py-3 px-8 rounded border text-white bg-[#f79a06] border-orange hover:text-white"
            >
              <span className="hb-btn-text">Know More &nbsp;</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1">&nbsp;</div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center">
          <div className="flex flex-col sm:flex-1 flex-2 items-center md:items-start justify-center md:justify-start banner-text-box">
            <h3 className="text-center md:text-left capitalize ">
              Custom Synthesis
            </h3>
            <p className="pb-4 text-center md:text-left capitalize">
              Our experienced team of Ph.D. chemists specializes in meticulously
              crafting optimal synthetic pathways for both novel and established
              compounds
            </p>
            <button
              onClick={() => handleNavigation("customsynthesis")}
              data-content="Know More &#10095;"
              className="hb-btn text-gray-900 py-3 px-8 rounded border text-white bg-[#f79a06] border-orange hover:text-white"
            >
              <span className="hb-btn-text">Know More &nbsp;</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1">&nbsp;</div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center">
          <div className="flex flex-col sm:flex-1 flex-2 items-center md:items-start justify-center md:justify-start banner-text-box">
            <h3 className="text-center md:text-left capitalize ">
              CRO/CDMO services
            </h3>
            <p className="pb-4 text-center md:text-left">
              We offer an extensive array of services encompassing drug discovery,
              development, and manufacturing. Our commitment is to deliver
              innovative solutions tailored to meet the diverse needs of our
              clients
            </p>
            <button
              onClick={() => handleNavigation("crocmoservices")}
              data-content="Know More &#10095;"
              className="hb-btn text-gray-900 py-3 px-8 rounded border text-white bg-[#f79a06] border-orange hover:text-white"
            >
              <span className="hb-btn-text">Know More &nbsp;</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1">&nbsp;</div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center">
          <div className="flex flex-col sm:flex-1 flex-2 items-center md:items-start justify-center md:justify-start banner-text-box">
            <h3 className="text-center md:text-left capitalize ">
              Chemical Sourcing
            </h3>
            <p className="pb-4 text-center md:text-left">
              The HASCHEM sourcing team has diligently cultivated relationships
              over several years with numerous partner organizations renowned for
              their specialized skills and technical prowess across India and
              China
            </p>
            <button
              onClick={() => handleNavigation("chemicalsourcing")}
              data-content="Know More &#10095;"
              className="hb-btn text-gray-900 py-3 px-8 rounded border text-white bg-[#f79a06] border-orange hover:text-white"
            >
              <span className="hb-btn-text">Know More &nbsp;</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1">&nbsp;</div>
        </div>
      </OwlCarousel>
    </section>
  );
};

export default CarouselComponent;
