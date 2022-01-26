import Navbar from "../components/navbar";
import styles from "../styles/Book.module.css";
import Footer from "../components/footer";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Book(props) {
  const form = useRef();

  const [sentMessage, setSentMessage] = useState();

  const sendEmail = (e) => {
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
  };

  return (
    <div className={styles.container}>
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
            <input type="number" required={true} name="phone_number"></input>
            <h3>Message (optional):</h3>
            <textarea name="message"></textarea>
            <button type="submit" value="Send">
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
  console.log(process.env.USER_ID);
  return {
    props: {
      USER_ID: process.env.USER_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
      SERVICE_ID: process.env.SERVICE_ID,
    },
  };
}
