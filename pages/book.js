import Navbar from "../components/navbar";
import styles from "../styles/Book.module.css";
import Image from "next/image";
export default function Book() {
    return (
        <div className={styles.container}>
            <Navbar></Navbar>
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1>Contact Me!</h1>
                    <h2>From here you can let me know a little bit about yourself and what you're looking for. I will get back to via email to book a meeting.</h2>
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.form}>
                    <h3>Name (required):</h3>
                    <input type='text' required={true}></input>
                    <h3>Email (required):</h3>
                    <input type='email' required={true}></input>
                    <h3>Phone number (required):</h3>
                    <input type='number' required={true}></input>
                    <h3>Message (optional):</h3>
                    <textarea></textarea>
                    <button type="submit">Submit</button>
                    </form>
                </div>
        </main>
        </div>
    )
}