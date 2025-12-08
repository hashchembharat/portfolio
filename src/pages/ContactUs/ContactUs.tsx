import ContactForm from "../../features/ContactForm/ContactForm";
import "./ContactUs.scss";

const ContactUs = () => {
  return (
    <>
      <section className="flex contactus-banner relative py-16 hb-h-350 items-center text-white">
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold pt-16">Contact Us</h1>
        </div>
      </section>

      <section className="py-16 contactus-section-1">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="pb-8">
              <span className="inline-flex items-center rounded-full bg-yellow-50 px-5 py-2 text-sm font-medium text-orange ring-1 ring-yellow-600/20 ring-inset">
                CONTACT INFO
              </span>
            </p>
            <h2 className="text-2xl font-bold pb-8 text-[#2d7da0]">Reach Us</h2>
            <div className="flex justify-center items-stretch mt-16 gap-x-8 hb-contact-tile-wrapper">
              {[
                {
                  title: "Our Location",
                  text: "Haschem Bharat, H.No: 5-5-35/224/3, Plot No: 67 Shakthipuram Industrial Road, Prashanthi Nagar, Kukatpally, Hyderabad-500072",
                  icon: <i className="fa-solid fa-location-dot"></i>,
                },
                {
                  title: "Email Address",
                  text: (
                    <a href="mailto:contactus@haschembharat.com">
                      contactus@haschembharat.com
                    </a>
                  ),
                  icon: <i className="fa-regular fa-envelope"></i>,
                },
                {
                  title: "Phone Numbers",
                  text: (
                    <>
                      <a href="tel:+917032925939">+91 7032925939</a> &nbsp;{" "}
                      <small>(or)</small>
                      <a className="mt-2" href="tel:+918121333007">
                        &nbsp; +91 8121333007
                      </a>
                    </>
                  ),
                  icon: <i className="fa-solid fa-phone-volume"></i>,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center flex-1 hb-contact-tile"
                >
                  <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex-1 h-full flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="hexagon text-center">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-md font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-1 hb-contact-form contactus-section-2">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      <section className="pt-16 pb-25 contactus-section-3">
        {/* <div className="container mx-auto px-4"> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1902.7566536267848!2d78.42465629585885!3d17.48299350725327!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b2786dc96d%3A0x319f27bd5bddf7ae!2sMythri%20Nagar%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1753013862216!5m2!1sen!2sin"
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* </div> */}
      </section>
    </>
  );
};

export default ContactUs;
