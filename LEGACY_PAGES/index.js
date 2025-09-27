import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Navbar from "../src/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../src/components/footer";
import Link from "next/link";

export default function Home() {
  // useEffect(() => {
  //   document.querySelector("body").classList.add("bg-gray-50 font-serif");
  // });

  return (
    <div>
      <Head>
        <title>Home - Dundas Weight Loss Clinic</title>
        <meta
          name="description"
          content="The Dundas Weight Loss Clinic is a local weight loss clinic that provides personalized and professional guidance to weight loss."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <header className="relative h-[70vh] min-h-100 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/tews-falls.jpg')" }}>
          <div className="bg-black/30 absolute inset-0"></div>
          <div className="relative text-center text-white space-y-6 px-6">
            <h1 className="text-5xl md:text-7xl font-bold">Dundas Weight Loss Clinic</h1>
            <h2 className="text-2xl md:text-4xl font-semibold">Comprehensive Weight Management Program</h2>
            <p className="text-lg md:text-xl font-bold">FREE ONE HOUR CONSULTATION</p>
            <Link href="/book" className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg">
              Book Now
            </Link>
          </div>
        </header>

        {/*Testimonials*/}
        <section id="testimonials" className="">

        </section>

        {/* Bio Section */}
        <section id="bio" className="py-20 container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            <div className="lg:w-1/2 flex flex-col items-center text-center lg:text-left border-b lg:border-r lg:border-b-0 border-gray-300 pb-8 lg:pb-0 lg:pr-8">
              <Image src="/heather-headshot.jpg" alt="Heather Watson" width={300} height={300} className="rounded-full shadow-lg" />
              <div className="mt-6 space-y-2">
                <h2 className="text-3xl font-bold">Heather Watson</h2>
                <p className="text-lg">RN(EC) BA BScN MN</p>
                <p className="text-sm text-gray-700">Nurse Practitioner-Paediatrics, Certified Bariatric Educator and Diplomate, American College of Lifestyle Medicine</p>
              </div>
              <table className="mt-6 text-left text-sm">
                <tbody>
                <tr>
                  <td className="font-bold text-sky-700 pr-2">Address:</td>
                  <td>247 King Street West, Dundas, Ontario</td>
                </tr>
                <tr>
                  <td className="font-bold text-sky-700 pr-2">Email:</td>
                  <td>dundasweightlossclinic@gmail.com</td>
                </tr>
                <tr>
                  <td className="font-bold text-sky-700 pr-2">Mobile:</td>
                  <td>905-570-2610</td>
                </tr>
                <tr>
                  <td className="font-bold text-sky-700 pr-2">Fax:</td>
                  <td>438-600-9815</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="lg:w-2/3 space-y-6">
              <h3 className="text-3xl font-semibold text-center lg:text-left">Work Experience and Schooling</h3>
              <p>
                Heather started her registesky nursing career in the early 1990s when she graduated from the University of Toronto. Early in her career, she recognized that she wanted to expand her nursing practice, so she completed her Masters of Nursing by the end of the 1990s and her Paediatric Nurse Practitioner training at the start of the millennium. Heather believes in lifelong learning and has since completed her Heart & Stroke Foundation First Aid and BLS Instructor Certification, CanFitPro Personal Training Certification, and Modo Yoga Teacher Training (YTT) - 500 hrs.
              </p>
              <p>
                Heather&apos;s work experience followed the trend of work availability in the 90s. She worked at the Hospital for Sick Children in almost every unit. Her nurse practitioner specialization was in Neonatology where she worked at both the Hospital for Sick Children and McMaster Children&apos;s Hospital. In 2016, Heather attempted an early retirement with no success (dismal failure actually).
              </p>
              <p>
                When the pandemic started, she returned to work at Lynden Family Practice Clinic to support patient care. Quickly into her practice she recognized that approximately 40% of the client population suffesky from unhealthy <b>weights</b> and related consequences. Her physician colleagues supported the initiation of a <b>weight management clinic</b>. Coincidentally, Obesity Canada released the Canadian Adult Obesity Clinical Practice Guidelines to lead her practice. For 18 months, she led a weight management clinic with excellent results. When the CoVid contract position ended at the family practice clinic, she decided to go into private practice. Thus, Dundas Weight Loss Clinic was founded. Since then, she has received multiple certifications to support her obesity medicine practice. She is a Certified Bariatric Educator and Diplomate for the American College of Lifestyle Medicine.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
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
                    <FontAwesomeIcon icon={faCheck} className="text-sky-600 mt-1" />
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
                <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} className="text-sky-600" /> <span>Meeting held remotely</span></li>
                <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} className="text-sky-600" /> <span>Meeting held in person</span></li>
              </ul>
            </div>
            <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md w-80">
              <h3 className="text-3xl font-bold text-sky-600">$40/hr</h3>
              <ul className="mt-4 space-y-2 text-left">
                <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} className="text-sky-600" /> <span>In person and remote appointments</span></li>
                <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} className="text-sky-600" /> <span>No upfront fees</span></li>
                <li className="flex items-center space-x-2"><FontAwesomeIcon icon={faCheck} className="text-sky-600" /> <span>Pay as you go</span></li>
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

      <Footer />
    </div>
  );
}
