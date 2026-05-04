import { useToken } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function Register() {
  const { setToken } = useToken();

  const handleRegister = async (username, password, setError) => {
    const response = await fetch("/API/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      fetch("/API/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }).then(res => res.json())
        .then(data => setToken(data.token));
    } else {
      const data = await response.json();
      setError(data.error);
    }
  };

  return <AuthForm onSubmit={handleRegister} submitLabel="Register" />
}
