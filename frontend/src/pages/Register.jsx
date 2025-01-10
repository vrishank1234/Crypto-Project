import styles from "./auth.module.css";
import { useState } from "react";

const Register = () => {
    let [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        gender: "",
    });

    let [toastMessage, setToastMessage] = useState({
        error: false,
        message: "",
    });

    const handleForm = (event) => {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    };

    const register = () => {
        fetch("http://localhost:8000/auth/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("username", user.username); // This stores the value
                const username = localStorage.getItem("username"); // Retrieve the stored value
                console.log(username); // Logs the value stored in localStorage
console.log(user.username); // Logs the username from the `user` object
                if (data.message === "User Registered") {
                    
                    
                    setToastMessage({
                        error: false,
                        message: "Registration successful!",
                    });
                } else {
                    setToastMessage({
                        error: true,
                        message:
                            data.message || "Something went wrong. Try again.",
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                setToastMessage({
                    error: true,
                    message: "An error occurred. Please try again.",
                });
            });
    };

    return (
        <div className={styles.container}>
            {toastMessage.message && (
                <div
                    className={
                        toastMessage.error
                            ? styles.toastError
                            : styles.toastSuccess
                    }
                >
                    {toastMessage.message}
                </div>
            )}

            <form className={styles.form}>
                <h2 className={styles.title}>Register</h2>

                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={handleForm}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Username:
                    <input
                        type="text"
                        name="username"
                        onChange={handleForm}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={handleForm}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Gender:
                    <select
                        name="gender"
                        onChange={handleForm}
                        className={styles.input}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <button
                    type="button"
                    onClick={register}
                    className={styles.button}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
