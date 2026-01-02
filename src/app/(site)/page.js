import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import TestimonialsCarousel from "../../components/TestimonialCarousel";

export default async function HomePage() {
  const testimonialData = await fetch(`${process.env.BASEURL}/api/testimonials`).then(response => {
    if (!response.ok) { throw new Error(`Failed to load testimonials with error code ${response.status}.`) }
    return response.json()
  }).catch(
    //Errors
  )

  return (
    <main>
      {/* Hero Section */}
      <header
        className="relative isolate flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/tews-falls.jpg')",
          minHeight: '420px',
          height: '60svh',
        }}
        role="banner"
        aria-label="Dundas Weight Loss Clinic hero"
      >
        {/* gradien for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30"></div>

        {/* glow */}
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle at 30% 70%, rgba(56,189,248,.35), rgba(6,182,212,.15) 45%, transparent 60%)' }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-3">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {/* pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-md font-medium text-white/90 backdrop-blur">
                Comprehensive care · Evidence-informed
              </div>

              <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
                Dundas Weight Loss Clinic
              </h1>

              <h2 className="mt-2 text-xl md:text-3xl font-semibold text-white">
                Comprehensive Weight Management Program
              </h2>

              <p className="mt-3 text-md md:text-lg font-semibold text-white">
                FREE ONE HOUR CONSULTATION
              </p>
              {/* location line to match other sections */}
              <p className="mt-4 text-lg text-white/70">
                Serving Dundas · Ancaster · Brantford · Hamilton
              </p>
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 mt-5"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Testimonials Section */}
      <section className="pb-15" id="testimonials">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 text-center p-10">Testimonials</h2>
        <div className="">
          <TestimonialsCarousel items={testimonialData} autoPlay intervalMs={5000} />
        </div>
      </section>

      <section id="about" className="relative overflow-hidden py-20 bg-gray-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* LEFT: headline / copy / chips / CTA */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Individualized Weight Loss Consulting
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Evidence-informed care tailored to your medical history, lifestyle, and goals—so results are realistic and sustainable.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Individualized Care', 'Nutrition', 'Behavior Change', 'Accountability', 'Local to Hamilton'].map((chip, i) => (
                  <span key={i} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-md font-medium text-gray-700 shadow-sm">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-2.5 text-md font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  Book a consultation
                </a>
                <span className="text-md text-gray-500">
                  Want to get in touch?{' '}
                  <a href="/book" className="text-sky-700 underline underline-offset-2">Talk to us</a>
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
                    <p className="text-md text-gray-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative overflow-hidden py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 text-center lg:text-left ">
            <h2 className="text-4xl font-bold leading-tight text-gray-900">Services</h2>
          </div>

          {/* Parent grid: LEFT = What to expect (centered), RIGHT = nested pricing grid */}
          <div className="grid items-center gap-5 lg:grid-cols-12">
            {/* LEFT: What to expect (compact) */}
            <div className="lg:col-span-6">
              <div className="mx-auto rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
                <h3 className="text-lg font-semibold text-gray-900">What to expect</h3>
                <p className="mt-2 text-lg leading-snug text-gray-600">
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
                      <p className="text-md leading-snug text-gray-800">{line}</p>
                    </div>
                  ))}
                </div>

                {/* single-line footnote to avoid extra height */}
                <p className="mt-3 text-md text-gray-600">
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
                  <p className="mt-0.5 text-md font-semibold text-gray-900">Initial 1-hour Consultation</p>
                  <ul className="mt-3 space-y-1.5 text-left">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-md">Meeting held remotely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-md">Meeting held in person</span>
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
                      <span className="text-md">In-person and remote appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-md">No upfront fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
                        <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-md">Pay as you go</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Location Section */}
      <section id="location" className="py-20 text-center bg-gray-100">
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
