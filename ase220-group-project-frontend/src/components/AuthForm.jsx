import { useEffect, useState } from "react";
import { useToken } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * @param {Object} props
 * @param {(username: string, password: string, setError: React.Dispatch<React.SetStateAction<string|null>>) => void} props.onSubmit
 * @param {string} props.submitLabel
 */
export default function AuthForm({ onSubmit, submitLabel }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) navigate("/");
    }, [token]);

    return (
        <>
            <h2>{submitLabel}</h2>
            <form className="login-form" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(username, password, setError);
            }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {error &&
                    <div className="error">
                        {error}
                    </div>
                }
                <button type="submit">{submitLabel}</button>
            </form>
        </>
    );
}
