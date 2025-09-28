import Image from "next/image";

export default function TeamPage() {
  return (
    <main>
      {/* Bio Section */}
      <section id="bio" className="py-20 container mx-auto px-6 lg:px-20">
        {/* Top Bio */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
          {/* Left: Photo Card */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden p-3 flex flex-col items-center">
              <Image
                src="/heather-headshot.jpg"
                alt="Heather Watson"
                width={320}
                height={320}
                className="rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:w-2/3 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-5xl font-extrabold text-gray-900">
                Heather Watson
              </h2>
              <div className="w-24 h-1 bg-sky-600 mt-3 mb-6"></div>
              <p className="text-2xl font-semibold text-gray-800">
                RN(EC) BA BScN MN
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-3">
                Nurse Practitioner-Paediatrics, Certified Bariatric Educator and
                Diplomate, American College of Lifestyle Medicine
              </p>
            </div>

            {/* Contact info in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <p>
                <span className="font-bold text-sky-700">Address:</span> 247
                King Street West, Dundas, Ontario
              </p>
              <p>
                <span className="font-bold text-sky-700">Email:</span>{" "}
                dundasweightlossclinic@gmail.com
              </p>
              <p>
                <span className="font-bold text-sky-700">Mobile:</span>{" "}
                905-570-2610
              </p>
              <p>
                <span className="font-bold text-sky-700">Fax:</span> 438-600-9815
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mt-24">
          <h3 className="text-4xl font-bold text-center mb-16">
            Work Experience and Schooling
          </h3>

          <div className="relative border-l-4 border-sky-600 pl-12 space-y-16">
            <div className="relative">
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                Early 1990s – Education & Training
              </h4>
              <p className="text-lg leading-relaxed text-gray-700">
                Heather started her registered nursing career in the early 1990s when she graduated from the University
                of Toronto. Early in her career, she recognized that she wanted to expand her nursing practice, so she
                completed her Masters of Nursing by the end of the 1990s and her Paediatric Nurse Practitioner training
                at the start of the millennium. Heather believes in lifelong learning and has since completed her Heart
                & Stroke Foundation First Aid and BLS Instructor Certification, CanFitPro Personal Training
                Certification, and Modo Yoga Teacher Training (YTT) - 500 hrs.
              </p>
            </div>

            <div className="relative">
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                1990s–2016 – Clinical Practice
              </h4>
              <p className="text-lg leading-relaxed text-gray-700">
                Heather&apos;s work experience followed the trend of work availability in the 90s. She worked at the
                Hospital for Sick Children in almost every unit. Her nurse practitioner specialization was in
                Neonatology where she worked at both the Hospital for Sick Children and McMaster Children&apos;s
                Hospital. In 2016, Heather attempted an early retirement with no success (dismal failure actually).
              </p>
            </div>

            <div className="relative">
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                2020 – Pandemic & Private Practice
              </h4>
              <p className="text-lg leading-relaxed text-gray-700">
                When the pandemic started, she returned to work at Lynden Family Practice Clinic to support patient
                care. Quickly into her practice she recognized that approximately 40% of the client population suffered
                from unhealthy <b>weights</b> and related consequences. Her physician colleagues supported the
                initiation of a <b>weight management clinic</b>. Coincidentally, Obesity Canada (national association
                for obesity practice standards, research, education and advocacy) released the Canadian Adult Obesity
                Clinical Practice Guidelines to lead her practice. For 18 months, she led a weight management clinic
                with excellent results. Her clients were achieving improvements in their diabetes, blood lipid profiles,
                blood pressure, joint soreness, depressive symptoms etc. When the CoVid contract position ended at the
                family practice clinic, she decided to go into private practice. Thus, Dundas Weight Loss Clinic was
                founded. Since then, she has received multiple certifications to support her obesity medicine practice
                from Obesity Canada, ASCEND Global Obesity, the American Association of Nurse Practitioners and the
                American College of Lifestyle Medicine. She is a Certified Bariatric Educator and Diplomate for the
                American College of Lifestyle Medicine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
