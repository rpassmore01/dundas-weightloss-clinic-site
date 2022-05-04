import Navbar from "../components/navbar";
import styles from "../styles/Book.module.css";
import Footer from "../components/footer";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";

export default function Book(props) {
  const form = useRef();

  const [sentMessage, setSentMessage] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const reRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        props.SERVICE_ID,
        props.EMAIL_TEMPLATE_ID,
        form.current,
        props.USER_ID
      )
      .then(
        function (response) {
          setSentMessage("Message sent successfully!");
        },
        function (error) {
          setSentMessage("Message failed please email directly.");
        }
      );

    document.getElementById("form").reset();
    reRef.current.reset();
    setFormValidated(false);
  }

  async function handleRecaptcha(token) {
    console.log("Captcha value:", token);
    const response = await fetch("/api/auth", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.human) {
          setFormValidated(true);
        }
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Book - Dundas Weight Loss Clinic</title>
        <meta
          name="descripton"
          content="Contact the <b>Dundas Weight Loss Clinic</b> to make an initial 1 hour <b>free</b> appointment."
        />
      </Head>
      <Navbar></Navbar>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Contact Me!</h1>
          <h2>
            From here you can let me know a little bit about yourself and what
            you&apos;re looking for. I will get back to via email to book a
            meeting.
          </h2>
        </div>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            ref={form}
            onSubmit={sendEmail}
            id="form"
          >
            <h3>Name (required):</h3>
            <input type="text" required={true} name="user_name"></input>
            <h3>Email (required):</h3>
            <input type="email" required={true} name="user_email"></input>
            <h3>Phone number (required):</h3>
            <input type="tel" required={true} name="phone_number"></input>
            <h3>Message (optional):</h3>
            <textarea name="message"></textarea>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              onChange={handleRecaptcha}
              ref={reRef}
              className={styles.recaptcha}
            />
            <button type="submit" value="Send" disabled={!formValidated}>
              Submit
            </button>

            {sentMessage ? <p>{sentMessage}</p> : <p></p>}
          </form>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      USER_ID: process.env.USER_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
      SERVICE_ID: process.env.SERVICE_ID,
      SECRET_SITE_KEY: process.env.SECRET_SITE_KEY,
    },
  };
}
