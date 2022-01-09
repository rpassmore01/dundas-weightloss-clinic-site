import Navbar from "../components/navbar";
import styles from "../styles/Book.module.css";
import Image from "next/image";
export default function Book() {
    return (
        <div>
            <Navbar></Navbar>
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1>Contact Me!</h1>
                    <h2>From here you can let me know a little bit about yourself and what you're looking for. I will get back to via email to book a meeting.</h2>
                </div>
                <form className={styles.form}>
                    <input type='text' required='true' placeholder="Please type your name here"></input>
                    <input type='email' required='true' placeholder="Please type your email here"></input>
                    <input type='number' placeholder="Please type your phone number here"></input>
                    <input type='text' required='true' placeholder="Please tell me a bit about yourself"></input>
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    )
}