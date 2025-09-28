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
      <section className="pb-10 bg-white odd:bg-gradient-to-b odd:from-gray-50 odd:via-white odd:to-gray-100 even:bg-white" id="testimonials">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 text-center p-5">Testimonials</h2>
        <div className="">
          <TestimonialsCarousel items={testimonials} autoPlay intervalMs={5000} />
        </div>
      </section>

      <section id="about" className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 odd:bg-gradient-to-b odd:from-gray-50 odd:via-white odd:to-gray-100 even:bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* LEFT: headline / copy / chips / CTA */}
            <div className="lg:col-span-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/60 px-3 py-1 text-xs font-medium text-sky-700">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Individualized Care
              </div>

              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Individualized Weight Loss Consulting
              </h2>

              <p className="mt-4 text-gray-600">
                Evidence-informed care tailored to your medical history, lifestyle, and goals—so results are realistic and sustainable.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Medical', 'Nutrition', 'Behavior Change', 'Accountability', 'Local to Hamilton'].map((chip, i) => (
                  <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  Book a consultation
                </a>
                <span className="text-sm text-gray-500">
                  Want to get in touch?{' '}
                  <a href="#contact" className="text-sky-700 underline underline-offset-2">Talk to us</a>
                </span>
              </div>
            </div>

            {/* RIGHT: spread checklist + compact info card */}
            <div className="lg:col-span-7">
              {/* Two-column checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Comprehensive medical, psychological and lifestyle assessment',
                  'Intensive nutrition education and dietary management',
                  'Cognitive behavioral strategies to support behavior change',
                  'Approved, prescription weight loss medication where appropriate',
                  'Referral to bariatric surgery where appropriate',
                  'OPTIFAST provider',
                  'Focused on building self-esteem, confidence, and self-efficacy',
                  'Sustainable for long term weight loss',
                  'Serving Dundas, Ancaster, Brantford and greater Hamilton area',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 ring-1 ring-gray-200 backdrop-blur-sm">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                      <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                    </span>
                    <p className="text-sm text-gray-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section (compact + balanced) */}
      <section id="services" className="relative overflow-hidden py-12 bg-gradient-to-b from-gray-50 via-white to-gray-100 odd:bg-gradient-to-b odd:from-gray-50 odd:via-white odd:to-gray-100 even:bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold leading-tight text-gray-900">Services</h2>
          </div>

          {/* Parent grid: LEFT = What to expect (centered), RIGHT = nested pricing grid */}
          <div className="grid items-center gap-5 lg:grid-cols-12">
            {/* LEFT: What to expect (compact) */}
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
                <h3 className="text-base font-semibold text-gray-900">What to expect</h3>
                <p className="mt-2 text-sm leading-snug text-gray-600">
                  Clear milestones, regular check-ins, and tailored adjustments to keep you moving forward.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    'Personalized plan from your assessment',
                    'Regular accountability check-ins',
                    'Medication / referrals when appropriate',
                    'Nutrition education & practical tools',
                    'Behavior change strategies that stick',
                    'Simple, sustainable habit building',
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <p className="text-[13px] leading-snug text-gray-800">{line}</p>
                    </div>
                  ))}
                </div>

                {/* single-line footnote to avoid extra height */}
                <p className="mt-3 text-xs text-gray-600">
                  No hidden costs. <span className="font-semibold text-sky-700">Check your private or group insurance benefits.</span>
                </p>
              </div>
            </div>

            {/* RIGHT: Pricing (nested grid keeps cards equal height without stretching the section) */}
            <div className="lg:col-span-6">
              <div className="grid gap-5 md:grid-rows-2 auto-rows-fr">
                {/* Free card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/70 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700">
                    NO OBLIGATION, FREE ONE HOUR CONSULTATION.
                  </div>
                  <h3 className="text-xl font-bold text-sky-700">Free</h3>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">Initial 1-hour Consultation</p>
                  <ul className="mt-3 space-y-1.5 text-left">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-sm">Meeting held remotely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-sm">Meeting held in person</span>
                    </li>
                  </ul>
                </div>

                {/* $40/hr card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-sky-700">$40/hr</h3>
                  <ul className="mt-3 space-y-1.5 text-left">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-sm">In-person and remote appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-sm">No upfront fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-sm">Pay as you go</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Location Section */}
      <section id="location" className="py-20 bg-gray-100 text-center odd:bg-gradient-to-b odd:from-gray-50 odd:via-white odd:to-gray-100 even:bg-white">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 mb-4">Location</h2>
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
