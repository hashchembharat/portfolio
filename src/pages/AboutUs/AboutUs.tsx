import { useEffect, useState } from "react";
import "./AboutUs.scss";
import OwlCarousel from "react-owl-carousel";

import mission from "./../../assets/img/aboutUs/mission.jpg";
import vision from "./../../assets/img/aboutUs/vision.jpg";
import aboutText from "./../../assets/img/aboutUs/aboutText.jpg";

import achievement from "./../../assets/img/aboutUs/icons/achievement.png";
import awareness from "./../../assets/img/aboutUs/icons/awareness.png";
import customerService from "./../../assets/img/aboutUs/icons/awareness.png";
import isoCertificate from "./../../assets/img/iso-17034-haschem-bharat.jpg";
import { useLocation, useNavigate } from "react-router-dom";

export const AboutUs = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState<
    "values" | "integrity" | "innovation"
  >("values");

  const tabs: Array<"values" | "integrity" | "innovation"> = [
    "values",
    "integrity",
    "innovation",
  ];

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const navigateToServices = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };
  const navigateToContactUs = () => {
    navigate("/contact-us");
    window.scrollTo(0, 0);
  };

  // Public path to the ISO certificate PDF. Place the PDF at
  // `public/assets/docs/ISO-17034-HASCHEM-BHARAT.pdf` so it will be
  // available at runtime relative to the Vite base URL.
  // const isoPdfUrl = new URL(
  //   `${import.meta.env.BASE_URL || '/'}assets/docs/ISO-17034-HASCHEM-BHARAT.pdf`,
  //   document.baseURI
  // ).href;

  return (
    <>
      <section className="flex aboutus-banner relative py-16 hb-h-350 items-center text-white">
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold pt-16">About Us</h1>
        </div>
      </section>

      <section className="py-16 hb-aboutus-section-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold pb-4 text-[#2d7da0]">
                Unveiling HASCHEM Bharat: Where Chemistry Meets Innovation
              </h2>
              <p className="mb-4">
                At <strong>Haschem</strong>, we specialize in delivering highest
                quality API impurities and reference standards, ensuring
                unparalleled accuracy in both qualitative and quantitative
                analyses. Our extensive catalog of high-quality impurity
                reference materials includes intermediates, by-products, and
                degradation products, all designed to support the development of
                safer and more effective pharmaceuticals.
              </p>
              <h5 className="text-xl font-semibold">
                Our comprehensive product portfolio includes:
              </h5>
              <ul className="list-disc pl-5 mb-4">
                <li>API Standards</li>
                <li>Reference Standards</li>
                <li>Metabolites</li>
                <li>Nitrosamines</li>
                <li>Building Blocks</li>
                <li>Custom Synthesis</li>
              </ul>
              <p className="mb-4">
                At HASCHEM, we value long-term partnerships, working closely
                with our clients to address their unique challenges and
                requirements. Together, we develop customized solutions to drive
                your success.
              </p>
              <img
                src={aboutText}
                alt="Haschem Bharat About Us Banner"
                className="rounded-lg w-full h-auto mb-4 block lg:hidden"
              />
              <button
                onClick={navigateToServices}
                data-content="See Services"
                className="hb-btn hb-bg-brand text-white py-3 px-8 rounded hover:bg-blue-700"
              >
                <span className="hb-btn-text">Services</span>
              </button>
            </div>
            <div className="flex-1 text-white text-center lg:block hidden">
              <img
                src={aboutText}
                alt="Haschem Bharat About Us Banner"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 hb-aboutus-section-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold pb-4 text-center text-[#2d7da0]">
              Your Trusted Partner for Top-Quality Services
            </h2>

            {/* Tabs Section */}
            <div className="flex mx-4 md:mx-16 px-4 md:px-16 rounded gap-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`flex-1 h-16 rounded flex items-center justify-center text-gray-700 font-semibold cursor-pointer transition 
                    ${
                      activeTab === tab
                        ? "hb-bg-primary text-white hb-bg-primary:hover"
                        : "hover:bg-primary-500"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "values"
                    ? "Our Values"
                    : tab === "integrity"
                    ? "Our Integrity"
                    : "Innovation"}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            {activeTab === "values" && (
              <div className="flex items-center flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold pb-4">
                    Core Values: Our Guiding Principles
                  </h2>
                  <p className="mb-4">
                    Our values at HASCHEM Bharat encompass innovation,
                    integrity, and excellence. We are dedicated to pushing the
                    boundaries of knowledge and delivering high-quality
                    solutions. Collaboration, ethics, and a commitment to our
                    clients define our core principles.
                  </p>
                  <img
                    src={mission}
                    alt="Haschem Bharat Mission Banner"
                    className="rounded-lg w-full h-auto mb-4 block lg:hidden"
                  />
                  <button
                    onClick={navigateToContactUs}
                    data-content="Contact"
                    className="hb-btn hb-bg-brand text-white py-3 px-8 rounded hover:bg-blue-700"
                  >
                    <span className="hb-btn-text">Get In Touch</span>
                  </button>
                </div>
                <div className="flex-1 text-center lg:block hidden">
                  <img
                    src={mission}
                    alt="Haschem Bharat Mission Banner"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            )}

            {activeTab === "integrity" && (
              <div className="flex items-center flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold pb-4">Our Integrity</h2>
                  <p className="mb-4">
                    <p className="mb-2">
                      At <strong>HASCHEM Bharat</strong> Labs, integrity is at
                      the core of
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                      <li>
                        <strong>Ethical Practices</strong> - Upholding the
                        highest standards of honesty and transparency in our
                        research and operations.
                      </li>
                      <li>
                        <strong>Quality Assurance</strong> - Ensuring
                        uncompromised accuracy and reliability in our
                        pharmaceutical standards.
                      </li>
                      <li>
                        <strong> Regulatory Compliance</strong> - Adhering to
                        global industry guidelines to deliver trusted solutions.
                      </li>
                      <li>
                        <strong>Accountability</strong> - Taking full
                        responsibility for our actions and continuously striving
                        for excellence
                      </li>
                    </ul>
                    <p>
                      Our dedication to integrity drives us to build long-term
                      trust with our partners, clients, and the scientific
                      community.
                    </p>
                  </p>
                  <button
                    onClick={navigateToContactUs}
                    className="hb-bg-brand text-white py-3 px-8 rounded hover:bg-blue-700"
                  >
                    Get In Touch
                  </button>
                </div>
                <div className="flex-1">
                  <img
                    src={vision}
                    alt="Haschem Bharat Vision Banner"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            )}

            {activeTab === "innovation" && (
              <div className="flex items-center flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold pb-4">Innovation</h2>
                  <p className="mb-4">Generate related content.</p>
                  <div className="mb-4">
                    <p className="mb-2">
                      At HASCHEM Bharat Labs, innovation is the driving force
                      behind our scientific advancements. We are dedicated to:
                    </p>
                    <ul className="pl-5 mb-4">
                      <li className="mb-2">
                        🚀 <strong>Cutting-Edge Research</strong> - Continuously
                        exploring new methodologies and technologies to enhance
                        pharmaceutical standards.
                      </li>
                      <li className="mb-2">
                        <strong>🔬 Advanced Solutions</strong> - Developing
                        high-quality API standards, impurity standards,
                        metabolites, and nitrosamines to support global
                        research.
                      </li>
                      <li className="mb-2">
                        💡 <strong>Future-Ready Approach</strong> - Investing in
                        next-generation scientific discoveries to shape the
                        future of healthcare and medicine.
                      </li>
                      <li className="mb-2">
                        🤝 <strong>Collaborative Excellence</strong> -
                        Partnering with industry leaders to foster
                        groundbreaking advancements in pharmaceutical sciences.
                        Through innovation, we redefine possibilities and set
                        new benchmarks in chemical and pharmaceutical research.
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={navigateToContactUs}
                    className="hb-bg-brand text-white py-3 px-8 rounded hover:bg-blue-700"
                  >
                    Get In Touch
                  </button>
                </div>
                <div className="flex-1 text-center">
                  <img
                    src={mission}
                    alt="Impurities"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pt-16 pb-30 hb-aboutus-section-3">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold pb-4 sm:text-left text-center text-[#2d7da0]">
            Why Work With Us
          </h2>
          <div className="container mx-auto px-4">
            <OwlCarousel
              className="owl-theme"
              margin={10}
              responsive={{
                100: { items: 1 },
                500: { items: 1 },
                991: { items: 2 },
                1199: { items: 2 },
                1400: { items: 3 },
              }}
            >
              {[
                {
                  title: "EXPERTISE AND EXPERIENCE",
                  image: achievement,
                  alt: "Expertise and Experience",
                  description:
                    "Our team of highly skilled and experienced organic chemists provides extensive synthesis services for small/complex molecules, catering to scales from milligrams to hundreds of grams.",
                },
                {
                  title: "HIGH QUALITY PRODUCTS",
                  image: awareness,
                  alt: "High-Quality Products",
                  description:
                    "Committed to excellence, we rigorously test every compound using validated methods to ensure quality and reliability before delivery.",
                },
                {
                  title: "CUSTOMER CENTRIC APPROACH",
                  image: customerService,
                  alt: "Exceptional Customer Service",
                  description:
                    "Our customer-centric approach involves prioritizing the unique needs of clients by delivering high-quality, reliable standards, ensuring timely support, and fostering collaborative relationships to enhance customer satisfaction and trust.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-b-4 border-primary shadow-lg rounded-lg p-6"
                >
                  <h4 className="text-center text-xl font-semibold mb-4">
                    {item.title}
                  </h4>
                  <figure className="flex justify-center mb-4">
                    <img
                      className="w-24 h-24 object-contain"
                      loading="lazy"
                      src={item.image}
                      alt={item.alt}
                    />
                  </figure>
                  <p className="text-center text-gray-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>
      {/* ISO Certificate */}
      <section
        id="isoCertificate"
        className="pt-16 pb-30 hb-aboutus-section-iso"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold pb-4 sm:text-left text-center text-[#2d7da0]">
            ISO 17034 Certificate
          </h2>

          <div className="text-center border-5 border-[#F79903] rounded-lg">
            <img
              className="w-full h-auto rounded block"
              src={isoCertificate}
              loading="lazy"
              alt={`ISO 17034 Certified - HASCHEM Bharat`}
            />
          </div>
        </div>
      </section>
    </>
  );
};
