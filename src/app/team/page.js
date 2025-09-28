import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export default function TeamPage() {
  return (
    <main>
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
                  <FontAwesomeIcon icon={faCheck} size="sm" className="text-sky-600  mt-1 w-4 h-4" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 h-[400px] rounded-xl shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('/heather-india-2.jpg')" }}></div>
        </div>
      </section>
    </main>
  );
}
