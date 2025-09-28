import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import TestimonialsCarousel from "../components/testimonialCarousel";
const testimonials = [
  { numStars: 5, message: 'Super helpful and fast!', date: '2025-08-15', name: 'Jane Doe' },
  { numStars: 4, message: 'Great experience overall.', date: '2025-07-02', name: 'Alex P.' },
  { numStars: 5, message: 'Highly recommend!', date: '2025-06-10', name: 'Chris L.' },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <header
        className="relative h-[70vh] min-h-100 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/tews-falls.jpg')" }}
      >
        <div className="bg-black/30 absolute inset-0"></div>
        <div className="relative text-center text-white space-y-6 px-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            Dundas Weight Loss Clinic
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold">
            Comprehensive Weight Management Program
          </h2>
          <p className="text-lg md:text-xl font-bold">
            FREE ONE HOUR CONSULTATION
          </p>
          <Link
            href="/book"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </header>

      {/* Testimonials Section */}
      <section  className="" id="testimonials">
        <h2 className="text-center text-5xl p-5">Testimonials</h2>
        <div className="">
          <TestimonialsCarousel items={testimonials} autoPlay intervalMs={5000} />
        </div>
      </section>

      {/* What We Do Section */}
      <section id="about" className="bg-gray-200 py-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-center lg:text-left mb-8">Individualized Weight Loss Consulting</h2>
            <ul className="space-y-4">
              {[
                "Comprehensive medical, psychological and lifestyle assessment",
                "Intensive nutrition education and dietary management",
                "Cognitive behavioral strategies to support behavior change",
                "Approved, prescription weight loss medication where appropriate",
                "Referral to bariatric surgery where appropriate",
                "OPTIFAST provider",
                "Focused on building self-esteem, confidence, and self-efficacy",
                "Sustainable for long term weight loss",
                "Serving Dundas, Ancaster, Brantford and greater Hamilton area",
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 h-[400px] rounded-xl shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('/heather-india-2.jpg')" }}></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 text-center container mx-auto px-6">
        <div className="mb-12 space-y-4">
          <h2 className="text-5xl font-bold">Services</h2>
          <b className="text-xl block">NO OBLIGATION, FREE ONE HOUR CONSULTATION.</b>
          <p>dundasweightlossclinic@gmail.com</p>
          <p>905-570-2610</p>
          <Link href="/book" className="inline-block bg-sky-600 hover:bg-sky-700 text-red px-6 py-3 rounded-xl text-lg shadow-lg">
            Book Appointment
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md w-80">
            <h3 className="text-3xl font-bold text-sky-600">Free</h3>
            <p className="mt-2 font-semibold">Initial 1 hour Consultation</p>
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" /> <span>Meeting held remotely</span></li>
              <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" /> <span>Meeting held in person</span></li>
            </ul>
          </div>
          <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md w-80">
            <h3 className="text-3xl font-bold text-sky-600">$40/hr</h3>
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" /> <span>In person and remote appointments</span></li>
              <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" /> <span>No upfront fees</span></li>
              <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" /> <span>Pay as you go</span></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-lg">No hidden costs</p>
        <h4 className="text-xl font-bold text-sky-600 mt-2">Check your private or group insurance benefits for coverage.</h4>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-4">Location</h2>
        <p className="font-semibold">247 King Street West, Dundas, Ontario</p>
        <p className="mb-6">Sharing space with Myers Chiropractic.</p>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.178797634249!2d-79.96720588435645!3d43.26862988523067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c847e096e1389%3A0x68458c0a4681abfd!2s247%20King%20St%20W%2C%20Dundas%2C%20ON%20L9H%201V8!5e0!3m2!1sen!2sca!4v1642648064679!5m2!1sen!2sca"
            height="450"
            width="600"
            allowFullScreen=""
            loading="lazy"
            className="w-full max-w-3xl h-[450px] rounded-xl shadow-lg"
            title="google map to Dundas Weight Loss Clinic"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
