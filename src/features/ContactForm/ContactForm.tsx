import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [showError, setShowError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: any) => {
    setShowError(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const trimFormData = () => {
    // Trim all fields in the formData
    return {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };
  };

  const validateForm = (trimmedData: any) => {
    const newErrors: any = {};

    // Name validation
    if (!trimmedData.name) {
      newErrors.name = "Name is required.";
    } else if (trimmedData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    // Email validation
    if (!trimmedData.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        trimmedData.email
      )
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    // Subject validation
    if (!trimmedData.subject) {
      newErrors.subject = "Subject is required.";
    } else if (trimmedData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    // Message validation
    if (!trimmedData.message) {
      newErrors.message = "Message is required.";
    } else if (trimmedData.message.length < 15) {
      newErrors.message = "Message must be at least 15 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const sendEmail = (e: any) => {
    setShowError(false);
    e.preventDefault();
    const trimmedData = trimFormData(); // Trim the input values
    if (validateForm(trimmedData)) {
      setIsSending(true);
      emailjs
        .send(
          "service_a51ozik",
          "template_hp51jrs",
          trimmedData,
          "5lTz9Hy5ZT1a9GGw4"
        )
        .then(
          () => {
            setSuccessMessage("Your message has been sent successfully!"); // Show success message
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            }); // Clear form
            setErrors({}); // Clear errors
            setTimeout(() => {
              setSuccessMessage(""); // Clear success message after 5 seconds
            }, 5000);
            setIsSending(false);
          },
          (error) => {
            setShowError(true);
            console.error("Email sending failed:", error?.text || error);
            setIsSending(false);
          }
        )
        .catch((err) => {
          // Safety fallback
          console.error("Unexpected email error:", err);
          setShowError(true);
          setIsSending(false);
        });
    }
  };

  return (
    <div className="grid md:grid-cols-1 gap-8">
      <div className="md:col-span-2 bg-white p-8 shadow-lg rounded-lg">
        <p className="pb-8 text-center">
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-5 py-2 text-sm font-medium text-orange ring-1 ring-yellow-600/20 ring-inset">
            CONTACT INFO
          </span>
        </p>
        <h2 className="text-xl font-semibold text-center mb-6 text-[#2d7da0]">
          Send a Message
        </h2>
        {successMessage && (
          <div
            className="p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
            role="alert"
          >
            ✅ Thank you for reaching out to us. We will get back to you
            shortly.
          </div>
        )}
        {showError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
            ❌ Oops! Something seems to have gone wrong. Could you please try
            again?
          </div>
        )}
        <form
          onSubmit={sendEmail}
          className="w-full max-w-lg mx-auto"
          aria-label="Contact form"
        >
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <aside>
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-500  p-3 w-full rounded-full"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors?.name && (
                <small className="text-red-500 pl-3">{errors.name}</small>
              )}
            </aside>
            <aside>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-500 p-3 w-full rounded-full"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-red-500 pl-3">{errors.email}</small>
              )}
            </aside>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <aside>
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-500 p-3 w-full rounded-full"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </aside>
            <aside>
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-500 p-3 w-full rounded-full"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <small className="text-red-500 pl-3">{errors.subject}</small>
              )}
            </aside>
          </div>
          <aside className="mb-2">
            <textarea
              placeholder="Write a message here..."
              rows={7}
              className="border border-gray-500 p-3 w-full rounded-lg"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <small className="text-red-500 pl-3">{errors.message}</small>
            )}
          </aside>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              data-content="Send"
              className={`hb-btn hb-bg-brand text-white py-3 px-8 rounded ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              disabled={isSending}
              aria-busy={isSending}
            >
              <span className="hb-btn-text">{isSending ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
