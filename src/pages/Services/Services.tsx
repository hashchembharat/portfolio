import impurities from "./../../assets/img/services/impurities.jpg";
import croservices from "./../../assets/img/services/cro-services.jpg";
import customsynthesys from "./../../assets/img/services/custom-synthesys-new.jpg";
import sourcing from "./../../assets/img/services/sourcing.jpg";
import "./Services.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Reusable ServiceCard Component
export const ServiceCard = ({
  id,
  title,
  img,
  description,
  list = [],
}: {
  id: string;
  title: string;
  img: string;
  description: string;
  list?: string[];
}) => (
  <div
    id={id}
    className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-orange flex flex-col md:flex-row items-center gap-4"
  >
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-4 text-[#2d7da0]">{title}</h2>

      {/* Image for small screens */}
      <img
        className="w-full h-auto rounded mb-4 block lg:hidden"
        src={img}
        alt={`Service: ${title}`}
      />

      <p className="text-gray-700">{description}</p>

      {list.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4">
            Our key product portfolio includes:
          </h3>
          <ul className="list-disc pl-5 text-gray-700">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>

    {/* Image for large screens */}
    <div className="flex-1 text-white text-center lg:block hidden">
      <img className="w-full h-auto rounded mb-4" src={img} alt={`Service: ${title}`} />
    </div>
  </div>
);

export const Services = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const headerEl = document.querySelector('.hb-header') || document.querySelector('header');
        const headerOffset = headerEl ? (headerEl as HTMLElement).getBoundingClientRect().height : 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    {
      id: "apiimpurities",
      title: "API Impurities/Reference Standards",
      img: impurities,
      description:
        "Our quality impurity reference materials - including intermediates, by-products, and degradation products - enable accuracy in both your qualitative and quantitative analysis, helping create safer medicines.",
      list: [
        "API Standards",
        "Impurity Standards",
        "Metabolites",
        "Nitrosamines",
      ],
    },
    {
      id: "customsynthesis",
      title: "Custom Synthesis",
      img: customsynthesys,
      description:
        "Haschem specializes in high-quality products tailored for innovative research endeavors, covering pharmaceutical and medicinal research, forensic science, and environmental analysis.",
    },
    {
      id: "crocdmoservices",
      title: "CRO/CDMO Services",
      img: croservices,
      description:
        "At HASCHEM, our CDMO services deliver tailored chemical synthesis solutions for active pharmaceutical ingredients, from initial concept to commercial production.",
      list: [
        "Expertise in synthesizing non-GMP drug substances",
        "Optimizing processes to reduce API research cycle time",
        "Impurity isolation, characterization, and synthesis",
      ],
    },
    {
      id: "chemicalsourcing",
      title: "Chemical Sourcing",
      img: sourcing,
      description:
        "The HASCHEM sourcing team has cultivated relationships with partners across India and China, offering unparalleled access to premium-quality products. Our portfolio extends to raw materials procurement and chemical synthesis services, ensuring exceptional value and quality.",
    },
  ];

  return (
    <>
      <section className="flex services-banner relative py-16 hb-h-350 items-center text-white">
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold pt-16">Services</h1>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
