import { useToken } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const { setToken } = useToken();

  const handleLogin = async (username, password, setError) => {
    const response = await fetch("/API/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
    } else {
      const data = await response.json();
      setError(data.error);
    }
  };

  return <AuthForm onSubmit={handleLogin} submitLabel="Login" />
}
