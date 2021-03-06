import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import Trees from "../public/trees.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/footer";

export default function Home() {
  useEffect(() => {
    document.querySelector("body").classList.add("body");
  });

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Home - Dundas Weight Loss Clinic</title>
        <meta
          name="description"
          content="The <b>Dundas Weight Loss Clinic</b> is a <b>local</b> weight loss clinic that provides <b>personalized</b> and <b>professional</b> guidance to <b>weight loss</b>."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className={styles.main}>
        <Navbar className={styles.navbar}></Navbar>
        <header className={styles.header}>
          <div className={styles.pictureContainer}>
            <div className={styles.headerContent}>
              <h1>Dundas Weight Loss Clinic</h1>
              <h2>Health Focused Weight Loss</h2>
              <p>
                Learn more about Heather&apos;s approach to weight loss here.
              </p>
              <Link href="/#about">
                <a className={styles.learnMoreButton}>Learn more</a>
              </Link>
            </div>
          </div>
        </header>
        <div className={styles.bio} id="bio">
          <div className={styles.bioHeader}>
            <Image
              src="/heather-headshot.jpg"
              className={styles.headerImage}
              height={300}
              width={300}
              alt="Picture of Heather Watson"
            ></Image>
            <div>
              <h2>Heather Watson</h2>
              <p>RN(EC) BA BScN MN</p>
              <p>Nurse Practitioner-Paediactrics, Weight Loss Consultant</p>
              <br />
              <table className={styles.contactInfo}>
                <tbody>
                  <tr>
                    <td>Address: </td>
                    <td>247 King Street West, Dundas, Ontario </td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>dundasweightlossclinic@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Mobile: </td>
                    <td>905-570-2610</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.bioBody}>
            <h3>Work Experience and Schooling</h3>
            <p>
              Heather started her registered nursing career in the early 1990s
              when she graduated from the University of Toronto. Early in her
              career, she recognized that she wanted to expand her nursing
              practice, so she completed her Masters of Nursing by the end of
              the 1990s and her Paediatric Nurse Practitioner training at the
              start of the millennium. Heather believes in lifelong learning and
              has since completed her Heart & Stroke Foundation First Aid and
              BLS Instructor Certification, CanFitPro Personal Training
              Certification, Modo Yoga Teacher Training (YTT) - 500 hrs and
              American Association of Nurse Practitioner - Obesity Management
              Fundamentals to name a few.
            </p>
            <p>
              Heather&apos;s work experience followed the trend of work
              availability in the 90s. She worked at the Hospital for Sick
              Children in almost every unit. Her nurse practitioner
              specialization was in Neonatology where she worked at both the
              Hospital for Sick Children and McMaster Children&apos;s Hospital.
              In 2016, Heather attempted an early retirement with no success
              (dismal failure actually).{" "}
            </p>
            <p>
              When the pandemic started, she returned to work at Lynden Family
              Practice Clinic to support patient care. Quickly into her practice
              she recognized that 60-70% of the client population suffered from
              unhealthy <b>weights</b> and related consequences. Her physician
              colleagues supported the initiation of a{" "}
              <b>weight management clinic</b>. Coincidentally, Obesity Canada
              (National Association for Obesity Research, Education and
              Advocacy) released the Canadian Adult Obesity Clinical Practice
              Guidelines to lead her practice. For 18 months, she led a weight
              management clinic with excellent results. Her clients were
              achieving improvements in their diabetes, blood lipid profiles,
              blood pressure, joint soreness, depressive symptoms etc. When the
              CoVid contract position ended at the Family Practice Clinic, she
              decided to go into private practice. Thus, Dundas Weight Loss
              Clinic was founded. Since then, she has received a Certificate of
              Obesity Management Fundamentals from the American Association of
              Nurse Practitioners and plans to complete her Lifestyle Medicine
              Professional Certification through the American Academy of
              Lifestyle Medicine.
            </p>
          </div>
        </div>
        <div className={styles.treeDiv}>
          <Trees className={styles.trees} />
        </div>
        <div className={styles.experience} id="about">
          <div className={styles.experienceBody}>
            <h2>Weight Consulting Experience</h2>
            <p>
              Heather recognizes unhealthy <b>weights</b> and/or suffering from
              obesity as a chronic disease characterized by the accumulation of
              excess body fat. This can have a negative impact on our physical,
              mental, or metabolic health as well as our overall quality of life
              (Obesity Canada, 2020). Genetic, environmental, medical and
              behavioral factors need to be considered in the assessment and
              management of unhealthy weights (AANP, 2021). Heather draws from a
              multitude of <b>weight loss</b> approaches depending on client
              medical status, preferences, and circumstances. Weight loss
              strategies are:
            </p>
            <table className={styles.experienceList}>
              <tbody>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>health focused</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>
                      based on medical, scientific, and experiential principles
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>individualized</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>negotiable</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>
                      focused on building self-esteem, confidence, and
                      positivity
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>sustainable for long term weight loss</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.listCheck}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>
                      intended to educate the client for future, independent
                      weight management.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.experienceImage}></div>
        </div>
        <span id="services"></span>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesInfoContainer}>
            <h2>Services</h2>
            <p>Email: dundasweightlossclinic@gmail.com</p>
            <p>Mobile: 905-570-2610</p>
            <h3>Process</h3>
            <ol>
              <li>No obligation, free one hour consultation.</li>
              <li>
                Enroll in the 3 month program for further health assessment,
                education, support and goal setting
              </li>
            </ol>
            <Link href="/book">
              <a className={styles.learnMoreButton}>Book Appointment</a>
            </Link>
          </div>
          <div className={styles.services}>
            <div className={styles.priceCard}>
              <h3>Free</h3>
              <p>Initial 1 hour Consultation</p>
              <table className={styles.optionsTable}>
                <tbody>
                  <tr>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={styles.checkmark}
                      ></FontAwesomeIcon>
                    </td>
                    <td>
                      <p>Meeting held remotely</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={styles.checkmark}
                      ></FontAwesomeIcon>
                    </td>
                    <td>
                      <p>Meeting held in person</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.priceCard}>
              <h3>$350</h3>
              <p>for first 3 months</p>
              <table className={styles.optionsTable}>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held remotely</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held in person</p>
                  </td>
                </tr>
              </table>
              <p className={styles.priceNote}>
                *Initial appointment in person*
              </p>
            </div>
            <div className={styles.priceCard}>
              <h3>$100</h3>
              <p>for each 3 month period thereafter</p>
              <table className={styles.optionsTable}>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held remotely</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held in person</p>
                  </td>
                </tr>
              </table>
            </div>
            <div className={styles.priceCard}>
              <h3>$10</h3>
              <p>per month for maintenance</p>
              <table className={styles.optionsTable}>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held remotely</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkmark}
                    ></FontAwesomeIcon>
                  </td>
                  <td>
                    <p>Meeting held in person</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <p className={styles.serviceNotice}>
            * APPOINTMENTS MUST BE SCHEDULED IN ADVANCE *
          </p>
          <p className={styles.servicesNote}>
            In special circumstances home visits may be available.
          </p>
          <h4 className={styles.insuranceNote}>
            Check your private or group insurance benefits for coverage.
          </h4>
        </div>
        <div className={styles.location} id="location">
          <h2>Location</h2>
          <p>247 King Street West, Dundas, Ontario</p>
          <p>Shared space with Myers Chiropractic.</p>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.178797634249!2d-79.96720588435645!3d43.26862988523067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c847e096e1389%3A0x68458c0a4681abfd!2s247%20King%20St%20W%2C%20Dundas%2C%20ON%20L9H%201V8!5e0!3m2!1sen!2sca!4v1642648064679!5m2!1sen!2sca"
              height="450"
              width="600"
              allowFullScreen=""
              loading="lazy"
              className={styles.map}
              title="google map to Dundas Weight Loss Clinic"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
