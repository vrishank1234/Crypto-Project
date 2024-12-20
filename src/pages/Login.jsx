import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate(); // Move the useNavigate hook to the top level of the component
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [toastMessage, setToastMessage] = useState({
        error: false,
        message: "",
    });

    const handleForm = (event) => {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    };

    const login = (event) => {
        event.preventDefault(); // Prevent page reload

        fetch("http://localhost:8000/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem("token", data.token); // Store the token
                    setToastMessage({
                        error: false,
                        message: "Login successful!",
                    });
                    navigate("/"); // Now using navigate after the token is set
                } else {
                    setToastMessage({
                        error: true,
                        message: data.message || "Login failed. Try again.",
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

            <form className={styles.form} onSubmit={login}>
                <h2 className={styles.title}>Login</h2>

                <label className={styles.label}>
                    Username:
                    <input
                        type="text"
                        name="username"
                        className={styles.input}
                        onChange={handleForm}
                    />
                </label>

                <label className={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        className={styles.input}
                        onChange={handleForm}
                    />
                </label>

                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
